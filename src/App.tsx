import { useRef, useState } from "react";
import { useDrawing } from "./hooks/useDrawing";

export function App() {
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDrawing(canvasRef, color, lineWidth);

  const downloadImage = () => {
    if (canvasRef.current) {
      try {
        const image = canvasRef.current.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "drawing.png";
        link.click();
      } catch (error) {
        console.error("Failed to download the image: ", error);
      }
    } else {
      console.error("Canvas reference is null.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">お絵描きアプリ</h1>
      <br />
      <div className="flex space-x-4">
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border rounded ml-1"
          />
        </label>
        <label>
          Line width:
          <input
            type="number"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="border rounded w-16 ml-1"
          />
        </label>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-black w-full max-w-4xl h-auto"
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
