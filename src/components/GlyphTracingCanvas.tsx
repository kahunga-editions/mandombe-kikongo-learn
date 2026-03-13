import { useRef, useState, useEffect, useCallback } from "react";
import { RotateCcw, Eye, EyeOff, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface GlyphTracingCanvasProps {
  glyph: string;
  label: string;
}

const CANVAS_SIZE = 280;

const GlyphTracingCanvas = ({ glyph, label }: GlyphTracingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const animFrameRef = useRef<number>(0);
  const { t } = useLanguage();

  // Render the glyph to an offscreen canvas and return it
  const renderGlyphOffscreen = useCallback(() => {
    const offscreen = document.createElement("canvas");
    offscreen.width = CANVAS_SIZE;
    offscreen.height = CANVAS_SIZE;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return null;

    ctx.font = "120px 'Masono Mandombe'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "hsl(16, 70%, 45%)";
    ctx.fillText(glyph, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 10);

    return offscreen;
  }, [glyph]);

  // Find the bounding box of non-transparent pixels in the offscreen glyph
  const getGlyphBounds = useCallback((offscreen: HTMLCanvasElement) => {
    const ctx = offscreen.getContext("2d");
    if (!ctx) return { left: 0, right: CANVAS_SIZE, top: 0, bottom: CANVAS_SIZE };
    const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    let left = CANVAS_SIZE, right = 0, top = CANVAS_SIZE, bottom = 0;
    for (let y = 0; y < CANVAS_SIZE; y++) {
      for (let x = 0; x < CANVAS_SIZE; x++) {
        if (imageData.data[(y * CANVAS_SIZE + x) * 4 + 3] > 30) {
          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }
    }
    return { left, right: right + 1, top, bottom: bottom + 1 };
  }, []);

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = "hsl(30, 25%, 82%)";
    ctx.lineWidth = 0.5;
    const mid = canvas.width / 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(mid, 0);
    ctx.lineTo(mid, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Guide glyph
    if (showGuide) {
      ctx.font = "120px 'Masono Mandombe'";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "hsla(40, 80%, 55%, 0.15)";
      ctx.fillText(glyph, mid, canvas.height / 2 + 10);
    }
  }, [glyph, showGuide]);

  useEffect(() => {
    drawGuide();
  }, [drawGuide]);

  // Smooth progressive reveal animation (like KONDE app)
  const playAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasDrawn(false);
    setAnimProgress(0);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const offscreen = renderGlyphOffscreen();
    if (!offscreen) { setIsAnimating(false); return; }

    const bounds = getGlyphBounds(offscreen);
    const glyphWidth = bounds.right - bounds.left;
    const glyphHeight = bounds.bottom - bounds.top;

    if (glyphWidth <= 0 || glyphHeight <= 0) {
      setIsAnimating(false);
      return;
    }

    const totalFrames = 90; // ~1.5s at 60fps
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      // Ease-out curve for natural writing feel
      const easedProgress = 1 - Math.pow(1 - progress, 2);

      // Redraw guide base
      drawGuide();

      // Progressive reveal: sweep from left to right using clipping
      const revealX = bounds.left + glyphWidth * easedProgress;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, revealX, CANVAS_SIZE);
      ctx.clip();
      ctx.drawImage(offscreen, 0, 0);
      ctx.restore();

      // Draw pen tip indicator at the leading edge
      if (progress < 1) {
        // Find the vertical center of visible pixels at revealX column
        const offCtx = offscreen.getContext("2d");
        if (offCtx) {
          const col = Math.floor(revealX);
          const colData = offCtx.getImageData(Math.max(0, col - 1), bounds.top, 2, glyphHeight);
          let sumY = 0, count = 0;
          for (let y = 0; y < glyphHeight; y++) {
            for (let dx = 0; dx < 2; dx++) {
              if (colData.data[(y * 2 + dx) * 4 + 3] > 30) {
                sumY += bounds.top + y;
                count++;
              }
            }
          }
          if (count > 0) {
            const tipY = sumY / count;
            // Pen tip circle
            ctx.beginPath();
            ctx.arc(revealX, tipY, 6, 0, Math.PI * 2);
            ctx.fillStyle = "hsl(40, 75%, 55%)";
            ctx.fill();
            ctx.strokeStyle = "hsl(40, 75%, 40%)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      setAnimProgress(Math.round(progress * 100));

      if (frame < totalFrames) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Hold the completed glyph briefly, then fade back to guide
        setTimeout(() => {
          setIsAnimating(false);
          setAnimProgress(0);
          drawGuide();
        }, 2000);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isAnimating, drawGuide, renderGlyphOffscreen, getGlyphBounds]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    setHasDrawn(true);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "hsl(20, 40%, 15%)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return;
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setHasDrawn(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsAnimating(false);
    setAnimProgress(0);
    drawGuide();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative border-2 border-border rounded-xl overflow-hidden bg-cream dark:bg-card touch-none">
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
        {isAnimating && (
          <div className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
            {animProgress}%
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
          {t("mandombe.animate")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowGuide(!showGuide)}
          className="text-xs gap-1.5"
        >
          {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {t("mandombe.guide")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={clearCanvas}
          disabled={!hasDrawn && !isAnimating}
          className="text-xs gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t("mandombe.clear")}
        </Button>
      </div>
    </div>
  );
};

export default GlyphTracingCanvas;
