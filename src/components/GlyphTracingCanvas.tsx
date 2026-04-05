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

const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ─── CANONICAL STROKE DEFINITIONS ────────────────────────────────
// Each stroke is an array of {x, y} points normalized to 0–1 range
// within the glyph bounding box. Strokes are drawn in order.
// Use quadratic/cubic curves between points for smooth Mandombe arcs.

type StrokePoint = { x: number; y: number };
type CanonicalStroke = StrokePoint[];

// Canonical stroke maps keyed by glyph label (syllable name)
// Points are normalized 0–1 within the glyph's bounding box
const CANONICAL_STROKES: Record<string, CanonicalStroke[]> = {
  // NTSHI – Based on user reference image showing 5 numbered strokes
  "NTSHI": [
    // Stroke 1: Top horizontal arc curving right
    [{ x: 0.1, y: 0.15 }, { x: 0.3, y: 0.08 }, { x: 0.55, y: 0.1 }, { x: 0.75, y: 0.18 }, { x: 0.9, y: 0.3 }],
    // Stroke 2: Right vertical curve going down
    [{ x: 0.9, y: 0.3 }, { x: 0.92, y: 0.45 }, { x: 0.88, y: 0.6 }, { x: 0.8, y: 0.72 }],
    // Stroke 3: Bottom curve sweeping left
    [{ x: 0.8, y: 0.72 }, { x: 0.65, y: 0.82 }, { x: 0.45, y: 0.88 }, { x: 0.25, y: 0.85 }, { x: 0.1, y: 0.75 }],
    // Stroke 4: Left side going up
    [{ x: 0.1, y: 0.75 }, { x: 0.08, y: 0.6 }, { x: 0.1, y: 0.45 }, { x: 0.15, y: 0.35 }],
    // Stroke 5: Inner detail / cross element
    [{ x: 0.3, y: 0.35 }, { x: 0.5, y: 0.4 }, { x: 0.65, y: 0.5 }, { x: 0.6, y: 0.65 }],
  ],
  // NSHMU – Based on user reference image showing numbered strokes
  "NSHMU": [
    // Stroke 1: Left vertical descending
    [{ x: 0.15, y: 0.1 }, { x: 0.12, y: 0.3 }, { x: 0.1, y: 0.5 }, { x: 0.12, y: 0.7 }, { x: 0.18, y: 0.85 }],
    // Stroke 2: Top horizontal rightward
    [{ x: 0.15, y: 0.1 }, { x: 0.35, y: 0.08 }, { x: 0.55, y: 0.12 }, { x: 0.75, y: 0.2 }],
    // Stroke 3: Right vertical curve descending
    [{ x: 0.75, y: 0.2 }, { x: 0.82, y: 0.35 }, { x: 0.85, y: 0.55 }, { x: 0.8, y: 0.72 }],
    // Stroke 4: Bottom horizontal leftward
    [{ x: 0.8, y: 0.72 }, { x: 0.6, y: 0.82 }, { x: 0.4, y: 0.85 }, { x: 0.18, y: 0.85 }],
    // Stroke 5: Middle horizontal bar
    [{ x: 0.2, y: 0.48 }, { x: 0.4, y: 0.45 }, { x: 0.6, y: 0.48 }, { x: 0.75, y: 0.52 }],
  ],
};

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

