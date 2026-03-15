import { useRef, useState, useEffect, useCallback } from "react";
import { RotateCcw, Eye, EyeOff, Play } from "lucide-react";
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

const ease = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;

// ─── RENDER GLYPH TO OFFSCREEN CANVAS ────────────────────────────
function renderGlyph(glyph: string): HTMLCanvasElement {
  const off = document.createElement("canvas");
  off.width = CANVAS_SIZE;
  off.height = CANVAS_SIZE;
  const ctx = off.getContext("2d")!;
  ctx.font = `120px '${FONT_NAME}'`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "hsl(20,40%,18%)";
  ctx.fillText(glyph, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 10);
  return off;
}

// ─── FIND GLYPH BOUNDING BOX ──────────────────────────────────────
function getGlyphBBox(imgData: ImageData) {
  const { data, width, height } = imgData;
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, maxX, minY, maxY };
}

// ─── BUILD SCAN-LINE STROKE PATH ─────────────────────────────────
// Traces the glyph as a single continuous stroke by scanning
// column by column (left to right), collecting the vertical
// extent of ink in each column. The pen moves top→bottom in
// each column, then jumps to the next column.
// This produces a natural writing motion following the glyph shape.
function buildStrokePath(imgData: ImageData, bbox: ReturnType<typeof getGlyphBBox>): Array<{x:number,y:number,penDown:boolean}> {
  const { data, width } = imgData;
  const { minX, maxX, minY, maxY } = bbox;
  const pts: Array<{x:number,y:number,penDown:boolean}> = [];

  // Scan every 2nd column for performance
  const step = 2;
  let lastY = -1;
  let goingDown = true;

  for (let x = minX; x <= maxX; x += step) {
    // Find all inked pixels in this column
    const inkY: number[] = [];
    for (let y = minY; y <= maxY; y++) {
      if (data[(y * width + x) * 4 + 3] > 30) {
        inkY.push(y);
      }
    }
    if (inkY.length === 0) continue;

    // Alternate direction for natural serpentine motion
    const colPts = goingDown ? inkY : [...inkY].reverse();
    goingDown = !goingDown;

    colPts.forEach((y, i) => {
      // Connect to previous point if close enough
      const penDown = i > 0 || (lastY >= 0 && Math.abs(y - lastY) < 40);
      pts.push({ x, y, penDown });
      lastY = y;
    });
  }

  return pts;
}

// ─── COMPONENT ────────────────────────────────────────────────────

