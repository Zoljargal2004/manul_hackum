import { Node } from "../cat-creator-types";

export function drawRetriangle(
  canvas: HTMLCanvasElement,
  nodes: Node[],
  selected: string | null
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!selected) return;

  const node = nodes.find((n) => n.id === selected);
  if (!node) return;

  const { x, y } = node.position;
  const { width, height } = node.scale;

  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#3b82f6";
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(x, y, width, height);

  ctx.restore();
}
