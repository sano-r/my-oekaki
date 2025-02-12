import { useEffect, useState } from "react";

export const useDrawing = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  color: string,
  lineWidth: number
) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) * (canvas.width / rect.width),
      y: (evt.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDrawing = (e: MouseEvent) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const pos = getMousePos(canvasRef.current, e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        setIsDrawing(true);
      }
    }
  };

  const draw = (e: MouseEvent) => {
    if (isDrawing && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const pos = getMousePos(canvasRef.current, e);
        ctx.lineTo(pos.x, pos.y);
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
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const handleMouseDown = (e: MouseEvent) => startDrawing(e);
    const handleMouseMove = (e: MouseEvent) => draw(e);
    const handleMouseUp = () => stopDrawing();
    const handleMouseLeave = () => stopDrawing();

    if (canvas) {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (canvas) {
          canvas.removeEventListener("mousedown", handleMouseDown);
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseup", handleMouseUp);
          canvas.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }
  }, [canvasRef, isDrawing, color, lineWidth]);

  return { isDrawing };
};