const GlyphTracingCanvas = ({ glyph, label }: GlyphTracingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fontReady, setFontReady] = useState(false);
  const animRef = useRef<number>(0);
  const { t } = useLanguage();

  useEffect(() => { waitForFont().then(() => setFontReady(true)); }, []);

  const drawBg = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    // Grid
    ctx.strokeStyle = "hsl(30,25%,82%)";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const m = CANVAS_SIZE / 2;
    ctx.moveTo(m, 0); ctx.lineTo(m, CANVAS_SIZE);
    ctx.moveTo(0, m); ctx.lineTo(CANVAS_SIZE, m);
    ctx.stroke();
    ctx.setLineDash([]);
    // Ghost glyph from font
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

  const drawTip = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const g = ctx.createRadialGradient(x, y, 1, x, y, 14);
    g.addColorStop(0, "hsla(40,95%,65%,0.65)");
    g.addColorStop(1, "hsla(40,95%,65%,0)");
    ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(40,90%,55%)"; ctx.fill();
    ctx.strokeStyle = "hsl(25,80%,35%)"; ctx.lineWidth = 1.5; ctx.stroke();
  };

  const drawSingini = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(0,75%,52%)"; ctx.fill();
    ctx.strokeStyle = "hsl(0,75%,32%)"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.font = "bold 10px sans-serif";
    ctx.fillStyle = "hsl(0,65%,45%)";
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText("Singini", x + 10, y);
  };

  const playAnimation = useCallback(() => {
    if (isAnimating || !fontReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    cancelAnimationFrame(animRef.current);
    setIsAnimating(true);
    setHasDrawn(false);

    // Render glyph to offscreen to get pixel data
    const off = renderGlyph(glyph);
    const offCtx = off.getContext("2d")!;
    const imgData = offCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const bbox = getGlyphBBox(imgData);

    if (bbox.maxX <= bbox.minX) { setIsAnimating(false); return; }

    // Singini = top-left of glyph bounding box
    const singiniX = bbox.minX;
    const singiniY = bbox.minY;

    // Build stroke path following the glyph pixels
    const pts = buildStrokePath(imgData, bbox);
    if (pts.length === 0) { setIsAnimating(false); return; }

    // Show Singini first
    drawBg(ctx);
    drawSingini(ctx, singiniX, singiniY);

    const DURATION = 2400;
    let t0: number | null = null;

    const animate = (ts: number) => {
      if (!t0) t0 = ts;
      const raw = Math.min((ts - t0) / DURATION, 1);
      const et = ease(raw);
      const upTo = Math.floor(et * (pts.length - 1));

      drawBg(ctx);

      // Draw stroke path up to current point
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "hsl(20,40%,18%)";
      let open = false;
      for (let i = 0; i <= upTo; i++) {
        const p = pts[i];
        if (!p.penDown || !open) {
          if (open) ctx.stroke();
          ctx.beginPath(); ctx.moveTo(p.x, p.y); open = true;
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
      if (open) ctx.stroke();

      // Pen tip at current position
      if (upTo < pts.length) {
        drawTip(ctx, pts[upTo].x, pts[upTo].y);
      }

      // Show Singini for first 15%
      if (raw < 0.15) drawSingini(ctx, singiniX, singiniY);

      if (raw < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Final: show crisp font glyph
        setTimeout(() => {
          const c = canvasRef.current?.getContext("2d");
          if (!c) return;
          drawBg(c);
          c.drawImage(off, 0, 0);
          setIsAnimating(false);
        }, 400);
      }
    };

    setTimeout(() => { animRef.current = requestAnimationFrame(animate); }, 700);
  }, [isAnimating, fontReady, glyph, drawBg]);

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  // ── Freehand drawing ──────────────────────────────────────────
  const getPos = (e: React.MouseEvent | React.TouchEvent): [number, number] => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    const sx = c.width / r.width, sy = c.height / r.height;
    if ("touches" in e) return [(e.touches[0].clientX - r.left) * sx, (e.touches[0].clientY - r.top) * sy];
    return [(e.clientX - r.left) * sx, (e.clientY - r.top) * sy];
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return; e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d"); if (!ctx) return;
    setIsDrawing(true); setHasDrawn(true);
    const [x, y] = getPos(e);
    ctx.beginPath(); ctx.moveTo(x, y);
    ctx.strokeStyle = "hsl(20,40%,15%)"; ctx.lineWidth = 5;
    ctx.lineCap = "round"; ctx.lineJoin = "round";
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating || !isDrawing) return; e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d"); if (!ctx) return;
    const [x, y] = getPos(e); ctx.lineTo(x, y); ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    cancelAnimationFrame(animRef.current);
    setIsAnimating(false); setHasDrawn(false);
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
        {!isAnimating && !hasDrawn && (
          <div className="absolute top-2 right-2 text-[10px] text-muted-foreground/50 italic pr-1">
            Singini → point d'entrée
          </div>
        )}
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <Button variant="outline" size="sm" onClick={playAnimation} disabled={isAnimating} className="text-xs gap-1.5">
          <Play className="w-3.5 h-3.5" />
          {isAnimating ? "…" : (t("mandombe.animate") || "Animer")}
        </Button>
        <Button variant="outline" size="sm" onClick={() => setShowGuide(g => !g)} className="text-xs gap-1.5">
          {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {t("mandombe.guide") || "Guide"}
        </Button>
        <Button variant="outline" size="sm" onClick={clearCanvas} disabled={!hasDrawn && !isAnimating} className="text-xs gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          {t("mandombe.clear") || "Effacer"}
        </Button>
      </div>
    </div>
  );
};

export default GlyphTracingCanvas;
