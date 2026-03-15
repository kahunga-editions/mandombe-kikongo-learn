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

// ─── CANONICAL SINGLE-STROKE CENTERLINES ─────────────────────────
// Based on "Read and Write Mandombe" (Kahunga Editions).
// Each glyph = one or more strokes. Each stroke = [x,y] waypoints.
// The pen traces each stroke continuously (never doubles back).
// Coordinates: 0-100 space, Y increases downward.
// First point of first stroke = SINGINI (canonical entry).
//
// The two base shapes:
//   PAKUDUNGU "5": Singini top-left → right → down → left → down → right
//   PELEKETE  "2": Singini top-right → left → down → right → down → left
//
// Consonant families (from your book):
//   B, D        → PAKU normal
//   K           → PAKU mirrored H (Singini top-right)
//   T           → PAKU mirrored V (Singini bottom-left)  
//   M           → PAKU rotated 180° (Singini bottom-right)
//   N           → PAKU mirrored H + V
//   L           → PELE normal
//   S           → PELE mirrored H
//   F           → PELE mirrored V
//   V           → PELE rotated 180°
//   W, Y        → PELE mirrored H + V
//   Z           → PAKU + PELE combined

type Pt = [number, number];

// ── BASE SHAPES ───────────────────────────────────────────────────
const PAKU: Pt[] = [[10,10],[90,10],[90,50],[10,50],[10,90],[55,90]];
const PELE: Pt[] = [[90,10],[10,10],[10,50],[90,50],[90,90],[45,90]];

// ── TRANSFORMATIONS ───────────────────────────────────────────────
const mH = (pts: Pt[]): Pt[] => pts.map(([x,y])=>[100-x,y]);
const mV = (pts: Pt[]): Pt[] => pts.map(([x,y])=>[x,100-y]);
const r180 = (pts: Pt[]): Pt[] => pts.map(([x,y])=>[100-x,100-y]);

// ── VOWEL STANDALONE SHAPES ───────────────────────────────────────
// /i/ = vertical bar (from top)
const VOW_I: Pt[][] = [[[50,8],[50,92]]];
// /u/ = U shape (left down, bottom right, right up)
const VOW_U: Pt[][] = [[[15,8],[15,82],[50,92],[85,82],[85,8]]];
// /e/ = 3 horizontal bars
const VOW_E: Pt[][] = [[[15,20],[85,20]],[[15,50],[72,50]],[[15,80],[85,80]]];
// /o/ = closed rectangle (4 sides)
const VOW_O: Pt[][] = [[[50,8],[85,8],[85,92],[15,92],[15,8],[50,8]]];
// /a/ = 3-sided open right: Singini top-right → left → down → right
const VOW_A: Pt[][] = [[[85,12],[15,12],[15,88],[60,88]]];

// ── GLYPH DATABASE ────────────────────────────────────────────────
// Each entry = array of strokes, each stroke = array of [x,y] points

function makeGlyph(base: Pt[], ...extra: Pt[][]): Pt[][] {
  return [base, ...extra];
}

