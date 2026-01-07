import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const Paint = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const drawing = useRef(false);

  const [color, setColor] = useState("#000");
  const [size, setSize] = useState(6);
  const [eraser, setEraser] = useState(false);
  const [shape, toggleShape] = useState<string | null>(null);

  const undoStack = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const resize = () => {
      canvas.width = img.clientWidth;
      canvas.height = img.clientHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const ctx = () => canvasRef.current?.getContext("2d") ?? null;

  const saveState = () => {
    const c = canvasRef.current;
    const context = ctx();
    if (!c || !context) return;
    undoStack.current.push(context.getImageData(0, 0, c.width, c.height));
    redoStack.current = [];
  };

  const undo = () => {
    const c = canvasRef.current;
    const context = ctx();
    if (!c || !context || !undoStack.current.length) return;

    redoStack.current.push(context.getImageData(0, 0, c.width, c.height));
    context.putImageData(undoStack.current.pop()!, 0, 0);
  };

  const redo = () => {
    const c = canvasRef.current;
    const context = ctx();
    if (!c || !context || !redoStack.current.length) return;

    undoStack.current.push(context.getImageData(0, 0, c.width, c.height));
    context.putImageData(redoStack.current.pop()!, 0, 0);
  };

  const clear = () => {
    const c = canvasRef.current;
    const context = ctx();
    if (!c || !context) return;
    saveState();
    context.clearRect(0, 0, c.width, c.height);
  };

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;

    saveState();
    draw(e);
  };

  const stop = () => {
    drawing.current = false;
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;

    const context = ctx();
    if (!context) return;

    const { x, y } = getPos(e);

    context.globalCompositeOperation = eraser
      ? "destination-out"
      : "source-over";

    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
  };

  return (
    <div className="order-2 md:order-1">
      <Card className="p-6 aspect-square flex flex-col gap-4 bg-muted/50">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="range"
            min={1}
            max={30}
            value={size}
            onChange={(e) => setSize(+e.target.value)}
          />

          <button
            onClick={() => {
              setEraser(!eraser);
              toggleShape(null);
            }}
          >
            {eraser ? "Brush" : "Eraser"}
          </button>

          <button
            onClick={() => {
              toggleShape("circle");
              setEraser(false)
            }}
          >
            <Circle />
          </button>

          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
          <button onClick={clear}>Clear</button>
        </div>

        {/* Canvas */}
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <img
            ref={imgRef}
            src="/create-cat/cat_edit.png"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            alt="Cat"
          />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-crosshair"
            onPointerDown={start}
            onPointerMove={draw}
            onPointerUp={stop}
            onPointerLeave={stop}
          />
        </div>
      </Card>
    </div>
  );
};

export default Paint;
