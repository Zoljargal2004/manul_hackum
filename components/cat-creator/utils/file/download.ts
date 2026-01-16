import { RefObject } from "react";

export const downloadPNG = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const a = document.createElement("a");
  a.download = "cat.png";
  a.href = canvas.toDataURL("image/png");
  a.click();
};

