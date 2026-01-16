import { Node } from "../../cat-creator-types";
import { searchNode } from "../node/search";

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

  nodes.forEach((node) => {
    drawSelectionNode(ctx, node, selected);
  });
}

function drawSelectionNode(
  ctx: CanvasRenderingContext2D,
  node: Node,
  selected: string
) {
  ctx.save();

  ctx.translate(
    node.position.x + node.scale.width / 2,
    node.position.y + node.scale.height / 2
  );

  ctx.rotate((node.rotation * Math.PI) / 180);

  if (node.id === selected) {
    const w = node.scale.width;
    const h = node.scale.height;
    const handleSize = 8;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#3b82f6";
    ctx.setLineDash([6, 4]);

    ctx.strokeRect(-w / 2, -h / 2, w, h);

    // Draw resize handles (corners)
    ctx.fillStyle = "#3b82f6";
    ctx.setLineDash([]);
    
    // Corner handles
    const corners = [
      { x: 0, y: h / 2 }, // Top-left
      { x: w / 2, y: 0 },  // Top-right
      { x: w / 2, y: h / 2 },   // Bottom-right
    ];


    corners.forEach((corner) => {
      ctx.fillRect(
        corner.x - handleSize / 2,
        corner.y - handleSize / 2,
        handleSize,
        handleSize
      );
    });
  }

  // draw children inside this transform
  if (node.children) {
    node.children.forEach((child) => {
      drawSelectionNode(ctx, child, selected);
    });
  }

  ctx.restore();
}

