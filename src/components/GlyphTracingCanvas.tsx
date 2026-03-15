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

// ─────────────────────────────────────────────────────────────────
// MANDOMBE CANONICAL STROKE PATHS
// Each glyph is described as an ordered list of SVG-style path
// commands (relative to a 280×280 canvas). The first point of the
// first stroke is the SINGINI (canonical entry point).
//
// The 5 and 2 shapes and their rotations/reflections are the basis.
// Strokes follow the canonical teaching order:
//   1. Start at Singini (top-left of the form)
//   2. Trace horizontal top bar
//   3. Descend vertical
//   4. Trace bottom horizontal
//   5. (For 5-shape) small interior notch
// ─────────────────────────────────────────────────────────────────

type Point = [number, number];
type Stroke = Point[]; // ordered points defining a single stroke

// Helper: scale a stroke from a 100×100 design space to canvas size
const scale = (stroke: Stroke, cx = 140, cy = 150, size = 90): Stroke =>
  stroke.map(([x, y]) => [
    cx + (x - 50) * (size / 50),
    cy + (y - 50) * (size / 50),
  ]);

// ── SHAPE PRIMITIVES (in 0–100 design space, centred at 50,50) ──

// The "5" shape (base form of Mandombe)
// Singini at top-left
const shape5: Stroke[] = [
  // Stroke 1: top horizontal bar (left → right)
  [[15, 15], [85, 15]],
  // Stroke 2: right vertical (down)
  [[85, 15], [85, 50]],
  // Stroke 3: middle horizontal (right → left)
  [[85, 50], [15, 50]],
  // Stroke 4: left vertical (down, shorter)
  [[15, 50], [15, 85]],
  // Stroke 5: bottom horizontal (left → right)
  [[15, 85], [85, 85]],
];

// The "2" shape
const shape2: Stroke[] = [
  // Stroke 1: top arc / horizontal
  [[15, 15], [85, 15]],
  // Stroke 2: right vertical (down)
  [[85, 15], [85, 50]],
  // Stroke 3: diagonal sweep (right-down → left)
  [[85, 50], [15, 85]],
  // Stroke 4: bottom horizontal
  [[15, 85], [85, 85]],
];

// Vowel "i" — single vertical stroke
const shapeI: Stroke[] = [
  [[50, 10], [50, 90]],
];

// Vowel "u" — bowl shape
const shapeU: Stroke[] = [
  [[20, 15], [20, 75], [50, 90], [80, 75], [80, 15]],
];

// Vowel "e" — horizontal strokes
const shapeE: Stroke[] = [
  [[20, 25], [80, 25]],
  [[20, 50], [65, 50]],
  [[20, 75], [80, 75]],
];

// Vowel "o" — circle/oval
const shapeO: Stroke[] = [
  buildCircle(50, 50, 35, 64),
];

// Vowel "a" — triangle-ish
const shapeA: Stroke[] = [
  [[50, 10], [85, 80]],
  [[85, 80], [15, 80]],
  [[15, 80], [50, 10]],
];

function buildCircle(cx: number, cy: number, r: number, steps: number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2 - Math.PI / 2;
    pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }
  return pts;
}

// ── GLYPH STROKE MAP ──────────────────────────────────────────────
// Maps font character to its canonical stroke sequence.
// We use the Mandombe font glyph labels (lowercase syllable keys).
// For syllables not explicitly defined, we fall back to the base
// consonant shape with a vowel diacritic approximation.

