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
  try { await document.fonts.load(`120px '${FONT_NAME}'`); } catch { /* proceed */ }
};

// ─────────────────────────────────────────────────────────────────
// CANONICAL MANDOMBE STROKE PATHS
// Based on "Read and Write Mandombe" by Kahunga Editions.
//
// The Mvuala Mpamba (base syllable) has 5 sides:
//   Pakudungu (5-shape): Singini top-left, trace →↓→↓→
//   Pelekete  (2-shape): Singini top-right (mirror), trace ←↓←↓←
//
// All coordinates are in a 0–100 normalized space.
// Y increases downward (canvas convention).
//
// Each glyph = array of strokes.
// Each stroke = array of [x, y] waypoints drawn in order (pen down).
// A new stroke means pen-up then pen-down at first point.
// ─────────────────────────────────────────────────────────────────

type Pt = [number, number];
type Stroke = Pt[];
type GlyphStrokes = Stroke[];

// ── BASE SHAPES ───────────────────────────────────────────────────

// Pakudungu "5" — Singini at top-left
// Segments: 1(top→) 2(↓left) 3(middle→) 4(↓right) 5(bottom→)
// One continuous stroke, 5 direction changes
const PAKU: GlyphStrokes = [[
  [10, 10], // Singini (top-left)
  [90, 10], // 1 → top bar right
  [90, 50], // 2 ↓ right side down to mid
  [10, 50], // 3 ← middle bar left
  [10, 90], // 4 ↓ left side down to bottom
  [90, 90], // 5 → bottom bar right
]];

// Pelekete "2" — Singini at top-right (mirror of 5)
// Segments: 1(top←) 2(↓right) 3(middle←) 4(↓left) 5(bottom←)  
const PELE: GlyphStrokes = [[
  [90, 10], // Singini (top-right)
  [10, 10], // 1 ← top bar left
  [10, 50], // 2 ↓ left side down to mid
  [90, 50], // 3 → middle bar right
  [90, 90], // 4 ↓ right side down to bottom
  [10, 90], // 5 ← bottom bar left
]];

// Flipped versions (Singini at bottom — "Singini d'en bas")
const PAKU_FLIP: GlyphStrokes = [[
  [10, 90],
  [90, 90],
  [90, 50],
  [10, 50],
  [10, 10],
  [90, 10],
]];

const PELE_FLIP: GlyphStrokes = [[
  [90, 90],
  [10, 90],
  [10, 50],
  [90, 50],
  [90, 10],
  [10, 10],
]];

// ── TRANSFORMATIONS ───────────────────────────────────────────────
// Mirror horizontally (left↔right)
const mH = (s: GlyphStrokes): GlyphStrokes =>
  s.map(stroke => stroke.map(([x, y]) => [100 - x, y] as Pt));

// Mirror vertically (top↔bottom)  
const mV = (s: GlyphStrokes): GlyphStrokes =>
  s.map(stroke => stroke.map(([x, y]) => [x, 100 - y] as Pt));

// Rotate 180°
const r180 = (s: GlyphStrokes): GlyphStrokes =>
  s.map(stroke => stroke.map(([x, y]) => [100 - x, 100 - y] as Pt));

// Scale strokes to canvas with padding
const toCanvas = (strokes: GlyphStrokes, size: number, pad: number): GlyphStrokes => {
  const usable = size - pad * 2;
  return strokes.map(stroke =>
    stroke.map(([x, y]) => [
      pad + (x / 100) * usable,
      pad + (y / 100) * usable,
    ] as Pt)
  );
};

// ── GLYPH DATABASE ────────────────────────────────────────────────
// Mandombe consonant families:
// B, D → Pakudungu (5) normal
// K, T → Pakudungu (5) mirrored H → looks like reversed-5
// M, N → Pakudungu (5) rotated 180° 
// L, S → Pakudungu (5) mirrored V
// F, V → Pelekete (2) normal
// W, Y → Pelekete (2) mirrored H
// Z     → Pelekete (2) rotated 180°
// etc.
// Vowel diacritics (i,u,e,o,a) modify position of the base shape.
// For simplicity we use the same base shape per consonant family.

