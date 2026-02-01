import { DRAW_ORDER, Layers, PartKey, PARTS } from "../../cat-creator-types";
import { buildPath } from "./path";

export const randomize = (
  setLayers: React.Dispatch<React.SetStateAction<Layers>>,
) => {
  const next = {} as Layers;

  DRAW_ORDER.forEach((k) => {
    const opts = PARTS[k].options;
    const pick = opts[Math.floor(Math.random() * opts.length)];
    if (k === "cloth")
      next[k] = Math.random() < 0.2 ? null : buildPath(k, pick);
    else next[k] = buildPath(k, pick);
  });

  setLayers(next);
};
