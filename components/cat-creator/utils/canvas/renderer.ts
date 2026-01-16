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

export async function renderCat(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  layers: Layers,
  stroke: number = 0
) {
  ctx.clearRect(0, 0, width, height);
  await drawImage(ctx, BASE_SRC, 0, 0, width, height);

  for (const key of DRAW_ORDER) {
    const src = layers[key];
    if (!src) continue;

    const [rx, ry, rw, rh] = PARTS[key].position;

    const x = rx * width;
    const y = ry * height;
    const w = rw * width;
    const h = rh * height;

    await drawImage(ctx, src, x, y, w, h);
  }

  // Apply stroke around the cat if stroke width > 0
  if (stroke > 0) {
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = stroke;
    ctx.strokeRect(stroke / 2, stroke / 2, width - stroke, height - stroke);
    ctx.restore();
  }
}

