import { Layers, Node } from "../cat-creator-types";
import { renderCat } from "./renderer";

const PADDING = 25;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export async function composeCanvas(
  canvas: HTMLCanvasElement,
  buffer: HTMLCanvasElement,
  layers: Layers,
  nodes: Node[]
) {
  const ctx = canvas.getContext("2d");
  const bctx = buffer.getContext("2d");
  if (!ctx || !bctx) return;

  const catNode = nodes.find((n) => n.id === "cat");
  if (!catNode) return;

  const { width, height } = catNode.scale;

  bctx.setTransform(1, 0, 0, 1, 0, 0);
  bctx.clearRect(0, 0, buffer.width, buffer.height);
  bctx.translate(PADDING, PADDING);

  await renderCat(bctx, width - PADDING * 2, height - PADDING * 2, layers);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawNodeTree(ctx, catNode, buffer);

  nodes.forEach((root) => {
    drawNodeTree(ctx, root, buffer);
  });
}

export function drawNode(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  x: number,
  y: number,
  w: number,
  h: number,
  deg: number
) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
  ctx.restore();
}

function drawNodeTree(
  ctx: CanvasRenderingContext2D,
  node: Node,
  catBuffer: HTMLCanvasElement
) {
  ctx.save();

  // move into this node's local space
  ctx.translate(
    node.position.x + node.scale.width / 2,
    node.position.y + node.scale.height / 2
  );

  ctx.rotate((node.rotation * Math.PI) / 180);

  // draw this node
  if (node.id === "cat") {
    ctx.drawImage(catBuffer, -node.scale.width / 2, -node.scale.height / 2);
  } else if (node.src) {
    ctx.drawImage(
      node.src,
      -node.scale.width / 2,
      -node.scale.height / 2,
      node.scale.width,
      node.scale.height
    );
  }

  // draw children inside this space
  if (node.children) {
    node.children.forEach((child) => {
      drawNodeTree(ctx, child, catBuffer);
    });
  }

  ctx.restore();
}
