import { useRef, useState } from "react";
import { useDrawing } from "./hooks/useDrawing";

export function App() {
  const [drawingSettings, setDrawingSettings] = useState({
    color: "#000000",
    lineWidth: 5,
  });
  const [tempColor, setTempColor] = useState(drawingSettings.color);
  const [tempLineWidth, setTempLineWidth] = useState(drawingSettings.lineWidth);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDrawing(canvasRef, drawingSettings.color, drawingSettings.lineWidth);

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

  const applySettings = () => {
    setDrawingSettings({ color: tempColor, lineWidth: tempLineWidth });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">お絵描きアプリ</h1>
      <br />
      <div className="flex items-center space-x-4 mb-2">
        <label>
          Color:
          <input
            type="color"
            value={tempColor}
            onChange={(e) => setTempColor(e.target.value)}
            className="border rounded ml-1"
          />
        </label>
        <label>
          Line width:
          <input
            type="number"
            value={tempLineWidth}
            onChange={(e) => setTempLineWidth(Number(e.target.value))}
            className="border rounded w-16 ml-1"
          />
        </label>
        <button
          onClick={applySettings}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Apply
        </button>
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
