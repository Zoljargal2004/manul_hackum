import { RefObject } from "react";
import { DRAW_ORDER, Layers, PartKey, PARTS } from "../cat-creator-types";
import { buildPath } from "./path";

export const downloadPNG = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const a = document.createElement("a");
  a.download = "cat.png";
  a.href = canvas.toDataURL("image/png");
  a.click();
};

export const randomize = (
  setLayers: React.Dispatch<React.SetStateAction<Layers>>
) => {
  const next = {} as Layers;

  DRAW_ORDER.forEach((k) => {
    const opts = PARTS[k].options;
    const pick = opts[Math.floor(Math.random() * opts.length)];
    next[k] = Math.random() < 0.2 ? null : buildPath(k, pick);
  });

  setLayers(next);
};