const GLYPH_MAP: Record<string, GlyphStrokes> = {
  // ── VOWELS (standalone) ─────────────────────────────────────
  // "i" — single vertical bar
  i: [[[50, 10], [50, 90]]],
  // "u" — U shape
  u: [[[15, 10], [15, 80], [50, 95], [85, 80], [85, 10]]],
  // "e" — three horizontal bars
  e: [[[15, 20], [85, 20]], [[15, 50], [70, 50]], [[15, 80], [85, 80]]],
  // "o" — closed rectangle (Pelekete-like)
  o: [[[15, 10], [85, 10], [85, 90], [15, 90], [15, 10]]],
  // "a" — open bottom
  a: [[[85, 10], [15, 10], [15, 90], [85, 90]]],

  // ── B-series: Pakudungu normal ──────────────────────────────
  bi: PAKU, bu: PAKU, be: PAKU, bo: PAKU, ba: PAKU,
  bia: PAKU, bue: PAKU, bio: PAKU, bua: PAKU, bui: PAKU, biu: PAKU,

  // ── D-series: Pakudungu normal ──────────────────────────────
  di: PAKU, du: PAKU, de: PAKU, do: PAKU, da: PAKU,
  dia: PAKU, due: PAKU, dua: PAKU,

  // ── K-series: Pakudungu mirrored H ──────────────────────────
  ki: mH(PAKU), ku: mH(PAKU), ke: mH(PAKU), ko: mH(PAKU), ka: mH(PAKU),
  kua: mH(PAKU), kui: mH(PAKU),

  // ── T-series: Pakudungu flipped V ───────────────────────────
  ti: mV(PAKU), tu: mV(PAKU), te: mV(PAKU), to: mV(PAKU), ta: mV(PAKU),

  // ── M-series: Pakudungu rotated 180° ────────────────────────
  mi: r180(PAKU), mu: r180(PAKU), me: r180(PAKU), mo: r180(PAKU), ma: r180(PAKU),
  mua: r180(PAKU),

  // ── N-series: Pakudungu mH + mV (= r180 of mH) ─────────────
  ni: mH(mV(PAKU)), nu: mH(mV(PAKU)), ne: mH(mV(PAKU)),
  no: mH(mV(PAKU)), na: mH(mV(PAKU)),

  // ── L-series: Pakudungu mirrored V ──────────────────────────
  li: mV(PAKU), lu: mV(PAKU), le: mV(PAKU), lo: mV(PAKU), la: mV(PAKU),

  // ── S-series: Pakudungu mH + mV ─────────────────────────────
  si: r180(mH(PAKU)), su: r180(mH(PAKU)), se: r180(mH(PAKU)),
  so: r180(mH(PAKU)), sa: r180(mH(PAKU)),

  // ── F-series: Pelekete normal ────────────────────────────────
  fi: PELE, fu: PELE, fe: PELE, fo: PELE, fa: PELE,
  fua: PELE,

  // ── V-series: Pelekete mirrored H ───────────────────────────
  vi: mH(PELE), vu: mH(PELE), ve: mH(PELE), vo: mH(PELE), va: mH(PELE),

  // ── W-series: Pelekete mirrored V ───────────────────────────
  wi: mV(PELE), wu: mV(PELE), we: mV(PELE), wo: mV(PELE), wa: mV(PELE),
  wuna: mV(PELE),

  // ── Y-series: Pelekete r180 ──────────────────────────────────
  yi: r180(PELE), yu: r180(PELE), ye: r180(PELE), yo: r180(PELE), ya: r180(PELE),

  // ── Z-series: Pelekete mH + mV ──────────────────────────────
  zi: mH(mV(PELE)), zu: mH(mV(PELE)), ze: mH(mV(PELE)),
  zo: mH(mV(PELE)), za: mH(mV(PELE)),

  // ── MB-series: double Pakudungu ──────────────────────────────
  mbi: PAKU, mbu: PAKU, mbe: PAKU, mbo: PAKU, mba: PAKU,

  // ── ND-series ────────────────────────────────────────────────
  ndi: PAKU, ndu: PAKU, nde: PAKU, ndo: PAKU, nda: PAKU,

  // ── NG-series ────────────────────────────────────────────────
  ngi: mH(PAKU), ngu: mH(PAKU), nge: mH(PAKU), ngo: mH(PAKU), nga: mH(PAKU),

  // ── NT-series ────────────────────────────────────────────────
  nti: mV(PAKU), ntu: mV(PAKU), nte: mV(PAKU), nto: mV(PAKU), nta: mV(PAKU),

  // ── NS-series ────────────────────────────────────────────────
  nsi: r180(mH(PAKU)), nsu: r180(mH(PAKU)), nse: r180(mH(PAKU)),
  nso: r180(mH(PAKU)), nsa: r180(mH(PAKU)),

  // ── SH-series: Pelekete mV ───────────────────────────────────
  shi: mV(PELE), shu: mV(PELE), she: mV(PELE), sho: mV(PELE), sha: mV(PELE),

  // ── TSH-series ───────────────────────────────────────────────
  tshi: r180(PELE), tshu: r180(PELE), tshe: r180(PELE),

  // ── NZ-series ────────────────────────────────────────────────
  nzi: mH(mV(PELE)), nzu: mH(mV(PELE)), nze: mH(mV(PELE)),
  nzo: mH(mV(PELE)), nza: mH(mV(PELE)),
};

