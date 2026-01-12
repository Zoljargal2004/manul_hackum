import { DRAW_ORDER, Layers, PARTS } from "../cat-creator-types";
import { buildPath } from "./path";

export const buildInitialLayers = (): Layers => {
  const out = {} as Layers;
  DRAW_ORDER.forEach((k) => (out[k] = buildPath(k, PARTS[k].options[0])));
  return out;
};