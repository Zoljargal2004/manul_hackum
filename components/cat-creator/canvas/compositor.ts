import { Layers } from "../cat-creator-types";
import { renderCat } from "./renderer";

export async function composeCanvas(
  canvas: HTMLCanvasElement,
  buffer: HTMLCanvasElement,
  layers: Layers,
  stroke: number,
  cat_size: { width: number; height: number },
  cat_pos: { x: number; y: number }
) {
  const ctx = canvas.getContext("2d");
  const bctx = buffer.getContext("2d");
  if (!ctx || !bctx) return;

  const { width, height } = cat_size;
  const { x, y } = cat_pos;

  await renderCat(bctx, width, height, layers);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (stroke > 0) {
    const snapshot = document.createElement("canvas");
    snapshot.width = buffer.width;
    snapshot.height = buffer.height;
    snapshot.getContext("2d")!.drawImage(buffer, 0, 0);

    bctx.save();
    bctx.globalCompositeOperation = "source-in";
    bctx.fillStyle = "white";
    bctx.fillRect(0, 0, buffer.width, buffer.height);
    bctx.restore();

    for (let a = 0; a < Math.PI * 2; a += Math.PI / 24) {
      const dx = Math.cos(a) * stroke;
      const dy = Math.sin(a) * stroke;
      ctx.drawImage(buffer, x + dx, y + dy);
    }

    bctx.clearRect(0, 0, buffer.width, buffer.height);
    bctx.drawImage(snapshot, 0, 0);
  }

  ctx.drawImage(buffer, x, y);
}