const DB: Record<string, Pt[][]> = {
  // Standalone vowels
  i: VOW_I, u: VOW_U, e: VOW_E, o: VOW_O, a: VOW_A,

  // B-series: PAKU normal
  bi:makeGlyph(PAKU), bu:makeGlyph(PAKU), be:makeGlyph(PAKU),
  bo:makeGlyph(PAKU), ba:makeGlyph(PAKU),
  bia:makeGlyph(PAKU), bue:makeGlyph(PAKU), bio:makeGlyph(PAKU),
  bua:makeGlyph(PAKU), bui:makeGlyph(PAKU), biu:makeGlyph(PAKU),

  // D-series: PAKU normal
  di:makeGlyph(PAKU), du:makeGlyph(PAKU), de:makeGlyph(PAKU),
  do:makeGlyph(PAKU), da:makeGlyph(PAKU),
  dia:makeGlyph(PAKU), due:makeGlyph(PAKU), dua:makeGlyph(PAKU),

  // K-series: PAKU mirrored H (Singini top-right)
  ki:makeGlyph(mH(PAKU)), ku:makeGlyph(mH(PAKU)), ke:makeGlyph(mH(PAKU)),
  ko:makeGlyph(mH(PAKU)), ka:makeGlyph(mH(PAKU)),
  kua:makeGlyph(mH(PAKU)), kui:makeGlyph(mH(PAKU)),

  // T-series: PAKU mirrored V (Singini bottom-left)
  ti:makeGlyph(mV(PAKU)), tu:makeGlyph(mV(PAKU)), te:makeGlyph(mV(PAKU)),
  to:makeGlyph(mV(PAKU)), ta:makeGlyph(mV(PAKU)),

  // M-series: PAKU rotated 180° (Singini bottom-right)
  mi:makeGlyph(r180(PAKU)), mu:makeGlyph(r180(PAKU)), me:makeGlyph(r180(PAKU)),
  mo:makeGlyph(r180(PAKU)), ma:makeGlyph(r180(PAKU)), mua:makeGlyph(r180(PAKU)),

  // N-series: PAKU mH+mV
  ni:makeGlyph(mH(mV(PAKU))), nu:makeGlyph(mH(mV(PAKU))),
  ne:makeGlyph(mH(mV(PAKU))), no:makeGlyph(mH(mV(PAKU))), na:makeGlyph(mH(mV(PAKU))),

  // L-series: PELE normal
  li:makeGlyph(PELE), lu:makeGlyph(PELE), le:makeGlyph(PELE),
  lo:makeGlyph(PELE), la:makeGlyph(PELE),

  // S-series: PELE mirrored H
  si:makeGlyph(mH(PELE)), su:makeGlyph(mH(PELE)), se:makeGlyph(mH(PELE)),
  so:makeGlyph(mH(PELE)), sa:makeGlyph(mH(PELE)),

  // F-series: PELE mirrored V
  fi:makeGlyph(mV(PELE)), fu:makeGlyph(mV(PELE)), fe:makeGlyph(mV(PELE)),
  fo:makeGlyph(mV(PELE)), fa:makeGlyph(mV(PELE)), fua:makeGlyph(mV(PELE)),

  // V-series: PELE rotated 180°
  vi:makeGlyph(r180(PELE)), vu:makeGlyph(r180(PELE)), ve:makeGlyph(r180(PELE)),
  vo:makeGlyph(r180(PELE)), va:makeGlyph(r180(PELE)),

  // W-series: PELE mH+mV
  wi:makeGlyph(mH(mV(PELE))), wu:makeGlyph(mH(mV(PELE))),
  we:makeGlyph(mH(mV(PELE))), wo:makeGlyph(mH(mV(PELE))),
  wa:makeGlyph(mH(mV(PELE))), wuna:makeGlyph(mH(mV(PELE))),

  // Y-series: PELE r180
  yi:makeGlyph(r180(PELE)), yu:makeGlyph(r180(PELE)), ye:makeGlyph(r180(PELE)),
  yo:makeGlyph(r180(PELE)), ya:makeGlyph(r180(PELE)),

  // Z-series: PAKU mH+mV
  zi:makeGlyph(mH(mV(PAKU))), zu:makeGlyph(mH(mV(PAKU))),
  ze:makeGlyph(mH(mV(PAKU))), zo:makeGlyph(mH(mV(PAKU))), za:makeGlyph(mH(mV(PAKU))),

  // MB, ND → PAKU
  mbi:makeGlyph(PAKU), mbu:makeGlyph(PAKU), mbe:makeGlyph(PAKU),
  mbo:makeGlyph(PAKU), mba:makeGlyph(PAKU),
  ndi:makeGlyph(PAKU), ndu:makeGlyph(PAKU), nde:makeGlyph(PAKU),
  ndo:makeGlyph(PAKU), nda:makeGlyph(PAKU),

  // NG, NK → PAKU mH
  ngi:makeGlyph(mH(PAKU)), ngu:makeGlyph(mH(PAKU)), nge:makeGlyph(mH(PAKU)),
  ngo:makeGlyph(mH(PAKU)), nga:makeGlyph(mH(PAKU)),
  nki:makeGlyph(mH(PAKU)), nku:makeGlyph(mH(PAKU)), nke:makeGlyph(mH(PAKU)),
  nko:makeGlyph(mH(PAKU)), nka:makeGlyph(mH(PAKU)),

  // NT, NL → PAKU mV
  nti:makeGlyph(mV(PAKU)), ntu:makeGlyph(mV(PAKU)), nte:makeGlyph(mV(PAKU)),
  nto:makeGlyph(mV(PAKU)), nta:makeGlyph(mV(PAKU)),
  nli:makeGlyph(mV(PAKU)), nlu:makeGlyph(mV(PAKU)), nle:makeGlyph(mV(PAKU)),
  nlo:makeGlyph(mV(PAKU)), nla:makeGlyph(mV(PAKU)),

  // NS, NZ → PAKU r180
  nsi:makeGlyph(r180(PAKU)), nsu:makeGlyph(r180(PAKU)), nse:makeGlyph(r180(PAKU)),
  nso:makeGlyph(r180(PAKU)), nsa:makeGlyph(r180(PAKU)),
  nzi:makeGlyph(r180(PAKU)), nzu:makeGlyph(r180(PAKU)), nze:makeGlyph(r180(PAKU)),
  nzo:makeGlyph(r180(PAKU)), nza:makeGlyph(r180(PAKU)),

  // NY → PELE r180
  nyi:makeGlyph(r180(PELE)), nyu:makeGlyph(r180(PELE)), nye:makeGlyph(r180(PELE)),
  nyo:makeGlyph(r180(PELE)), nya:makeGlyph(r180(PELE)),

  // SH → PELE mV
  shi:makeGlyph(mV(PELE)), shu:makeGlyph(mV(PELE)), she:makeGlyph(mV(PELE)),
  sho:makeGlyph(mV(PELE)), sha:makeGlyph(mV(PELE)),

  // TSH → PELE mH+mV
  tshi:makeGlyph(mH(mV(PELE))), tshu:makeGlyph(mH(mV(PELE))),
  tshe:makeGlyph(mH(mV(PELE))), tsho:makeGlyph(mH(mV(PELE))),
  tsha:makeGlyph(mH(mV(PELE))),

  // MF → PELE mH
  mfi:makeGlyph(mH(PELE)), mfu:makeGlyph(mH(PELE)), mfe:makeGlyph(mH(PELE)),
  mfo:makeGlyph(mH(PELE)), mfa:makeGlyph(mH(PELE)),

  // MV → PELE r180
  mvi:makeGlyph(r180(PELE)), mvu:makeGlyph(r180(PELE)), mve:makeGlyph(r180(PELE)),
  mvo:makeGlyph(r180(PELE)), mva:makeGlyph(r180(PELE)),

  // J → PAKU mV
  ji:makeGlyph(mV(PAKU)), ju:makeGlyph(mV(PAKU)), je:makeGlyph(mV(PAKU)),
  jo:makeGlyph(mV(PAKU)), ja:makeGlyph(mV(PAKU)),

  // DJ → PAKU r180
  dji:makeGlyph(r180(PAKU)), dju:makeGlyph(r180(PAKU)), dje:makeGlyph(r180(PAKU)),
  djo:makeGlyph(r180(PAKU)), dja:makeGlyph(r180(PAKU)),

  // Numbers → simple forms
  "0":makeGlyph([[50,8],[85,8],[85,92],[15,92],[15,8],[50,8]]),
  "1":makeGlyph([[50,8],[50,92]]),
  "2":makeGlyph(PELE),
  "3":makeGlyph(PAKU),
  "4":makeGlyph([[85,8],[15,8],[15,50],[85,50]]),
  "5":makeGlyph(PAKU),
  "6":makeGlyph([[85,8],[15,8],[15,92],[85,92],[85,50],[15,50]]),
  "7":makeGlyph([[15,8],[85,8],[45,92]]),
  "8":makeGlyph([[50,8],[85,8],[85,92],[15,92],[15,8],[50,8],[50,50],[85,50]]),
  "9":makeGlyph([[85,50],[15,50],[15,8],[85,8],[85,92]]),
};

