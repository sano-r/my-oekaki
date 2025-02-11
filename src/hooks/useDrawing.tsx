import { useEffect, useState } from "react";

export const useDrawing = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: MouseEvent) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        setIsDrawing(true);
      }
    }
  };

  const draw = (e: MouseEvent) => {
    if (isDrawing && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseleave", stopDrawing);

      return () => {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mouseleave", stopDrawing);
      };
    }
  }, [isDrawing]);

  return { isDrawing };
};
