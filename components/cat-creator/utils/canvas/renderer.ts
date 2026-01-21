import { BASE_SRC, DRAW_ORDER, Layers, PARTS } from "../../cat-creator-types";

export function drawImage(
  ctx: CanvasRenderingContext2D,
  src: string,
  x = 0,
  y = 0,
  w?: number,
  h?: number
): Promise<void> {
  return new Promise((resolve) => {
    if (!src) return resolve();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      w && h ? ctx.drawImage(img, x, y, w, h) : ctx.drawImage(img, x, y);
      resolve();
    };
  });
}

export function renderCat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  layers: Layers,
  stroke: number = 0
) {
 

  // Apply stroke around the cat if stroke width > 0
  if (stroke > 0) {
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = stroke;
    ctx.strokeRect(stroke / 2, stroke / 2, width - stroke, height - stroke);
    ctx.restore();
  }
}