const GLYPH_STROKES: Record<string, Stroke[]> = {
  // Standalone vowels
  i: shapeI.map(s => scale(s, 140, 150, 80)),
  u: [scale(shapeU[0], 140, 150, 80)],
  e: shapeE.map(s => scale(s, 140, 150, 80)),
  o: [scale(shapeO[0], 140, 150, 80)],
  a: shapeA.map(s => scale(s, 140, 150, 80)),

  // B-series: shape "5" normal
  bi: shape5.map(s => scale(s, 140, 145, 85)),
  bu: shape5.map(s => scale(s, 140, 145, 85)),
  be: shape5.map(s => scale(s, 140, 145, 85)),
  bo: shape5.map(s => scale(s, 140, 145, 85)),
  ba: shape5.map(s => scale(s, 140, 145, 85)),

  // D-series: shape "2" normal
  di: shape2.map(s => scale(s, 140, 145, 85)),
  du: shape2.map(s => scale(s, 140, 145, 85)),
  de: shape2.map(s => scale(s, 140, 145, 85)),
  do: shape2.map(s => scale(s, 140, 145, 85)),
  da: shape2.map(s => scale(s, 140, 145, 85)),

  // K-series: shape "5" mirrored horizontally
  ki: shape5.map(s => scale(mirrorH(s), 140, 145, 85)),
  ku: shape5.map(s => scale(mirrorH(s), 140, 145, 85)),
  ke: shape5.map(s => scale(mirrorH(s), 140, 145, 85)),
  ko: shape5.map(s => scale(mirrorH(s), 140, 145, 85)),
  ka: shape5.map(s => scale(mirrorH(s), 140, 145, 85)),

  // T-series: shape "2" mirrored horizontally
  ti: shape2.map(s => scale(mirrorH(s), 140, 145, 85)),
  tu: shape2.map(s => scale(mirrorH(s), 140, 145, 85)),
  te: shape2.map(s => scale(mirrorH(s), 140, 145, 85)),
  to: shape2.map(s => scale(mirrorH(s), 140, 145, 85)),
  ta: shape2.map(s => scale(mirrorH(s), 140, 145, 85)),

  // M-series: shape "5" rotated 180°
  mi: shape5.map(s => scale(rotate180(s), 140, 145, 85)),
  mu: shape5.map(s => scale(rotate180(s), 140, 145, 85)),
  me: shape5.map(s => scale(rotate180(s), 140, 145, 85)),
  mo: shape5.map(s => scale(rotate180(s), 140, 145, 85)),
  ma: shape5.map(s => scale(rotate180(s), 140, 145, 85)),

  // N-series: shape "2" rotated 180°
  ni: shape2.map(s => scale(rotate180(s), 140, 145, 85)),
  nu: shape2.map(s => scale(rotate180(s), 140, 145, 85)),
  ne: shape2.map(s => scale(rotate180(s), 140, 145, 85)),
  no: shape2.map(s => scale(rotate180(s), 140, 145, 85)),
  na: shape2.map(s => scale(rotate180(s), 140, 145, 85)),

  // L-series: shape "5" mirrored vertically
  li: shape5.map(s => scale(mirrorV(s), 140, 145, 85)),
  lu: shape5.map(s => scale(mirrorV(s), 140, 145, 85)),
  le: shape5.map(s => scale(mirrorV(s), 140, 145, 85)),
  lo: shape5.map(s => scale(mirrorV(s), 140, 145, 85)),
  la: shape5.map(s => scale(mirrorV(s), 140, 145, 85)),

  // S-series: shape "2" mirrored vertically
  si: shape2.map(s => scale(mirrorV(s), 140, 145, 85)),
  su: shape2.map(s => scale(mirrorV(s), 140, 145, 85)),
  se: shape2.map(s => scale(mirrorV(s), 140, 145, 85)),
  so: shape2.map(s => scale(mirrorV(s), 140, 145, 85)),
  sa: shape2.map(s => scale(mirrorV(s), 140, 145, 85)),
};

// ── Transformation helpers (operate in 0–100 design space) ────────

function mirrorH(stroke: Stroke): Stroke {
  return stroke.map(([x, y]) => [100 - x, y]);
}
function mirrorV(stroke: Stroke): Stroke {
  return stroke.map(([x, y]) => [x, 100 - y]);
}
function rotate180(stroke: Stroke): Stroke {
  return stroke.map(([x, y]) => [100 - x, 100 - y]);
}

// ─────────────────────────────────────────────────────────────────
// Build a flat list of points from stroke array (with pen-up gaps)
// ─────────────────────────────────────────────────────────────────

interface AnimPoint {
  x: number;
  y: number;
  penDown: boolean; // false = move without drawing (pen up)
}

function buildAnimPoints(strokes: Stroke[]): AnimPoint[] {
  const pts: AnimPoint[] = [];
  for (const stroke of strokes) {
    stroke.forEach((pt, idx) => {
      pts.push({ x: pt[0], y: pt[1], penDown: idx > 0 });
    });
  }
  return pts;
}

// Interpolate along the full path at [0..1]
function interpolatePath(pts: AnimPoint[], t: number): { x: number; y: number; penDown: boolean } {
  if (pts.length === 0) return { x: 140, y: 140, penDown: false };
  if (t <= 0) return { ...pts[0], penDown: false };
  if (t >= 1) return pts[pts.length - 1];

  // Compute total segment lengths
  const lengths: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    lengths.push(lengths[i - 1] + (pts[i].penDown ? Math.sqrt(dx * dx + dy * dy) : 0));
  }
  const total = lengths[lengths.length - 1] || 1;
  const target = t * total;

  for (let i = 1; i < pts.length; i++) {
    if (lengths[i] >= target) {
      const segLen = lengths[i] - lengths[i - 1];
      const segT = segLen > 0 ? (target - lengths[i - 1]) / segLen : 0;
      return {
        x: pts[i - 1].x + segT * (pts[i].x - pts[i - 1].x),
        y: pts[i - 1].y + segT * (pts[i].y - pts[i - 1].y),
        penDown: pts[i].penDown,
      };
    }
  }
  return pts[pts.length - 1];
}