// ── ANIMATION UTILITIES ───────────────────────────────────────────

interface AnimPt { x: number; y: number; penDown: boolean; }

function buildAnimPoints(strokes: GlyphStrokes): AnimPt[] {
  const pts: AnimPt[] = [];
  for (const stroke of strokes) {
    stroke.forEach(([x, y], i) => {
      pts.push({ x, y, penDown: i > 0 });
    });
  }
  return pts;
}

function buildLengths(pts: AnimPt[]): number[] {
  const L = [0];
  for (let i = 1; i < pts.length; i++) {
    const prev = L[i - 1];
    if (!pts[i].penDown) { L.push(prev); continue; }
    const dx = pts[i].x - pts[i-1].x;
    const dy = pts[i].y - pts[i-1].y;
    L.push(prev + Math.sqrt(dx*dx + dy*dy));
  }
  return L;
}

function interpolate(pts: AnimPt[], L: number[], t: number): AnimPt {
  if (!pts.length) return { x: 140, y: 140, penDown: false };
  const total = L[L.length - 1] || 1;
  const target = t * total;
  for (let i = 1; i < pts.length; i++) {
    if (L[i] >= target) {
      const seg = L[i] - L[i-1];
      const st = seg > 0 ? (target - L[i-1]) / seg : 0;
      return {
        x: pts[i-1].x + st * (pts[i].x - pts[i-1].x),
        y: pts[i-1].y + st * (pts[i].y - pts[i-1].y),
        penDown: pts[i].penDown,
      };
    }
  }
  return pts[pts.length - 1];
}