// ─── BUILD FALLBACK STROKE PATH (heuristic) ──────────────────────
function buildFallbackStrokePath(
  imgData: ImageData,
  bbox: ReturnType<typeof getGlyphBBox>
): Array<{ x: number; y: number; penDown: boolean }> {
  const { data, width } = imgData;
  const { minX, maxX, minY, maxY } = bbox;

  const rawPts: Array<{ x: number; y: number }> = [];
  const visited = new Set<string>();

  const addPt = (x: number, y: number) => {
    const key = `${Math.round(x)},${Math.round(y)}`;
    if (!visited.has(key)) {
      visited.add(key);
      rawPts.push({ x, y });
    }
  };

  const step = 2;
  for (let y = minY; y <= maxY; y += step) {
    let inRun = false;
    let runStart = 0;
    for (let x = minX; x <= maxX + 1; x++) {
      const isInk = x <= maxX && data[(y * width + x) * 4 + 3] > 30;
      if (isInk && !inRun) { runStart = x; inRun = true; }
      if (!isInk && inRun) {
        addPt((runStart + x - 1) / 2, y);
        inRun = false;
      }
    }
  }

  for (let x = minX; x <= maxX; x += step) {
    let inRun = false;
    let runStart = 0;
    for (let y = minY; y <= maxY + 1; y++) {
      const isInk = y <= maxY && data[(y * width + x) * 4 + 3] > 30;
      if (isInk && !inRun) { runStart = y; inRun = true; }
      if (!isInk && inRun) {
        addPt(x, (runStart + y - 1) / 2);
        inRun = false;
      }
    }
  }

  if (rawPts.length === 0) return [];

  const singiniX = minX;
  const singiniY = minY;

  let bestIdx = 0;
  let bestDist = Infinity;
  for (let i = 0; i < rawPts.length; i++) {
    const d = Math.hypot(rawPts[i].x - singiniX, rawPts[i].y - singiniY);
    if (d < bestDist) { bestDist = d; bestIdx = i; }
  }

  const ordered: Array<{ x: number; y: number }> = [];
  const used = new Uint8Array(rawPts.length);
  let current = bestIdx;

  for (let i = 0; i < rawPts.length; i++) {
    ordered.push(rawPts[current]);
    used[current] = 1;

    let nearestIdx = -1;
    let nearestDist = Infinity;
    for (let j = 0; j < rawPts.length; j++) {
      if (used[j]) continue;
      const d = Math.hypot(rawPts[j].x - rawPts[current].x, rawPts[j].y - rawPts[current].y);
      if (d < nearestDist) { nearestDist = d; nearestIdx = j; }
    }

    if (nearestIdx === -1) break;
    current = nearestIdx;
  }

  const jumpThreshold = 18;
  const pts: Array<{ x: number; y: number; penDown: boolean }> = [];

  for (let i = 0; i < ordered.length; i++) {
    const p = ordered[i];
    if (i === 0) {
      pts.push({ x: p.x, y: p.y, penDown: false });
    } else {
      const prev = ordered[i - 1];
      const dist = Math.hypot(p.x - prev.x, p.y - prev.y);
      pts.push({ x: p.x, y: p.y, penDown: dist < jumpThreshold });
    }
  }

  return pts;
}

// ─── CONVERT CANONICAL STROKES TO PIXEL PATH ─────────────────────
function canonicalToPixelPath(
  strokes: CanonicalStroke[],
  bbox: ReturnType<typeof getGlyphBBox>
): Array<{ x: number; y: number; penDown: boolean; strokeIdx: number }> {
  const { minX, maxX, minY, maxY } = bbox;
  const w = maxX - minX;
  const h = maxY - minY;
  const pts: Array<{ x: number; y: number; penDown: boolean; strokeIdx: number }> = [];

  for (let s = 0; s < strokes.length; s++) {
    const stroke = strokes[s];
    // Interpolate between control points for smoothness
    const interpolated: StrokePoint[] = [];
    for (let i = 0; i < stroke.length - 1; i++) {
      const a = stroke[i];
      const b = stroke[i + 1];
      const steps = 12; // sub-steps per segment for smoothness
      for (let t = 0; t <= steps; t++) {
        const frac = t / steps;
        interpolated.push({
          x: a.x + (b.x - a.x) * frac,
          y: a.y + (b.y - a.y) * frac,
        });
      }
    }

    for (let i = 0; i < interpolated.length; i++) {
      const p = interpolated[i];
      pts.push({
        x: minX + p.x * w,
        y: minY + p.y * h,
        penDown: i > 0, // pen up at start of each stroke
        strokeIdx: s,
      });
    }
  }

  return pts;
}

// ─── SMOOTH QUADRATIC CURVE DRAWING ──────────────────────────────
function drawSmoothPath(
  ctx: CanvasRenderingContext2D,
  pts: Array<{ x: number; y: number; penDown: boolean }>,
  upTo: number,
  strokeColor = "hsl(20,40%,18%)",
  lineWidth = 3.5
) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeColor;

  let i = 0;
  while (i <= upTo) {
    while (i <= upTo && !pts[i].penDown && i > 0) i++;
    if (i > upTo) break;

    const seg: Array<{ x: number; y: number }> = [pts[i]];
    i++;
    while (i <= upTo && pts[i].penDown) {
      seg.push(pts[i]);
      i++;
    }

    if (seg.length < 2) continue;

    ctx.beginPath();
    ctx.moveTo(seg[0].x, seg[0].y);

    if (seg.length === 2) {
      ctx.lineTo(seg[1].x, seg[1].y);
    } else {
      for (let j = 1; j < seg.length - 1; j++) {
        const midX = (seg[j].x + seg[j + 1].x) / 2;
        const midY = (seg[j].y + seg[j + 1].y) / 2;
        ctx.quadraticCurveTo(seg[j].x, seg[j].y, midX, midY);
      }
      const last = seg[seg.length - 1];
      ctx.lineTo(last.x, last.y);
    }
    ctx.stroke();
  }
}

