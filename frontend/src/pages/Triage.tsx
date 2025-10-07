import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8000";
const KEY = import.meta.env.VITE_API_KEY || "dev-key-change";

export default function Triage() {
  const [audio, setAudio] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [img, setImg] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const headers = { "X-API-Key": KEY };

  async function post(url: string, fd: FormData) {
    const r = await fetch(url, { method: "POST", headers, body: fd });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  }

  async function run() {
    setBusy(true);
    setResult(null);
    try {
      const asrP = audio
        ? (() => {
            const f = new FormData();
            f.append("file", audio!);
            return post(`${API}/asr`, f);
          })()
        : Promise.resolve(null);

      const ocrP = pdf
        ? (() => {
            const f = new FormData();
            f.append("file", pdf!);
            return post(`${API}/ocr`, f);
          })()
        : Promise.resolve(null);

      const imgP = img
        ? (() => {
            const f = new FormData();
            f.append("file", img!);
            f.append("preview", "true");
            return post(`${API}/imaging`, f);
          })()
        : Promise.resolve(null);

      const [asr, ocr, im] = await Promise.all([asrP, ocrP, imgP]);

      const payload = {
        transcript_text: asr?.text ?? null,
        lab_text: ocr?.text ?? null,
        imaging: im?.metrics ?? null,
      };

      const r = await fetch(`${API}/triage`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      setResult({ ...data, asr, ocr, preview_b64: im?.preview_b64 ?? null });
    } catch (e: any) {
      alert(e.message || "Error");
    } finally {
      setBusy(false);
    }
  }

  function exportPrint() {
    const w = window.open();
    if (!w) return;
    w.document.write(`<pre>${JSON.stringify(result, null, 2)}</pre>`);
    w.print();
  }

  return (
    <div className="p-6 space-y-4">
      <div className="text-sm text-red-600">
        Emergency? Call 112 / 911. This tool is not for diagnosis.
      </div>
      <h1 className="text-2xl font-bold">Agentic Health OS — Triage</h1>

      <Card>
        <CardContent className="p-4 grid gap-3">
          <div>
            <label>Audio</label>
            <Input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudio(e.target.files?.[0] || null)}
            />
          </div>
          <div>
            <label>Lab PDF</label>
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files?.[0] || null)}
            />
          </div>
          <div>
            <label>Imaging</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={run} disabled={busy}>
              Run Triage
            </Button>
            <Button variant="outline" onClick={exportPrint} disabled={!result}>
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <div>
              Risk: <b>{result.risk_level}</b>
            </div>
            {result.emergency_alerts?.length > 0 && (
              <div className="text-red-600">
                Alerts: {result.emergency_alerts.join(", ")}
              </div>
            )}
            {result.preview_b64 && (
              <img
                src={result.preview_b64}
                alt="overlay"
                className="max-w-md border"
              />
            )}
            <pre className="text-xs bg-black text-green-200 p-3 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
