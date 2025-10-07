import os, io, time, re, base64
from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security.api_key import APIKeyHeader
from starlette.responses import JSONResponse
from starlette.requests import Request
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

import fitz  # PyMuPDF
from PIL import Image
import numpy as np
import cv2
import httpx

load_dotenv()
API_KEY = os.getenv("API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
origins = os.getenv("CORS_ALLOW_ORIGINS", "*").split(",")

app = FastAPI(title="Agentic Health OS API", version="0.2.0")

app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])
app.state.limiter = limiter
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

def require_key(key: str | None = Depends(api_key_header)):
    if not API_KEY:  # allow local dev if not set
        return
    if key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")

@app.exception_handler(RateLimitExceeded)
def ratelimit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={"detail": "Rate limit exceeded"})

@app.get("/health")
@limiter.limit("20/minute")
def health(request: Request):
    return {"ok": True, "version": "0.2.0", "time": int(time.time())}

@app.get("/secure-check", dependencies=[Depends(require_key)])
@limiter.limit("20/minute")
def secure_check(request: Request):
    return {"ok": True, "secure": True}

# ---------- Schemas ----------
class ASRResponse(BaseModel):
    text: str
    latency_ms: int

class OCRResponse(BaseModel):
    text: str
    pages: int

class ImagingMetrics(BaseModel):
    mean_intensity: float
    edge_density: float
    blur_score: float

class ImagingResponse(BaseModel):
    metrics: ImagingMetrics
    preview_b64: Optional[str] = None

class TriageInput(BaseModel):
    transcript_text: Optional[str] = None
    lab_text: Optional[str] = None
    imaging: Optional[ImagingMetrics] = None

class TriageResult(BaseModel):
    risk_level: str = Field(..., description="LOW|MODERATE|HIGH|EMERGENCY")
    emergency_alerts: List[str] = []
    next_steps: List[str] = []
    reasoning: str
    evidence: dict

# ---------- Helpers ----------
def _imaging_metrics(img: Image.Image) -> ImagingMetrics:
    arr = np.array(img.convert("L"))
    mean_int = float(arr.mean()/255.0)
    edges = cv2.Canny(arr, 50, 150)
    edge_density = float(edges.mean()/255.0)
    blur = float(cv2.Laplacian(arr, cv2.CV_64F).var())
    blur_score = float(min(1.0, max(0.0, 1.0 - (blur/200.0))))
    return ImagingMetrics(mean_intensity=mean_int, edge_density=edge_density, blur_score=blur_score)

def rule_engine(inp: TriageInput) -> TriageResult:
    alerts, next_steps, ev = [], [], {}
    txt = f"{inp.transcript_text or ''}\n{inp.lab_text or ''}".lower()

    if re.search(r"chest pain|pressure|tightness", txt):
        alerts.append("Possible cardiac chest pain")
    if re.search(r"shortness of breath|dyspnea", txt):
        alerts.append("Respiratory distress")
    m = re.search(r"oxygen[^0-9]*([0-9]{2})", txt)
    if m:
        spo2 = int(m.group(1))
        ev["spo2"] = spo2
        if spo2 < 92:
            alerts.append("Low SpO₂")
    if inp.imaging:
        ev["imaging"] = inp.imaging.dict()
        if inp.imaging.blur_score > 0.8:
            next_steps.append("Re-acquire image. Excessive blur.")
        if inp.imaging.edge_density < 0.03:
            next_steps.append("Underexposed image. Increase exposure.")

    score = 0
    score += 2 if any(k in txt for k in ["chest pain", "faint", "collapse"]) else 0
    score += 2 if "respiratory distress" in alerts else 0
    score += 2 if "low spo₂" in [a.lower() for a in alerts] else 0
    risk = "LOW" if score <= 1 else "MODERATE" if score == 2 else "HIGH" if score == 3 else "EMERGENCY"

    if risk in ["HIGH","EMERGENCY"]:
        next_steps = ["Call local emergency services", "Keep patient monitored", *next_steps]
        alerts.append("Show emergency banner")

    return TriageResult(
        risk_level=risk,
        emergency_alerts=alerts,
        next_steps=next_steps or ["Primary care consult within 24–48h"],
        reasoning=f"Deterministic rules score={score}",
        evidence=ev
    )

# ---------- Endpoints ----------
@app.post("/asr", dependencies=[Depends(require_key)], response_model=ASRResponse)
@limiter.limit("20/minute")
async def asr(request: Request, file: UploadFile = File(...)):
    if not OPENAI_API_KEY:
        # dev fallback: pretend transcription
        started = time.time()
        return ASRResponse(text="(dev) transcription unavailable without OPENAI_API_KEY", latency_ms=int((time.time()-started)*1000))
    audio = await file.read()
    started = time.time()
    async with httpx.AsyncClient(timeout=120) as client:
        r = await client.post(
            "https://api.openai.com/v1/audio/transcriptions",
            headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
            files={"file": (file.filename, audio, file.content_type or "audio/mpeg")},
            data={"model":"whisper-1"}
        )
    if r.status_code != 200:
        raise HTTPException(r.status_code, r.text)
    text = r.json().get("text","")
    return ASRResponse(text=text, latency_ms=int((time.time()-started)*1000))

@app.post("/ocr", dependencies=[Depends(require_key)], response_model=OCRResponse)
@limiter.limit("20/minute")
async def ocr(request: Request, file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(400, "Upload a PDF")
    data = await file.read()
    if len(data) > 25_000_000:
        raise HTTPException(413, "PDF too large")
    doc = fitz.open(stream=data, filetype="pdf")
    pages = len(doc)
    chunks = [p.get_text() for p in doc]
    return OCRResponse(text="\n".join(chunks).strip(), pages=pages)

@app.post("/imaging", dependencies=[Depends(require_key)], response_model=ImagingResponse)
@limiter.limit("20/minute")
async def imaging(request: Request, file: UploadFile = File(...), preview: bool = Form(False)):
    data = await file.read()
    if len(data) > 10_000_000:
        raise HTTPException(413, "Image too large")
    img = Image.open(io.BytesIO(data))
    metrics = _imaging_metrics(img)
    out = ImagingResponse(metrics=metrics)
    if preview:
        arr = np.array(img.convert("RGB"))
        gray = cv2.cvtColor(arr, cv2.COLOR_RGB2GRAY)
        edges = cv2.Canny(gray, 50, 150)
        overlay = arr.copy()
        overlay[edges>0] = [255,0,0]
        blend = cv2.addWeighted(arr, 0.8, overlay, 0.2, 0)
        _, buf = cv2.imencode(".jpg", blend)
        out.preview_b64 = "data:image/jpeg;base64," + base64.b64encode(buf.tobytes()).decode()
    return out

@app.post("/triage", dependencies=[Depends(require_key)], response_model=TriageResult)
@limiter.limit("20/minute")
async def triage(request: Request, payload: TriageInput):
    return rule_engine(payload)
