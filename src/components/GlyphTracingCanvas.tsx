import { useRef, useState, useEffect, useCallback } from "react";
import { RotateCcw, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface GlyphTracingCanvasProps {
  glyph: string;
  label: string;
}

const CANVAS_SIZE = 280;
const FONT_NAME = "Masono Mandombe";

const waitForFont = async () => {
  try { await document.fonts.load(`120px '${FONT_NAME}'`); } catch { /**/ }
};

const GlyphTracingCanvas = ({ glyph, label }: GlyphTracingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [fontReady, setFontReady] = useState(false);
  const { t } = useLanguage();

  useEffect(() => { waitForFont().then(() => setFontReady(true)); }, []);

  const drawBg = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.strokeStyle = "hsl(30,25%,82%)";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const m = CANVAS_SIZE / 2;
    ctx.moveTo(m, 0); ctx.lineTo(m, CANVAS_SIZE);
    ctx.moveTo(0, m); ctx.lineTo(CANVAS_SIZE, m);
    ctx.stroke();
    ctx.setLineDash([]);
    if (showGuide && fontReady) {
      ctx.font = `120px '${FONT_NAME}'`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "hsla(40,80%,55%,0.13)";
      ctx.fillText(glyph, m, m + 10);
    }
  }, [glyph, showGuide, fontReady]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawBg(ctx);
  }, [drawBg]);

  const getPos = (e: React.MouseEvent | React.TouchEvent): [number, number] => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    const sx = c.width / r.width, sy = c.height / r.height;
    if ("touches" in e) return [(e.touches[0].clientX - r.left) * sx, (e.touches[0].clientY - r.top) * sy];
    return [(e.clientX - r.left) * sx, (e.clientY - r.top) * sy];
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d"); if (!ctx) return;
    setIsDrawing(true); setHasDrawn(true);
    const [x, y] = getPos(e);
    ctx.beginPath(); ctx.moveTo(x, y);
    ctx.strokeStyle = "hsl(20,40%,15%)"; ctx.lineWidth = 5;
    ctx.lineCap = "round"; ctx.lineJoin = "round";
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return; e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d"); if (!ctx) return;
    const [x, y] = getPos(e); ctx.lineTo(x, y); ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    setHasDrawn(false);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawBg(ctx);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative border-2 border-border rounded-xl overflow-hidden bg-cream dark:bg-card touch-none shadow-sm">
        <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE}
          className="w-[280px] h-[280px] cursor-crosshair"
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
        />
        <div className="absolute top-2 left-2 text-xs font-body text-muted-foreground bg-background/80 px-2 py-0.5 rounded">{label}</div>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <Button variant="outline" size="sm" onClick={() => setShowGuide(g => !g)} className="text-xs gap-1.5">
          {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {t("mandombe.guide") || "Guide"}
        </Button>
        <Button variant="outline" size="sm" onClick={clearCanvas} disabled={!hasDrawn} className="text-xs gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          {t("mandombe.clear") || "Effacer"}
        </Button>
      </div>
    </div>
  );
};

export default GlyphTracingCanvas;
