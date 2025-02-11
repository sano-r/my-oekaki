import { useRef } from "react";
import { useDrawing } from "./hooks/useDrawing";

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDrawing(canvasRef);

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
