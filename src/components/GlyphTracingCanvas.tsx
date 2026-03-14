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

// Wait for the Mandombe font to be available
const waitForFont = async () => {
  try {
    await document.fonts.load(`120px '${FONT_NAME}'`);
  } catch {
    // Font API not supported or font not available, proceed anyway
  }
};

const GlyphTracingCanvas = ({ glyph, label }: GlyphTracingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const [fontReady, setFontReady] = useState(false);
  const animFrameRef = useRef<number>(0);
  const { t } = useLanguage();

  // Ensure font is loaded
  useEffect(() => {
    waitForFont().then(() => setFontReady(true));
  }, []);

  // Render the glyph to an offscreen canvas using Mandombe font
  const renderGlyphOffscreen = useCallback(() => {
    const offscreen = document.createElement("canvas");
    offscreen.width = CANVAS_SIZE;
    offscreen.height = CANVAS_SIZE;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return null;

    ctx.font = `120px '${FONT_NAME}'`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "hsl(16, 70%, 45%)";
    ctx.fillText(glyph, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 10);

    return offscreen;
  }, [glyph]);

  // Find bounding box of visible pixels
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

  // Draw guide: grid lines + transparent Mandombe glyph
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

    // Guide glyph in Mandombe font (transparent)
    if (showGuide && fontReady) {
      ctx.font = `120px '${FONT_NAME}'`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "hsla(40, 80%, 55%, 0.15)";
      ctx.fillText(glyph, mid, canvas.height / 2 + 10);
    }
  }, [glyph, showGuide, fontReady]);

  useEffect(() => {
    drawGuide();
  }, [drawGuide]);

  // Animation: progressive reveal following Singini (entry point) concept
  // In Mandombe, writing starts from the Singini and follows the consonant shape.
  // We simulate this with a radial/directional reveal from the glyph's natural start point.
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

    // Find the Singini (entry point) - top-left most visible pixel of the glyph
    const offCtx = offscreen.getContext("2d");
    let singiniX = bounds.left;
    let singiniY = bounds.top;
    if (offCtx) {
      const imgData = offCtx.getImageData(bounds.left, bounds.top, glyphWidth, glyphHeight);
      outerLoop:
      for (let y = 0; y < glyphHeight; y++) {
        for (let x = 0; x < glyphWidth; x++) {
          if (imgData.data[(y * glyphWidth + x) * 4 + 3] > 50) {
            singiniX = bounds.left + x;
            singiniY = bounds.top + y;
            break outerLoop;
          }
        }
      }
    }

    // Calculate max distance from singini to any corner of glyph bounds
    const maxDist = Math.sqrt(
      Math.max(
        (bounds.right - singiniX) ** 2 + (bounds.bottom - singiniY) ** 2,
        (singiniX - bounds.left) ** 2 + (bounds.bottom - singiniY) ** 2,
        (bounds.right - singiniX) ** 2 + (singiniY - bounds.top) ** 2,
        (singiniX - bounds.left) ** 2 + (singiniY - bounds.top) ** 2,
      )
    );

    const totalFrames = 90;
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      // Ease-in-out for natural writing feel
      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      drawGuide();

      // Radial reveal from Singini point
      const revealRadius = maxDist * easedProgress;

      ctx.save();
      ctx.beginPath();
      ctx.arc(singiniX, singiniY, revealRadius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(offscreen, 0, 0);
      ctx.restore();

      // Draw Singini marker (entry point)
      if (progress < 0.15) {
        ctx.beginPath();
        ctx.arc(singiniX, singiniY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(0, 80%, 55%)";
        ctx.fill();
        ctx.strokeStyle = "hsl(0, 80%, 40%)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.font = "10px sans-serif";
        ctx.fillStyle = "hsl(0, 80%, 45%)";
        ctx.textAlign = "left";
        ctx.fillText("Singini", singiniX + 8, singiniY + 4);
      }

      // Draw pen tip at the edge of reveal
      if (progress > 0.05 && progress < 1) {
        // Find a visible pixel at the edge of the reveal radius
        const angle = Math.atan2(
          bounds.top + glyphHeight / 2 - singiniY,
          bounds.left + glyphWidth / 2 - singiniX
        ) + (progress - 0.5) * Math.PI * 0.5;
        const tipX = singiniX + Math.cos(angle) * revealRadius;
        const tipY = singiniY + Math.sin(angle) * revealRadius;

        ctx.beginPath();
        ctx.arc(tipX, tipY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(40, 75%, 55%)";
        ctx.fill();
        ctx.strokeStyle = "hsl(40, 75%, 40%)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      setAnimProgress(Math.round(progress * 100));

      if (frame < totalFrames) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsAnimating(false);
          setAnimProgress(0);
          drawGuide();
        }, 2000);
      }
    };

    // Show Singini point first, then animate
    drawGuide();
    ctx.beginPath();
    ctx.arc(singiniX, singiniY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(0, 80%, 55%)";
    ctx.fill();
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "hsl(0, 80%, 45%)";
    ctx.textAlign = "left";
    ctx.fillText("Singini ●", singiniX + 10, singiniY + 4);

    setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(animate);
    }, 800);
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
