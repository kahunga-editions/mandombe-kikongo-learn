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
  try { await document.fonts.load(`120px '${FONT_NAME}'`); } catch { /* ok */ }
};

// ─── CENTERLINE DATA ─────────────────────────────────────────────
// Single-stroke centerlines extracted from Masono Mandombe TTF.
// Each glyph = array of strokes. Each stroke = array of [x,y] points.
// Coordinates in 0-100 normalized space. Y increases downward.
// First point = SINGINI (canonical entry point).
// Strokes represent the PEN PATH, not the outline.
const GLYPH_DATA: Record<string, number[][][]> = {"bi":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"bu":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"be":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"bo":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"ba":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"bia":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"bue":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"bio":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"bua":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"bui":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"biu":[[[19.0,24.7],[88.0,24.7],[88.0,66.1],[19.0,66.1],[19.0,87.4],[49.0,87.4]]],"di":[[[12.0,24.7],[80.8,24.7],[80.8,33.2],[12.0,33.2],[12.0,87.6],[50.5,87.6]]],"du":[[[12.0,24.7],[80.8,24.7],[80.8,33.2],[12.0,33.2],[12.0,87.6],[50.5,87.6]]],"de":[[[12.0,24.7],[80.8,24.7],[80.8,33.2],[12.0,33.2],[12.0,87.6],[50.5,87.6]]],"do":[[[12.0,24.7],[80.8,24.7],[80.8,33.2],[12.0,33.2],[12.0,87.6],[50.5,87.6]]],"da":[[[12.0,24.7],[80.8,24.7],[80.8,33.2],[12.0,33.2],[12.0,87.6],[50.5,87.6]]],"dia":[[[12.0,24.7],[80.8,24.7],[80.8,33.2],[12.0,33.2],[12.0,87.6],[50.5,87.6]]],"due":[[[12.0,24.7],[80.8,24.7],[80.8,33.2],[12.0,33.2],[12.0,87.6],[50.5,87.6]]],"dua":[[[12.0,24.7],[80.8,24.7],[80.8,33.2],[12.0,33.2],[12.0,87.6],[50.5,87.6]]],"ki":[[[34.9,88.3],[70.6,88.3],[70.6,51.5],[12.4,51.5],[12.4,9.5],[70.6,9.5]]],"ku":[[[34.9,88.3],[70.6,88.3],[70.6,51.5],[12.4,51.5],[12.4,9.5],[70.6,9.5]]],"ke":[[[34.9,88.3],[70.6,88.3],[70.6,51.5],[12.4,51.5],[12.4,9.5],[70.6,9.5]]],"ko":[[[34.9,88.3],[70.6,88.3],[70.6,51.5],[12.4,51.5],[12.4,9.5],[70.6,9.5]]],"ka":[[[34.9,88.3],[70.6,88.3],[70.6,51.5],[12.4,51.5],[12.4,9.5],[70.6,9.5]]],"kua":[[[34.9,88.3],[70.6,88.3],[70.6,51.5],[12.4,51.5],[12.4,9.5],[70.6,9.5]]],"kui":[[[34.9,88.3],[70.6,88.3],[70.6,51.5],[12.4,51.5],[12.4,9.5],[70.6,9.5]]],"ti":[[[87.6,9.8],[12.6,9.8],[12.6,40.8],[87.6,40.8],[87.6,88.8],[35.0,88.8]]],"tu":[[[87.6,9.8],[12.6,9.8],[12.6,40.8],[87.6,40.8],[87.6,88.8],[35.0,88.8]]],"te":[[[87.6,9.8],[12.6,9.8],[12.6,40.8],[87.6,40.8],[87.6,88.8],[35.0,88.8]]],"to":[[[87.6,9.8],[12.6,9.8],[12.6,40.8],[87.6,40.8],[87.6,88.8],[35.0,88.8]]],"ta":[[[87.6,9.8],[12.6,9.8],[12.6,40.8],[87.6,40.8],[87.6,88.8],[35.0,88.8]]],"mi":[[[12.4,9.5],[79.8,9.5],[79.8,46.7],[12.4,46.7],[12.4,88.3],[67.2,88.3]]],"mu":[[[12.4,9.5],[79.8,9.5],[79.8,46.7],[12.4,46.7],[12.4,88.3],[67.2,88.3]]],"me":[[[12.4,9.5],[79.8,9.5],[79.8,46.7],[12.4,46.7],[12.4,88.3],[67.2,88.3]]],"mo":[[[12.4,9.5],[79.8,9.5],[79.8,46.7],[12.4,46.7],[12.4,88.3],[67.2,88.3]]],"ma":[[[12.4,9.5],[79.8,9.5],[79.8,46.7],[12.4,46.7],[12.4,88.3],[67.2,88.3]]],"mua":[[[12.4,9.5],[79.8,9.5],[79.8,46.7],[12.4,46.7],[12.4,88.3],[67.2,88.3]]],"ni":[[[87.7,8.8],[12.4,8.8],[12.4,40.8],[87.7,40.8],[87.7,88.7],[34.2,88.7]]],"nu":[[[87.7,8.8],[12.4,8.8],[12.4,40.8],[87.7,40.8],[87.7,88.7],[34.2,88.7]]],"ne":[[[87.7,8.8],[12.4,8.8],[12.4,40.8],[87.7,40.8],[87.7,88.7],[34.2,88.7]]],"no":[[[87.7,8.8],[12.4,8.8],[12.4,40.8],[87.7,40.8],[87.7,88.7],[34.2,88.7]]],"na":[[[87.7,8.8],[12.4,8.8],[12.4,40.8],[87.7,40.8],[87.7,88.7],[34.2,88.7]]],"li":[[[12.0,22.0],[88.0,22.0],[88.0,50.7],[12.0,50.7],[12.0,87.9],[62.9,87.9]]],"lu":[[[12.0,22.0],[88.0,22.0],[88.0,50.7],[12.0,50.7],[12.0,87.9],[62.9,87.9]]],"le":[[[12.0,22.0],[88.0,22.0],[88.0,50.7],[12.0,50.7],[12.0,87.9],[62.9,87.9]]],"lo":[[[12.0,22.0],[88.0,22.0],[88.0,50.7],[12.0,50.7],[12.0,87.9],[62.9,87.9]]],"la":[[[12.0,22.0],[88.0,22.0],[88.0,50.7],[12.0,50.7],[12.0,87.9],[62.9,87.9]]],"si":[[[77.3,8.1],[12.4,8.1],[12.4,40.9],[77.3,40.9],[77.3,88.7],[64.1,88.7]]],"su":[[[77.3,8.1],[12.4,8.1],[12.4,40.9],[77.3,40.9],[77.3,88.7],[64.1,88.7]]],"se":[[[77.3,8.1],[12.4,8.1],[12.4,40.9],[77.3,40.9],[77.3,88.7],[64.1,88.7]]],"so":[[[77.3,8.1],[12.4,8.1],[12.4,40.9],[77.3,40.9],[77.3,88.7],[64.1,88.7]]],"sa":[[[77.3,8.1],[12.4,8.1],[12.4,40.9],[77.3,40.9],[77.3,88.7],[64.1,88.7]]],"fi":[[[12.1,24.7],[80.8,24.7],[80.8,24.7],[12.1,24.7],[12.1,87.5],[50.3,87.5]]],"fu":[[[12.1,24.7],[80.8,24.7],[80.8,24.7],[12.1,24.7],[12.1,87.5],[50.3,87.5]]],"fe":[[[12.1,24.7],[80.8,24.7],[80.8,24.7],[12.1,24.7],[12.1,87.5],[50.3,87.5]]],"fo":[[[12.1,24.7],[80.8,24.7],[80.8,24.7],[12.1,24.7],[12.1,87.5],[50.3,87.5]]],"fa":[[[12.1,24.7],[80.8,24.7],[80.8,24.7],[12.1,24.7],[12.1,87.5],[50.3,87.5]]],"fua":[[[12.1,24.7],[80.8,24.7],[80.8,24.7],[12.1,24.7],[12.1,87.5],[50.3,87.5]]],"vi":[[[87.4,11.3],[12.5,11.3],[12.5,51.3],[87.4,51.3],[87.4,88.7],[64.7,88.7]]],"vu":[[[87.4,11.3],[12.5,11.3],[12.5,51.3],[87.4,51.3],[87.4,88.7],[64.7,88.7]]],"ve":[[[87.4,11.3],[12.5,11.3],[12.5,51.3],[87.4,51.3],[87.4,88.7],[64.7,88.7]]],"vo":[[[87.4,11.3],[12.5,11.3],[12.5,51.3],[87.4,51.3],[87.4,88.7],[64.7,88.7]]],"va":[[[87.4,11.3],[12.5,11.3],[12.5,51.3],[87.4,51.3],[87.4,88.7],[64.7,88.7]]],"wi":[[[12.4,10.9],[87.6,10.9],[87.6,48.3],[12.4,48.3],[12.4,89.1],[40.2,89.1]]],"wu":[[[12.4,10.9],[87.6,10.9],[87.6,48.3],[12.4,48.3],[12.4,89.1],[40.2,89.1]]],"we":[[[12.4,10.9],[87.6,10.9],[87.6,48.3],[12.4,48.3],[12.4,89.1],[40.2,89.1]]],"wo":[[[12.4,10.9],[87.6,10.9],[87.6,48.3],[12.4,48.3],[12.4,89.1],[40.2,89.1]]],"wa":[[[12.4,10.9],[87.6,10.9],[87.6,48.3],[12.4,48.3],[12.4,89.1],[40.2,89.1]]],"wuna":[[[12.4,10.9],[87.6,10.9],[87.6,48.3],[12.4,48.3],[12.4,89.1],[40.2,89.1]]],"yi":[[[87.6,11.0],[12.6,11.0],[12.6,46.7],[87.6,46.7],[87.6,89.1],[35.1,89.1]]],"yu":[[[87.6,11.0],[12.6,11.0],[12.6,46.7],[87.6,46.7],[87.6,89.1],[35.1,89.1]]],"ye":[[[87.6,11.0],[12.6,11.0],[12.6,46.7],[87.6,46.7],[87.6,89.1],[35.1,89.1]]],"yo":[[[87.6,11.0],[12.6,11.0],[12.6,46.7],[87.6,46.7],[87.6,89.1],[35.1,89.1]]],"ya":[[[87.6,11.0],[12.6,11.0],[12.6,46.7],[87.6,46.7],[87.6,89.1],[35.1,89.1]]],"zi":[[[12.4,9.7],[77.3,9.7],[77.3,37.5],[12.4,37.5],[12.4,89.1],[66.0,89.1]]],"zu":[[[12.4,9.7],[77.3,9.7],[77.3,37.5],[12.4,37.5],[12.4,89.1],[66.0,89.1]]],"ze":[[[12.4,9.7],[77.3,9.7],[77.3,37.5],[12.4,37.5],[12.4,89.1],[66.0,89.1]]],"zo":[[[12.4,9.7],[77.3,9.7],[77.3,37.5],[12.4,37.5],[12.4,89.1],[66.0,89.1]]],"za":[[[12.4,9.7],[77.3,9.7],[77.3,37.5],[12.4,37.5],[12.4,89.1],[66.0,89.1]]],"mbi":[[[16.8,24.7],[76.6,24.7],[76.6,37.2],[16.8,37.2],[16.8,79.2],[46.6,79.2]]],"mbu":[[[16.8,24.7],[76.6,24.7],[76.6,37.2],[16.8,37.2],[16.8,79.2],[46.6,79.2]]],"mbe":[[[16.8,24.7],[76.6,24.7],[76.6,37.2],[16.8,37.2],[16.8,79.2],[46.6,79.2]]],"mbo":[[[16.8,24.7],[76.6,24.7],[76.6,37.2],[16.8,37.2],[16.8,79.2],[46.6,79.2]]],"mba":[[[16.8,24.7],[76.6,24.7],[76.6,37.2],[16.8,37.2],[16.8,79.2],[46.6,79.2]]],"ndi":[[[11.3,37.2],[67.5,37.2],[67.5,61.4],[11.3,61.4],[11.3,87.6],[42.8,87.6]]],"ndu":[[[11.3,37.2],[67.5,37.2],[67.5,61.4],[11.3,61.4],[11.3,87.6],[42.8,87.6]]],"nde":[[[11.3,37.2],[67.5,37.2],[67.5,61.4],[11.3,61.4],[11.3,87.6],[42.8,87.6]]],"ndo":[[[11.3,37.2],[67.5,37.2],[67.5,61.4],[11.3,61.4],[11.3,87.6],[42.8,87.6]]],"nda":[[[11.3,37.2],[67.5,37.2],[67.5,61.4],[11.3,61.4],[11.3,87.6],[42.8,87.6]]],"ngi":[[[78.4,20.4],[16.3,20.4],[16.3,37.4],[78.4,37.4],[78.4,87.4],[48.4,87.4]]],"ngu":[[[78.4,20.4],[16.3,20.4],[16.3,37.4],[78.4,37.4],[78.4,87.4],[48.4,87.4]]],"nge":[[[78.4,20.4],[16.3,20.4],[16.3,37.4],[78.4,37.4],[78.4,87.4],[48.4,87.4]]],"ngo":[[[78.4,20.4],[16.3,20.4],[16.3,37.4],[78.4,37.4],[78.4,87.4],[48.4,87.4]]],"nga":[[[78.4,20.4],[16.3,20.4],[16.3,37.4],[78.4,37.4],[78.4,87.4],[48.4,87.4]]],"nti":[[[88.1,9.8],[16.8,9.8],[16.8,60.6],[88.1,60.6],[88.1,88.8],[49.5,88.8]]],"ntu":[[[88.1,9.8],[16.8,9.8],[16.8,60.6],[88.1,60.6],[88.1,88.8],[49.5,88.8]]],"nte":[[[88.1,9.8],[16.8,9.8],[16.8,60.6],[88.1,60.6],[88.1,88.8],[49.5,88.8]]],"nto":[[[88.1,9.8],[16.8,9.8],[16.8,60.6],[88.1,60.6],[88.1,88.8],[49.5,88.8]]],"nta":[[[88.1,9.8],[16.8,9.8],[16.8,60.6],[88.1,60.6],[88.1,88.8],[49.5,88.8]]],"nsi":[[[83.9,9.9],[11.5,9.9],[11.5,41.0],[83.9,41.0],[83.9,66.5],[53.8,66.5]]],"nsu":[[[83.9,9.9],[11.5,9.9],[11.5,41.0],[83.9,41.0],[83.9,66.5],[53.8,66.5]]],"nse":[[[83.9,9.9],[11.5,9.9],[11.5,41.0],[83.9,41.0],[83.9,66.5],[53.8,66.5]]],"nso":[[[83.9,9.9],[11.5,9.9],[11.5,41.0],[83.9,41.0],[83.9,66.5],[53.8,66.5]]],"nsa":[[[83.9,9.9],[11.5,9.9],[11.5,41.0],[83.9,41.0],[83.9,66.5],[53.8,66.5]]],"nzi":[[[11.6,11.0],[72.4,11.0],[72.4,45.0],[11.6,45.0],[11.6,63.6],[50.5,63.6]]],"nzu":[[[11.6,11.0],[72.4,11.0],[72.4,45.0],[11.6,45.0],[11.6,63.6],[50.5,63.6]]],"nze":[[[11.6,11.0],[72.4,11.0],[72.4,45.0],[11.6,45.0],[11.6,63.6],[50.5,63.6]]],"nzo":[[[11.6,11.0],[72.4,11.0],[72.4,45.0],[11.6,45.0],[11.6,63.6],[50.5,63.6]]],"nza":[[[11.6,11.0],[72.4,11.0],[72.4,45.0],[11.6,45.0],[11.6,63.6],[50.5,63.6]]],"nli":[[[11.5,22.4],[83.9,22.4],[83.9,39.7],[11.5,39.7],[11.5,61.7],[50.4,61.7]]],"nlu":[[[11.5,22.4],[83.9,22.4],[83.9,39.7],[11.5,39.7],[11.5,61.7],[50.4,61.7]]],"nle":[[[11.5,22.4],[83.9,22.4],[83.9,39.7],[11.5,39.7],[11.5,61.7],[50.4,61.7]]],"nlo":[[[11.5,22.4],[83.9,22.4],[83.9,39.7],[11.5,39.7],[11.5,61.7],[50.4,61.7]]],"nla":[[[11.5,22.4],[83.9,22.4],[83.9,39.7],[11.5,39.7],[11.5,61.7],[50.4,61.7]]],"nki":[[[74.6,12.2],[16.2,12.2],[16.2,46.3],[74.6,46.3],[74.6,63.5],[46.0,63.5]]],"nku":[[[74.6,12.2],[16.2,12.2],[16.2,46.3],[74.6,46.3],[74.6,63.5],[46.0,63.5]]],"nke":[[[74.6,12.2],[16.2,12.2],[16.2,46.3],[74.6,46.3],[74.6,63.5],[46.0,63.5]]],"nko":[[[74.6,12.2],[16.2,12.2],[16.2,46.3],[74.6,46.3],[74.6,63.5],[46.0,63.5]]],"nka":[[[74.6,12.2],[16.2,12.2],[16.2,46.3],[74.6,46.3],[74.6,63.5],[46.0,63.5]]],"nyi":[[[76.1,46.7],[9.0,46.7],[9.0,55.5],[76.1,55.5],[76.1,89.1],[45.8,89.1]]],"nyu":[[[76.1,46.7],[9.0,46.7],[9.0,55.5],[76.1,55.5],[76.1,89.1],[45.8,89.1]]],"nye":[[[76.1,46.7],[9.0,46.7],[9.0,55.5],[76.1,55.5],[76.1,89.1],[45.8,89.1]]],"nyo":[[[76.1,46.7],[9.0,46.7],[9.0,55.5],[76.1,55.5],[76.1,89.1],[45.8,89.1]]],"nya":[[[76.1,46.7],[9.0,46.7],[9.0,55.5],[76.1,55.5],[76.1,89.1],[45.8,89.1]]],"i":[[[50,10],[50,90]]],"u":[[[15,10],[15,80],[50,92],[85,80],[85,10]]],"e":[[[15,20],[85,20]],[[15,50],[70,50]],[[15,80],[85,80]]],"o":[[[50,10],[85,10],[85,90],[15,90],[15,10],[50,10]]],"a":[[[85,15],[15,15],[15,90],[85,90]]],"0":[[[50,10],[50,90]]],"1":[[[50,10],[50,90]]],"2":[[[50,10],[50,90]]],"3":[[[50,10],[50,90]]],"4":[[[50,10],[50,90]]],"5":[[[50,10],[50,90]]],"6":[[[50,10],[50,90]]],"7":[[[50,10],[50,90]]],"8":[[[50,10],[50,90]]],"9":[[[50,10],[50,90]]]};