// ─── DRAW STROKE NUMBER LABEL ────────────────────────────────────
function drawStrokeNumber(ctx: CanvasRenderingContext2D, x: number, y: number, num: number) {
  ctx.font = "bold 11px sans-serif";
  ctx.fillStyle = "hsl(210,70%,50%)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Small circle background
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, Math.PI * 2);
  ctx.fillStyle = "hsla(210,80%,95%,0.9)";
  ctx.fill();
  ctx.strokeStyle = "hsl(210,70%,50%)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  // Number
  ctx.fillStyle = "hsl(210,70%,40%)";
  ctx.fillText(String(num), x, y + 1);
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

  // Check if this glyph has a canonical stroke definition
  const canonicalKey = Object.keys(CANONICAL_STROKES).find(
    (k) => k.toUpperCase() === label.toUpperCase()
  );
  const hasCanonical = !!canonicalKey;

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

    const off = renderGlyph(glyph);
    const offCtx = off.getContext("2d")!;
    const imgData = offCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const bbox = getGlyphBBox(imgData);

    if (bbox.maxX <= bbox.minX) { setIsAnimating(false); return; }

    const singiniX = bbox.minX;
    const singiniY = bbox.minY;

    // Choose canonical or fallback path
    let pts: Array<{ x: number; y: number; penDown: boolean; strokeIdx?: number }>;
    let isCanonical = false;

    if (canonicalKey && CANONICAL_STROKES[canonicalKey]) {
      pts = canonicalToPixelPath(CANONICAL_STROKES[canonicalKey], bbox);
      isCanonical = true;
    } else {
      pts = buildFallbackStrokePath(imgData, bbox).map(p => ({ ...p, strokeIdx: 0 }));
    }

    if (pts.length === 0) { setIsAnimating(false); return; }

    // Show Singini first
    drawBg(ctx);
    drawSingini(ctx, singiniX, singiniY);

    // For canonical, also show stroke numbers at start of each stroke
    if (isCanonical) {
      const strokeStarts: Array<{ x: number; y: number; num: number }> = [];
      let lastStroke = -1;
      for (const p of pts) {
        if (p.strokeIdx !== undefined && p.strokeIdx !== lastStroke) {
          strokeStarts.push({ x: p.x, y: p.y, num: p.strokeIdx + 1 });
          lastStroke = p.strokeIdx;
        }
      }
      // We'll draw these during animation
    }

    const DURATION = isCanonical ? 3500 : 2800; // Longer for canonical to show clearly
    let t0: number | null = null;

    const animate = (ts: number) => {
      if (!t0) t0 = ts;
      const raw = Math.min((ts - t0) / DURATION, 1);
      const et = ease(raw);
      const upTo = Math.floor(et * (pts.length - 1));

      drawBg(ctx);

      // Draw smooth stroke up to current point
      drawSmoothPath(ctx, pts, upTo);

      // For canonical mode, show stroke numbers at the start of completed strokes
      if (isCanonical) {
        let lastStroke = -1;
        for (let i = 0; i <= Math.min(upTo, pts.length - 1); i++) {
          const p = pts[i];
          if (p.strokeIdx !== undefined && p.strokeIdx !== lastStroke) {
            lastStroke = p.strokeIdx;
          }
        }
        // Draw numbers for all strokes that have started
        let prevStroke = -1;
        for (const p of pts) {
          if (p.strokeIdx !== undefined && p.strokeIdx !== prevStroke && p.strokeIdx <= lastStroke) {
            drawStrokeNumber(ctx, p.x - 12, p.y - 12, p.strokeIdx + 1);
            prevStroke = p.strokeIdx;
          }
        }
      }

      // Pen tip at current position
      if (upTo < pts.length) {
        drawTip(ctx, pts[upTo].x, pts[upTo].y);
      }

      // Show Singini for first 15%
      if (raw < 0.15) drawSingini(ctx, singiniX, singiniY);

      if (raw < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          const c = canvasRef.current?.getContext("2d");
          if (!c) return;
          drawBg(c);
          c.drawImage(off, 0, 0);

          // Show final stroke numbers overlay for canonical
          if (isCanonical && canonicalKey) {
            const finalStrokes = CANONICAL_STROKES[canonicalKey];
            const { minX, maxX, minY, maxY } = bbox;
            const w = maxX - minX;
            const h = maxY - minY;
            for (let s = 0; s < finalStrokes.length; s++) {
              const first = finalStrokes[s][0];
              drawStrokeNumber(c, minX + first.x * w - 12, minY + first.y * h - 12, s + 1);
            }
          }

          setIsAnimating(false);
        }, 400);
      }
    };

    setTimeout(() => { animRef.current = requestAnimationFrame(animate); }, 700);
  }, [isAnimating, fontReady, glyph, drawBg, canonicalKey]);

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
        {hasCanonical && (
          <div className="absolute bottom-2 left-2 text-[9px] text-primary/60 bg-background/80 px-1.5 py-0.5 rounded">
            ✓ Tracé canonique
          </div>
        )}
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