// ─── ANIMATION ENGINE ─────────────────────────────────────────────

interface AnimPt { x: number; y: number; penDown: boolean; }

function buildAnimPoints(strokes: Pt[][], size: number, pad = 22): AnimPt[] {
  const pts: AnimPt[] = [];
  const u = size - pad * 2;
  for (const stroke of strokes) {
    stroke.forEach(([nx,ny], i) => {
      pts.push({ x: pad+(nx/100)*u, y: pad+(ny/100)*u, penDown: i>0 });
    });
  }
  return pts;
}

function buildLengths(pts: AnimPt[]): number[] {
  const L=[0];
  for (let i=1;i<pts.length;i++) {
    const p=L[i-1];
    if (!pts[i].penDown){L.push(p);continue;}
    const dx=pts[i].x-pts[i-1].x,dy=pts[i].y-pts[i-1].y;
    L.push(p+Math.sqrt(dx*dx+dy*dy));
  }
  return L;
}

function interpolate(pts: AnimPt[], L: number[], t: number): AnimPt {
  if (!pts.length) return {x:140,y:140,penDown:false};
  const total=L[L.length-1]||1, target=t*total;
  for (let i=1;i<pts.length;i++) {
    if (L[i]>=target) {
      const seg=L[i]-L[i-1], st=seg>0?(target-L[i-1])/seg:0;
      return {x:pts[i-1].x+st*(pts[i].x-pts[i-1].x), y:pts[i-1].y+st*(pts[i].y-pts[i-1].y), penDown:pts[i].penDown};
    }
  }
  return pts[pts.length-1];
}

