import { Layers, Node } from "../../cat-creator-types";
import { renderCat } from "./renderer";
import { searchNode } from "../node/search";

const PADDING = 25;



export async function composeCanvas(
  canvas: HTMLCanvasElement,
  buffer: HTMLCanvasElement,
  layers: Layers,
  nodes: Node[]
) {
  const ctx = canvas.getContext("2d");
  const bctx = buffer.getContext("2d");
  if (!ctx || !bctx) return;

  const catNode = searchNode(nodes, "cat");
  if (!catNode) return;

  const { width, height } = catNode.scale;
  const catStroke = catNode.stroke ?? 0;

  bctx.setTransform(1, 0, 0, 1, 0, 0);
  bctx.clearRect(0, 0, buffer.width, buffer.height);
  bctx.translate(PADDING, PADDING);

  await renderCat(bctx, width - PADDING * 2, height - PADDING * 2, layers, catStroke);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.drawImage(img, 0, 0, w, h);
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
    node.position.x ,
    node.position.y 
  );

  ctx.rotate((node.rotation * Math.PI) / 180);

  // draw this node
  if (node.id === "cat") {
    ctx.drawImage(catBuffer, 0, 0);
  } else if (node.src) {
    ctx.drawImage(
      node.src,
      0,
      0,
      node.scale.width - PADDING,
      node.scale.height - PADDING
    );
  } else if (node.text) {
    // Render text node
    ctx.save();
    
    // Apply text styling
    const textColor = node.textColor || "#FFF";
    const fontFamily = node.fontFamily || "Arial";
    const fontWeight = node.fontWeight || "normal";
    const fontSize = node.fontSize || 12;
    const textAlign = node.textAlign || "center";
    
    ctx.fillStyle = textColor;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textAlign = textAlign;
    ctx.textBaseline = "middle";
    
    const words = node.text.split(" ");
    const maxWidth = node.scale.width;
    const lineHeight = fontSize * 1.2;
    const lines: string[] = [];
    let line = "";
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && i > 0) {
        lines.push(line.trim());
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    if (line.trim()) {
      lines.push(line.trim());
    }
    
    // Draw lines with proper alignment
    const startY = -((lines.length - 1) * lineHeight) / 2;
    lines.forEach((textLine, index) => {
      let x = 0;
      if (textAlign === "left") {
        x = -maxWidth / 2;
      } else if (textAlign === "right") {
        x = maxWidth / 2;
      }
      ctx.fillText(textLine, x, startY + index * lineHeight);
    });
    
    ctx.restore();
  }

  // draw stroke around the node if stroke > 0
  const stroke = node.stroke ?? 0;
  if (stroke > 0) {
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = stroke;
    ctx.strokeRect(
      -node.scale.width / 2 + stroke / 2,
      -node.scale.height / 2 + stroke / 2,
      node.scale.width - stroke,
      node.scale.height - stroke
    );
    ctx.restore();
  }

  // draw children inside this space
  if (node.children) {
    node.children.forEach((child) => {
      drawNodeTree(ctx, child, catBuffer);
    });
  }

  ctx.restore();
}