// ─── ANIMATION ENGINE ─────────────────────────────────────────────

interface AnimPt { x: number; y: number; penDown: boolean; }

function buildAnimPoints(strokes: number[][][], size: number, pad = 18): AnimPt[] {
  const pts: AnimPt[] = [];
  const u = size - pad * 2;
  for (const stroke of strokes) {
    stroke.forEach((pt, i) => {
      pts.push({ x: pad+(pt[0]/100)*u, y: pad+(pt[1]/100)*u, penDown: i>0 });
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
  const total=L[L.length-1]||1,target=t*total;
  for (let i=1;i<pts.length;i++) {
    if (L[i]>=target) {
      const seg=L[i]-L[i-1],st=seg>0?(target-L[i-1])/seg:0;
      return {x:pts[i-1].x+st*(pts[i].x-pts[i-1].x),y:pts[i-1].y+st*(pts[i].y-pts[i-1].y),penDown:pts[i].penDown};
    }
  }
  return pts[pts.length-1];
}

const ease=(t:number)=>t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

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
      if (!p.penDown||!open){if(open)ctx.stroke();ctx.beginPath();ctx.moveTo(p.x,p.y);open=true;}
      else ctx.lineTo(p.x,p.y);
    }
    if(open) ctx.stroke();
  },[]);

  const drawTip=(ctx:CanvasRenderingContext2D,x:number,y:number)=>{
    const g=ctx.createRadialGradient(x,y,1,x,y,16);
    g.addColorStop(0,"hsla(40,95%,65%,0.6)");g.addColorStop(1,"hsla(40,95%,65%,0)");
    ctx.beginPath();ctx.arc(x,y,16,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
    ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fillStyle="hsl(40,90%,55%)";ctx.fill();
    ctx.strokeStyle="hsl(25,80%,35%)";ctx.lineWidth=1.5;ctx.stroke();
  };

  const drawSingini=(ctx:CanvasRenderingContext2D,x:number,y:number)=>{
    ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);
    ctx.fillStyle="hsl(0,75%,52%)";ctx.fill();
    ctx.strokeStyle="hsl(0,75%,32%)";ctx.lineWidth=1.5;ctx.stroke();
    ctx.font="bold 10px sans-serif";ctx.fillStyle="hsl(0,65%,45%)";
    ctx.textAlign="left";ctx.textBaseline="middle";
    ctx.fillText("Singini",x+10,y);
  };

  const playAnimation = useCallback(()=>{
    if(isAnimating)return;
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext("2d"); if(!ctx)return;
    cancelAnimationFrame(animRef.current);
    setIsAnimating(true); setHasDrawn(false);

    const key=glyph.toLowerCase().trim();
    const strokes=GLYPH_DATA[key];
    if(!strokes||!strokes.length){setIsAnimating(false);return;}

    const pts=buildAnimPoints(strokes,CANVAS_SIZE,18);
    const lengths=buildLengths(pts);
    const singini=pts[0];

    drawBg(ctx); drawSingini(ctx,singini.x,singini.y);

    const DURATION=2200; let t0:number|null=null;
    const animate=(ts:number)=>{
      if(!t0)t0=ts;
      const raw=Math.min((ts-t0)/DURATION,1),et=ease(raw);
      drawBg(ctx);
      drawStrokes(ctx,pts,Math.floor(et*(pts.length-1)));
      const tip=interpolate(pts,lengths,et);
      drawTip(ctx,tip.x,tip.y);
      if(raw<0.18) drawSingini(ctx,singini.x,singini.y);
      if(raw<1){animRef.current=requestAnimationFrame(animate);}
      else{setTimeout(()=>{
        const c=canvasRef.current?.getContext("2d");if(!c)return;
        drawBg(c);drawStrokes(c,pts,pts.length-1);setIsAnimating(false);
      },400);}
    };
    setTimeout(()=>{animRef.current=requestAnimationFrame(animate);},700);
  },[isAnimating,glyph,drawBg,drawStrokes]);

  useEffect(()=>()=>cancelAnimationFrame(animRef.current),[]);

  const getPos=(e:React.MouseEvent|React.TouchEvent):[number,number]=>{
    const c=canvasRef.current!,r=c.getBoundingClientRect();
    const sx=c.width/r.width,sy=c.height/r.height;
    if("touches"in e) return[(e.touches[0].clientX-r.left)*sx,(e.touches[0].clientY-r.top)*sy];
    return[(e.clientX-r.left)*sx,(e.clientY-r.top)*sy];
  };

  const startDraw=(e:React.MouseEvent|React.TouchEvent)=>{
    if(isAnimating)return;e.preventDefault();
    const ctx=canvasRef.current?.getContext("2d");if(!ctx)return;
    setIsDrawing(true);setHasDrawn(true);
    const[x,y]=getPos(e);ctx.beginPath();ctx.moveTo(x,y);
    ctx.strokeStyle="hsl(20,40%,15%)";ctx.lineWidth=5;ctx.lineCap="round";ctx.lineJoin="round";
  };

  const draw=(e:React.MouseEvent|React.TouchEvent)=>{
    if(isAnimating||!isDrawing)return;e.preventDefault();
    const ctx=canvasRef.current?.getContext("2d");if(!ctx)return;
    const[x,y]=getPos(e);ctx.lineTo(x,y);ctx.stroke();
  };

  const endDraw=()=>setIsDrawing(false);

  const clearCanvas=()=>{
    cancelAnimationFrame(animRef.current);setIsAnimating(false);setHasDrawn(false);
    const ctx=canvasRef.current?.getContext("2d");if(ctx)drawBg(ctx);
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