function ease(t: number): number {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
}

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
  const animRef = useRef<number>(0);
  const { t } = useLanguage();

  useEffect(() => { waitForFont().then(() => setFontReady(true)); }, []);

  // ── Background: grid + ghost glyph ───────────────────────────
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
    // Ghost glyph
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

  // ── Draw strokes up to index ──────────────────────────────────
  const drawStrokes = useCallback((ctx: CanvasRenderingContext2D, pts: AnimPt[], upTo: number) => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "hsl(20,40%,18%)";
    let open = false;
    for (let i = 0; i <= upTo && i < pts.length; i++) {
      const p = pts[i];
      if (!p.penDown || !open) {
        if (open) ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        open = true;
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    if (open) ctx.stroke();
  }, []);

  // ── Pen tip glow ──────────────────────────────────────────────
  const drawTip = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const g = ctx.createRadialGradient(x, y, 1, x, y, 16);
    g.addColorStop(0, "hsla(40,95%,65%,0.55)");
    g.addColorStop(1, "hsla(40,95%,65%,0)");
    ctx.beginPath(); ctx.arc(x, y, 16, 0, Math.PI*2);
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, 5.5, 0, Math.PI*2);
    ctx.fillStyle = "hsl(40,90%,58%)"; ctx.fill();
    ctx.strokeStyle = "hsl(25,80%,35%)"; ctx.lineWidth = 1.5; ctx.stroke();
  };

  // ── Singini marker ────────────────────────────────────────────
  const drawSingini = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI*2);
    ctx.fillStyle = "hsl(0,75%,52%)"; ctx.fill();
    ctx.strokeStyle = "hsl(0,75%,32%)"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.font = "bold 10px sans-serif";
    ctx.fillStyle = "hsl(0,65%,45%)";
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText("Singini", x + 10, y);
  };

  // ── Main animation ────────────────────────────────────────────
  const playAnimation = useCallback(() => {
    if (isAnimating) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    cancelAnimationFrame(animRef.current);
    setIsAnimating(true);
    setHasDrawn(false);

    const key = glyph.toLowerCase().trim();
    const rawStrokes = GLYPH_MAP[key];

    if (!rawStrokes) {
      // Fallback for unknown glyphs: pixel reveal from font
      fallbackReveal(ctx);
      return;
    }

    // Scale strokes to canvas
    const canvasStrokes = toCanvas(rawStrokes, CANVAS_SIZE, 25);
    const pts = buildAnimPoints(canvasStrokes);
    const lengths = buildLengths(pts);
    const singini = pts[0];

    // Show Singini first
    drawBg(ctx);
    drawSingini(ctx, singini.x, singini.y);

    const DURATION = 2200;
    let t0: number | null = null;

    const animate = (ts: number) => {
      if (!t0) t0 = ts;
      const raw = Math.min((ts - t0) / DURATION, 1);
      const et = ease(raw);

      drawBg(ctx);
      const upTo = Math.floor(et * (pts.length - 1));
      drawStrokes(ctx, pts, upTo);

      const tip = interpolate(pts, lengths, et);
      drawTip(ctx, tip.x, tip.y);

      if (raw < 0.15) drawSingini(ctx, singini.x, singini.y);

      if (raw < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          const c = canvasRef.current?.getContext("2d");
          if (!c) return;
          drawBg(c);
          drawStrokes(c, pts, pts.length - 1);
          setIsAnimating(false);
        }, 300);
      }
    };

    setTimeout(() => { animRef.current = requestAnimationFrame(animate); }, 700);
  }, [isAnimating, glyph, drawBg, drawStrokes]);

  // ── Fallback pixel reveal ─────────────────────────────────────
  const fallbackReveal = useCallback((ctx: CanvasRenderingContext2D) => {
    const off = document.createElement("canvas");
    off.width = CANVAS_SIZE; off.height = CANVAS_SIZE;
    const oc = off.getContext("2d");
    if (!oc) { setIsAnimating(false); return; }
    oc.font = `120px '${FONT_NAME}'`;
    oc.textAlign = "center"; oc.textBaseline = "middle";
    oc.fillStyle = "hsl(20,40%,18%)";
    oc.fillText(glyph, CANVAS_SIZE/2, CANVAS_SIZE/2+10);

    const img = oc.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    let sx = CANVAS_SIZE/2, sy = CANVAS_SIZE/2;
    outer: for (let y = 0; y < CANVAS_SIZE; y++)
      for (let x = 0; x < CANVAS_SIZE; x++)
        if (img.data[(y*CANVAS_SIZE+x)*4+3] > 50) { sx=x; sy=y; break outer; }

    drawBg(ctx);
    drawSingini(ctx, sx, sy);

    const pixels: [number,number][] = [];
    for (let y = 0; y < CANVAS_SIZE; y++)
      for (let x = 0; x < CANVAS_SIZE; x++)
        if (img.data[(y*CANVAS_SIZE+x)*4+3] > 30) pixels.push([x,y]);

    let t0: number | null = null;
    const animate = (ts: number) => {
      if (!t0) t0 = ts;
      const raw = Math.min((ts-t0)/2000, 1);
      const et = ease(raw);
      const n = Math.floor(et * pixels.length);
      drawBg(ctx);
      ctx.fillStyle = "hsl(20,40%,18%)";
      for (let i = 0; i < n; i++) ctx.fillRect(pixels[i][0], pixels[i][1], 1.5, 1.5);
      if (n < pixels.length) drawTip(ctx, pixels[Math.min(n, pixels.length-1)][0], pixels[Math.min(n, pixels.length-1)][1]);
      if (raw < 0.15) drawSingini(ctx, sx, sy);
      if (raw < 1) { animRef.current = requestAnimationFrame(animate); }
      else {
        setTimeout(() => {
          const c = canvasRef.current?.getContext("2d");
          if (!c) return;
          drawBg(c); c.drawImage(off, 0, 0); setIsAnimating(false);
        }, 300);
      }
    };
    setTimeout(() => { animRef.current = requestAnimationFrame(animate); }, 700);
  }, [glyph, drawBg]);

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  // ── Freehand drawing ──────────────────────────────────────────
  const getPos = (e: React.MouseEvent | React.TouchEvent): [number,number] => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    const sx = c.width/r.width, sy = c.height/r.height;
    if ("touches" in e) return [(e.touches[0].clientX-r.left)*sx, (e.touches[0].clientY-r.top)*sy];
    return [(e.clientX-r.left)*sx, (e.clientY-r.top)*sy];
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true); setHasDrawn(true);
    const [x,y] = getPos(e);
    ctx.beginPath(); ctx.moveTo(x,y);
    ctx.strokeStyle = "hsl(20,40%,15%)";
    ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.lineJoin = "round";
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating || !isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const [x,y] = getPos(e);
    ctx.lineTo(x,y); ctx.stroke();
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
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE} height={CANVAS_SIZE}
          className="w-[280px] h-[280px] cursor-crosshair"
          onMouseDown={startDraw} onMouseMove={draw}
          onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
        />
        <div className="absolute top-2 left-2 text-xs font-body text-muted-foreground bg-background/80 px-2 py-0.5 rounded">
          {label}
        </div>
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
        <Button variant="outline" size="sm" onClick={clearCanvas} disabled={!hasDrawn && !isAnimating} className="text.xs gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          {t("mandombe.clear") || "Effacer"}
        </Button>
      </div>
    </div>
  );
};

export default GlyphTracingCanvas;