const ease = (t:number) => t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

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

  useEffect(()=>{ waitForFont().then(()=>setFontReady(true)); },[]);

  const drawBg = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    ctx.strokeStyle="hsl(30,25%,82%)"; ctx.lineWidth=0.5; ctx.setLineDash([4,4]);
    ctx.beginPath();
    const m=CANVAS_SIZE/2;
    ctx.moveTo(m,0);ctx.lineTo(m,CANVAS_SIZE);
    ctx.moveTo(0,m);ctx.lineTo(CANVAS_SIZE,m);
    ctx.stroke(); ctx.setLineDash([]);
    if (showGuide&&fontReady) {
      ctx.font=`120px '${FONT_NAME}'`;
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillStyle="hsla(40,80%,55%,0.13)";
      ctx.fillText(glyph,m,m+10);
    }
  },[glyph,showGuide,fontReady]);

  useEffect(()=>{
    const ctx=canvasRef.current?.getContext("2d");
    if(ctx) drawBg(ctx);
  },[drawBg]);

  const drawStrokes = useCallback((ctx: CanvasRenderingContext2D, pts: AnimPt[], upTo: number) => {
    ctx.lineCap="round"; ctx.lineJoin="round";
    ctx.lineWidth=6; ctx.strokeStyle="hsl(20,40%,18%)";
    let open=false;
    for (let i=0;i<=upTo&&i<pts.length;i++) {
      const p=pts[i];
      if (!p.penDown||!open){
        if(open) ctx.stroke();
        ctx.beginPath(); ctx.moveTo(p.x,p.y); open=true;
      } else { ctx.lineTo(p.x,p.y); }
    }
    if(open) ctx.stroke();
  },[]);

  const drawTip=(ctx:CanvasRenderingContext2D,x:number,y:number)=>{
    const g=ctx.createRadialGradient(x,y,1,x,y,15);
    g.addColorStop(0,"hsla(40,95%,65%,0.6)"); g.addColorStop(1,"hsla(40,95%,65%,0)");
    ctx.beginPath(); ctx.arc(x,y,15,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
    ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fillStyle="hsl(40,90%,55%)"; ctx.fill();
    ctx.strokeStyle="hsl(25,80%,35%)"; ctx.lineWidth=1.5; ctx.stroke();
  };

  const drawSingini=(ctx:CanvasRenderingContext2D,x:number,y:number)=>{
    ctx.beginPath(); ctx.arc(x,y,6,0,Math.PI*2);
    ctx.fillStyle="hsl(0,75%,52%)"; ctx.fill();
    ctx.strokeStyle="hsl(0,75%,32%)"; ctx.lineWidth=1.5; ctx.stroke();
    ctx.font="bold 10px sans-serif"; ctx.fillStyle="hsl(0,65%,45%)";
    ctx.textAlign="left"; ctx.textBaseline="middle";
    ctx.fillText("Singini",x+10,y);
  };

  const playAnimation = useCallback(()=>{
    if(isAnimating)return;
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext("2d"); if(!ctx)return;
    cancelAnimationFrame(animRef.current);
    setIsAnimating(true); setHasDrawn(false);

    const key=glyph.toLowerCase().trim();
    const strokes = DB[key];
    if(!strokes||!strokes.length){ setIsAnimating(false); return; }

    const pts=buildAnimPoints(strokes,CANVAS_SIZE,22);
    const lengths=buildLengths(pts);
    const singini=pts[0];

    drawBg(ctx); drawSingini(ctx,singini.x,singini.y);

    const DURATION=2200; let t0:number|null=null;
    const animate=(ts:number)=>{
      if(!t0)t0=ts;
      const raw=Math.min((ts-t0)/DURATION,1), et=ease(raw);
      drawBg(ctx);
      drawStrokes(ctx,pts,Math.floor(et*(pts.length-1)));
      const tip=interpolate(pts,lengths,et);
      drawTip(ctx,tip.x,tip.y);
      if(raw<0.18) drawSingini(ctx,singini.x,singini.y);
      if(raw<1){ animRef.current=requestAnimationFrame(animate); }
      else { setTimeout(()=>{
        const c=canvasRef.current?.getContext("2d"); if(!c)return;
        drawBg(c); drawStrokes(c,pts,pts.length-1); setIsAnimating(false);
      },400); }
    };
    setTimeout(()=>{ animRef.current=requestAnimationFrame(animate); },700);
  },[isAnimating,glyph,drawBg,drawStrokes]);

  useEffect(()=>()=>cancelAnimationFrame(animRef.current),[]);

  const getPos=(e:React.MouseEvent|React.TouchEvent):[number,number]=>{
    const c=canvasRef.current!,r=c.getBoundingClientRect();
    const sx=c.width/r.width,sy=c.height/r.height;
    if("touches"in e) return[(e.touches[0].clientX-r.left)*sx,(e.touches[0].clientY-r.top)*sy];
    return[(e.clientX-r.left)*sx,(e.clientY-r.top)*sy];
  };

  const startDraw=(e:React.MouseEvent|React.TouchEvent)=>{
    if(isAnimating)return; e.preventDefault();
    const ctx=canvasRef.current?.getContext("2d"); if(!ctx)return;
    setIsDrawing(true); setHasDrawn(true);
    const[x,y]=getPos(e); ctx.beginPath(); ctx.moveTo(x,y);
    ctx.strokeStyle="hsl(20,40%,15%)"; ctx.lineWidth=5;
    ctx.lineCap="round"; ctx.lineJoin="round";
  };

  const draw=(e:React.MouseEvent|React.TouchEvent)=>{
    if(isAnimating||!isDrawing)return; e.preventDefault();
    const ctx=canvasRef.current?.getContext("2d"); if(!ctx)return;
    const[x,y]=getPos(e); ctx.lineTo(x,y); ctx.stroke();
  };

  const endDraw=()=>setIsDrawing(false);

  const clearCanvas=()=>{
    cancelAnimationFrame(animRef.current);
    setIsAnimating(false); setHasDrawn(false);
    const ctx=canvasRef.current?.getContext("2d");
    if(ctx) drawBg(ctx);
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
        {!isAnimating&&!hasDrawn&&(
          <div className="absolute top-2 right-2 text-[10px] text-muted-foreground/50 italic pr-1">Singini → point d'entrée</div>
        )}
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <Button variant="outline" size="sm" onClick={playAnimation} disabled={isAnimating} className="text-xs gap-1.5">
          <Play className="w-3.5 h-3.5"/>
          {isAnimating?"…":(t("mandombe.animate")||"Animer")}
        </Button>
        <Button variant="outline" size="sm" onClick={()=>setShowGuide(g=>!g)} className="text-xs gap-1.5">
          {showGuide?<EyeOff className="w-3.5 h-3.5"/>:<Eye className="w-3.5 h-3.5"/>}
          {t("mandombe.guide")||"Guide"}
        </Button>
        <Button variant="outline" size="sm" onClick={clearCanvas} disabled={!hasDrawn&&!isAnimating} className="text-xs gap-1.5">
          <RotateCcw className="w-3.5 h-3.5"/>
          {t("mandombe.clear")||"Effacer"}
        </Button>
      </div>
    </div>
  );
};

export default GlyphTracingCanvas;
