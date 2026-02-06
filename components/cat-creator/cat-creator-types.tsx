export type PartKey =
  // | "eyebrows"
  // | "mouth"
  "beard" | "nose" | "shoes" | "hat" | "cloth" | "eye";

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
  special?: boolean;
  flip?: boolean;
  rotation: number;
  children?: Node[];
  parent: string | null;
  text?: string;
  stroke?: number;
  textColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";

  src?: HTMLImageElement;
  layers?: Layers;
};

export type Layers = Record<PartKey, string | null>;

export const DRAW_ORDER: readonly PartKey[] = [
  // "eyebrows",
  // "mouth",
  // "fang",
  "shoes",
  "nose",
  "eye",
  "cloth",
  "beard",
  "hat",
];

export const ARTBOARD = { w: 1327, h: 1133 };

export const PARTS: Record<PartKey, PartConfig> = {
  // eyebrows: {
  //   label: "Eyebrows",
  //   position: [0.3956, 0.0706, 0.392, 0.1183],
  //   options: ["1.svg", "2.svg"],
  // },
  // mouth: {
  //   label: "Mouth",
  //   position: [0.5803, 0.256, 0.0821, 0.1253],
  //   options: ["1.svg"],
  // },
  beard: {
    label: "Сахал",
    position: [0.1, 0, 0.8, 0.44],
    options: ["1.png"],
  },
  nose: {
    label: "Хошуу",
    position: [0.42, 0.23, 0.1598, 0.25],
    options: ["1.png", "2.png", "3.png", "4.png", "5.png"],
  },
  shoes: {
    label: "Гутал",
    position: [0.04, 0.7, 0.9, 0.45],
    options: ["1.png", "2.png", "3.png"],
    folder: "shoes",
  },
  hat: {
    label: "Малгай",
    position: [0.15, -0.15, 0.7, 0.5],
    options: ["1.png", "2.png", "3.png", "4.png", "5.png"],
  },
  cloth: {
    label: "Хувцас",
    position: [0, 0, 1, 1],
    options: ["1.png", "2.png", "3.png", "4.png", "5.png"],
  },
  eye: {
    label: "Нүд",
    position: [0, 0, 1, 1],
    options: ["1.png", "2.png"],
  },
};

export const BASE_SRC = "/create-cat/base/base.png";