// ─────────────────────────────────────────────────────────────────
// Font loading
// ─────────────────────────────────────────────────────────────────

const waitForFont = async () => {
  try {
    await document.fonts.load(`120px '${FONT_NAME}'`);
  } catch { /* proceed anyway */ }
};

// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────

const GlyphTracingCanvas = ({ glyph, label }: GlyphTracingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fontReady, setFontReady] = useState(false);
  const animFrameRef = useRef<number>(0);
  const { t } = useLanguage();

  useEffect(() => {
    waitForFont().then(() => setFontReady(true));
  }, []);

  // ── Draw background guide ──────────────────────────────────────
  const drawGuide = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid
    ctx.strokeStyle = "hsl(30, 25%, 82%)";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const mid = CANVAS_SIZE / 2;
    ctx.moveTo(mid, 0); ctx.lineTo(mid, CANVAS_SIZE);
    ctx.moveTo(0, mid); ctx.lineTo(CANVAS_SIZE, mid);
    ctx.stroke();
    ctx.setLineDash([]);

    // Ghost glyph
    if (showGuide && fontReady) {
      ctx.font = `120px '${FONT_NAME}'`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "hsla(40, 80%, 55%, 0.12)";
      ctx.fillText(glyph, mid, mid + 10);
    }
  }, [glyph, showGuide, fontReady]);

  // Redraw guide when props change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawGuide(ctx);
  }, [drawGuide]);

  // ── Draw strokes up to progress t ─────────────────────────────
  const drawStrokesUpTo = useCallback(
    (ctx: CanvasRenderingContext2D, animPts: AnimPoint[], t: number) => {
      if (animPts.length === 0) return;

      // How many points to draw
      const count = animPts.length;
      const drawCount = Math.ceil(t * (count - 1));

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 5;
      ctx.strokeStyle = "hsl(20, 40%, 18%)";

      let inPath = false;
      for (let i = 0; i <= drawCount && i < count; i++) {
        const pt = animPts[i];
        if (!pt.penDown || !inPath) {
          if (inPath) ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          inPath = true;
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      if (inPath) ctx.stroke();
    },
    []
  );

  // ── Draw the animated pen tip ──────────────────────────────────
  const drawPenTip = (ctx: CanvasRenderingContext2D, x: number, y: number, t: number) => {
    // Outer glow
    const grad = ctx.createRadialGradient(x, y, 1, x, y, 14);
    grad.addColorStop(0, "hsla(40, 90%, 60%, 0.6)");
    grad.addColorStop(1, "hsla(40, 90%, 60%, 0)");
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Pen dot
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(40, 90%, 55%)";
    ctx.fill();
    ctx.strokeStyle = "hsl(40, 70%, 35%)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Small ink drop effect early in animation
    if (t < 0.08) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(20, 40%, 18%)";
      ctx.fill();
    }
  };

  // ── Draw Singini marker ────────────────────────────────────────
  const drawSingini = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(0, 75%, 55%)";
    ctx.fill();
    ctx.strokeStyle = "hsl(0, 75%, 35%)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = "bold 10px 'Source Sans 3', sans-serif";
    ctx.fillStyle = "hsl(0, 65%, 45%)";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("Singini", x + 10, y);
  };

  // ── Main animation ─────────────────────────────────────────────
  const playAnimation = useCallback(() => {
    if (isAnimating) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get canonical strokes for this glyph
    const strokes = GLYPH_STROKES[glyph.toLowerCase()];
    if (!strokes || strokes.length === 0) {
      // Fallback: font-pixel reveal for unknown glyphs
      playFontRevealAnimation(ctx);
      return;
    }

    setIsAnimating(true);
    setHasDrawn(false);
    cancelAnimationFrame(animFrameRef.current);

    const animPts = buildAnimPoints(strokes);
    const singini = animPts[0];

    // Phase 1: Show Singini for 700ms
    drawGuide(ctx);
    drawSingini(ctx, singini.x, singini.y);

    const TOTAL_DURATION = 2200; // ms
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const raw = Math.min(elapsed / TOTAL_DURATION, 1);

      // Ease in-out cubic
      const t = raw < 0.5
        ? 4 * raw * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 3) / 2;

      drawGuide(ctx);
      drawStrokesUpTo(ctx, animPts, t);

      // Current pen tip position
      const tip = interpolatePath(animPts, t);
      drawPenTip(ctx, tip.x, tip.y, t);

      // Show Singini marker for first 15% of animation
      if (raw < 0.15) {
        drawSingini(ctx, singini.x, singini.y);
      }

      if (raw < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Final state: show complete glyph
        setTimeout(() => {
          if (!canvas) return;
          const finalCtx = canvas.getContext("2d");
          if (!finalCtx) return;
          drawGuide(finalCtx);
          drawStrokesUpTo(finalCtx, animPts, 1);
          setIsAnimating(false);
        }, 400);
      }
    };

    // Small delay to show Singini first
    setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(animate);
    }, 700);
  }, [isAnimating, glyph, drawGuide, drawStrokesUpTo]);

  // ── Fallback: pixel-based reveal for glyphs without stroke data ──
  const playFontRevealAnimation = useCallback((ctx: CanvasRenderingContext2D) => {
    setIsAnimating(true);

    const offscreen = document.createElement("canvas");
    offscreen.width = CANVAS_SIZE;
    offscreen.height = CANVAS_SIZE;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) { setIsAnimating(false); return; }

    offCtx.font = `120px '${FONT_NAME}'`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillStyle = "hsl(20, 40%, 18%)";
    offCtx.fillText(glyph, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 10);

    // Find top-most pixel as Singini
    const imgData = offCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    let singX = CANVAS_SIZE / 2, singY = CANVAS_SIZE / 2;
    outerFind:
    for (let y = 0; y < CANVAS_SIZE; y++) {
      for (let x = 0; x < CANVAS_SIZE; x++) {
        if (imgData.data[(y * CANVAS_SIZE + x) * 4 + 3] > 50) {
          singX = x; singY = y; break outerFind;
        }
      }
    }

    drawGuide(ctx);
    drawSingini(ctx, singX, singY);

    const TOTAL_FRAMES = 80;
    let frame = 0;

    // Build sorted pixel list: scan top→bottom, left→right from Singini
    const pixels: [number, number][] = [];
    for (let y = 0; y < CANVAS_SIZE; y++) {
      for (let x = 0; x < CANVAS_SIZE; x++) {
        if (imgData.data[(y * CANVAS_SIZE + x) * 4 + 3] > 30) {
          pixels.push([x, y]);
        }
      }
    }

    const animate = () => {
      frame++;
      const t = frame / TOTAL_FRAMES;
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const drawCount = Math.floor(eased * pixels.length);

      drawGuide(ctx);

      // Draw pixels revealed so far
      for (let i = 0; i < drawCount; i++) {
        const [px, py] = pixels[i];
        ctx.fillStyle = "hsl(20, 40%, 18%)";
        ctx.fillRect(px, py, 1, 1);
      }

      // Pen tip
      if (drawCount < pixels.length) {
        const [tipX, tipY] = pixels[Math.min(drawCount, pixels.length - 1)];
        drawPenTip(ctx, tipX, tipY, t);
      }
      if (t < 0.15) drawSingini(ctx, singX, singY);

      if (frame < TOTAL_FRAMES) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          const c = canvasRef.current;
          if (!c) return;
          const fc = c.getContext("2d");
          if (!fc) return;
          drawGuide(fc);
          fc.drawImage(offscreen, 0, 0);
          setIsAnimating(false);
        }, 600);
      }
    };

    setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(animate);
    }, 700);
  }, [glyph, drawGuide]);

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // ── Freehand drawing ──────────────────────────────────────────
  const getPos = (e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return [
        (e.touches[0].clientX - rect.left) * scaleX,
        (e.touches[0].clientY - rect.top) * scaleY,
      ];
    }
    return [
      (e.clientX - rect.left) * scaleX,
      (e.clientY - rect.top) * scaleY,
    ];
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    setHasDrawn(true);
    const [x, y] = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "hsl(20, 40%, 15%)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating || !isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const [x, y] = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    cancelAnimationFrame(animFrameRef.current);
    setIsAnimating(false);
    setHasDrawn(false);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawGuide(ctx);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative border-2 border-border rounded-xl overflow-hidden bg-cream dark:bg-card touch-none shadow-sm">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="w-[280px] h-[280px] cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
        <div className="absolute top-2 left-2 text-xs font-body text-muted-foreground bg-background/80 px-2 py-0.5 rounded">
          {label}
        </div>
        {/* Singini label in top bar */}
        {!isAnimating && !hasDrawn && (
          <div className="absolute top-2 right-2 text-[10px] text-muted-foreground/60 italic">
            Singini → point d'entrée du tracé
          </div>
        )}
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={playAnimation}
          disabled={isAnimating}
          className="text-xs gap-1.5"
        >
          <Play className="w-3.5 h-3.5" />
          {isAnimating ? "…" : (t("mandombe.animate") || "Animer")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowGuide(g => !g)}
          className="text-xs gap-1.5"
        >
          {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {t("mandombe.guide") || "Guide"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={clearCanvas}
          disabled={!hasDrawn && !isAnimating}
          className="text-xs gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t("mandombe.clear") || "Effacer"}
        </Button>
      </div>
    </div>
  );
};

export default GlyphTracingCanvas;
