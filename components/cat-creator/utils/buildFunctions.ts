import { RefObject } from "react";
import { DRAW_ORDER, Layers, Node, PartKey, PARTS } from "../cat-creator-types";
import { buildPath } from "./path";
import { useNodes } from "../nodeProvider";

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

export const searchNode = (nodes: Node[], search: string) => {
  console.log("seachgin nodes", nodes.flat(), search)
  return nodes.flat().find((node) => node.id == search);
};



export const getAllNodes = (nodes: Node[]) => {
  const res: string[] = [];
  nodes.flat().forEach((node) => {
    res.push(node.id);
  });
  return res;
};
