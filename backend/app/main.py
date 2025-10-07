from fastapi import FastAPI
import time

app = FastAPI(title="Agentic Health OS API", version="0.1.0")

@app.get("/health")
def health():
    return {"ok": True, "version": "0.1.0", "time": int(time.time())}
