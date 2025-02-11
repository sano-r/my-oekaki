import React, { useRef, useState } from "react";

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
      }
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (isDrawing && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const downloadImage = () => {
    if (canvasRef.current) {
      const image = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "drawing.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border border-black"
      ></canvas>
      <br />
      <button
        onClick={downloadImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Download
      </button>
    </div>
  );
}
