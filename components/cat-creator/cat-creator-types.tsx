export type PartKey =
  | "eyebrows"
  | "mouth"
  | "fang"
  | "nose"
  | "naruto_beard"
  | "beard"
  | "eye"
  | "stain";

export type PartConfig = {
  label: string;
  position: readonly [number, number, number, number];
  options: readonly string[];
  folder?: string;
};

export type Node = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  scale: {
    width: number;
    height: number;
  };
  special?: boolean
  flip?: boolean
  rotation: number;
  children?: Node[];
  parent: string | null;
  text?: string;
  stroke?: number;
  textColor?: string;
  fontSize? : number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";

  src?: HTMLImageElement;
  layers? : Layers
};

export type Layers = Record<PartKey, string | null>;

export const DRAW_ORDER: readonly PartKey[] = [
  "eyebrows",
  "mouth",
  "fang",
  "nose",
  "naruto_beard",
  "beard",
  "eye",
  "stain",
];

export const ARTBOARD = { w: 1327, h: 1133 };

export const PARTS: Record<PartKey, PartConfig> = {
  eyebrows: {
    label: "Eyebrows",
    position: [0.3956, 0.0706, 0.392, 0.1183],
    options: ["1.svg", "2.svg"],
  },
  mouth: {
    label: "Mouth",
    position: [0.5803, 0.256, 0.0821, 0.1253],
    options: ["1.svg"],
  },
  fang: {
    label: "Fang",
    position: [0.5759, 0.2948, 0.0897, 0.0433],
    options: ["1.svg", "2.svg", "3.svg"],
  },
  nose: {
    label: "Nose",
    position: [0.5336, 0.2383, 0.1598, 0.1024],
    options: ["1.svg"],
  },
  naruto_beard: {
    label: "Naruto Beard",
    position: [0.3068, 0.1942, 0.5872, 0.2233],
    options: ["1.svg"],
    folder: "naruto-beard",
  },
  beard: {
    label: "Beard",
    position: [0.2322, 0.1589, 0.7169, 0.2504],
    options: ["1.svg"],
  },
  eye: {
    label: "Eyes",
    position: [0.4161, 0.1086, 0.3594, 0.1977],
    options: ["1.svg"],
  },
  stain: {
    label: "Stain",
    position: [0.5389, 0.0856, 0.0754, 0.0671],
    options: ["1.svg"],
  },
};

export const BASE_SRC = "/create-cat/base/base.svg";
