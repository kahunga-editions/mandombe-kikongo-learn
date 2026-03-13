import { useRef, useState, useEffect, useCallback } from "react";
import { RotateCcw, Eye, EyeOff, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface GlyphTracingCanvasProps {
  glyph: string;
  label: string;
}

const GlyphTracingCanvas = ({ glyph, label }: GlyphTracingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animFrameRef = useRef<number>(0);
  const { t } = useLanguage();

  // Extract glyph path points by rendering to offscreen canvas
  const getGlyphPoints = useCallback(() => {
    const offscreen = document.createElement("canvas");
    offscreen.width = 280;
    offscreen.height = 280;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return [];

    ctx.font = "120px 'Masono Mandombe'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(glyph, 140, 150);

    const imageData = ctx.getImageData(0, 0, 280, 280);
    const points: { x: number; y: number }[] = [];

    // Sample edge points for animation path
    for (let y = 0; y < 280; y += 3) {
      for (let x = 0; x < 280; x += 3) {
        const idx = (y * 280 + x) * 4;
        if (imageData.data[idx + 3] > 128) {
          // Check if it's an edge pixel
          const neighbors = [
            idx - 4, idx + 4,
            idx - 280 * 4, idx + 280 * 4,
          ];
          const isEdge = neighbors.some((n) => {
            if (n < 0 || n >= imageData.data.length) return true;
            return imageData.data[n + 3] <= 128;
          });
          if (isEdge) {
            points.push({ x, y });
          }
        }
      }
    }

    // Sort points to create a continuous path using nearest-neighbor
    if (points.length === 0) return [];
    const sorted: { x: number; y: number }[] = [points[0]];
    const used = new Set([0]);

    for (let i = 1; i < Math.min(points.length, 300); i++) {
      const last = sorted[sorted.length - 1];
      let bestDist = Infinity;
      let bestIdx = -1;
      for (let j = 0; j < points.length; j++) {
        if (used.has(j)) continue;
        const dx = points[j].x - last.x;
        const dy = points[j].y - last.y;
        const dist = dx * dx + dy * dy;
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = j;
        }
      }
      if (bestIdx === -1) break;
      used.add(bestIdx);
      sorted.push(points[bestIdx]);
    }

    return sorted;
  }, [glyph]);

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

  // Animate the glyph tracing
  const playAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasDrawn(false);
    drawGuide();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = getGlyphPoints();
    if (points.length === 0) {
      setIsAnimating(false);
      return;
    }

    let currentIdx = 0;
    const speed = 3; // points per frame

    const animate = () => {
      if (currentIdx >= points.length) {
        setIsAnimating(false);
        // Fade out after a brief pause
        setTimeout(() => {
          drawGuide();
        }, 1500);
        return;
      }

      const end = Math.min(currentIdx + speed, points.length);
      ctx.strokeStyle = "hsl(16, 70%, 45%)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(points[currentIdx].x, points[currentIdx].y);
      for (let i = currentIdx + 1; i < end; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      // Draw a small circle at the current point (pen tip)
      const tip = points[end - 1];
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(40, 75%, 55%)";
      ctx.fill();

      currentIdx = end;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isAnimating, drawGuide, getGlyphPoints]);

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
    drawGuide();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative border-2 border-border rounded-xl overflow-hidden bg-cream dark:bg-card touch-none">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
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
