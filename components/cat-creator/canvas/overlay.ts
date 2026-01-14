import { Node } from "../cat-creator-types";

export function drawRetriangle(
  canvas: HTMLCanvasElement,
  nodes: Node[],
  selected: string | null
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!selected) return;

  const node = nodes.find((n) => n.id === selected);
  if (!node) return;

  const { x, y } = node.position;
  const { width: w, height: h } = node.scale;
  const deg = node.rotation;

  ctx.save();

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#3b82f6";
  ctx.setLineDash([6, 4]);

  ctx.translate(x + w / 2, y + h / 2);

  ctx.rotate((deg * Math.PI) / 180);

  ctx.strokeRect(-w / 2, -h / 2, w, h);

  ctx.restore();
}
