"use client";
import {
  BASE_SRC,
  DRAW_ORDER,
  Layers,
  Node,
  PartKey,
  PARTS,
} from "../../cat-creator-types";

let PADDING = 25;

export async function composeCanvas(
  canvas: HTMLCanvasElement,
  buffer: HTMLCanvasElement,
  nodes: Node[],
  updateNode: (id: string, fn: (n: Node) => Node) => void,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach((root) => {
    drawNodeTree(ctx, root, buffer);
  });
}

export async function DrawSpecials(
  nodes: Node[],
  updateNode: (id: string, fn: (n: Node) => Node) => void,
) {
  for (const node of nodes) {
    if (node.special && node.layers) {
      await BuildSpecialHtmlElement(node, updateNode);
    }

    if (node.children?.length) {
      await DrawSpecials(node.children, updateNode);
    }
  }
}

async function BuildSpecialHtmlElement(
  node: Node,
  updateNode: (id: string, fn: (n: Node) => Node) => void,
) {
  if (!node.layers) return;

  const { width, height } = node.scale;

  const buffer = document.createElement("canvas");
  buffer.width = width;
  buffer.height = height;

  const ctx = buffer.getContext("2d");
  if (!ctx) return;

  // base
  const base = await loadImage(BASE_SRC);
  ctx.drawImage(base, 0, 0, width, height);

  // parts
  for (const key of DRAW_ORDER) {
    const src = node.layers[key as PartKey];
    if (!src) continue;

    const part = await loadImage(src);
    const [rx, ry, rw, rh] = PARTS[key].position;

    ctx.drawImage(part, rx * width, ry * height, rw * width, rh * height);
  }

  const img = await loadImage(buffer.toDataURL());

  updateNode(node.id, (prev) => ({
    ...prev,
    src: img,
  }));
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawNodeTree(
  ctx: CanvasRenderingContext2D,
  node: Node,
  catBuffer: HTMLCanvasElement,
) {
  ctx.save();

  ctx.translate(node.position.x, node.position.y);

  ctx.rotate((node.rotation * Math.PI) / 180);

  if (node.flip) {
    ctx.translate(node.scale.width, 0);
    ctx.scale(-1, 1);
  }
  if (node.src) {
    ctx.drawImage(
      node.src,
      PADDING,
      PADDING,
      node.scale.width - PADDING * 2,
      node.scale.height - PADDING * 2,
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
      ctx.fillText(
        textLine,
        x + node.scale.width / 2,
        startY + index * lineHeight + node.scale.height / 2,
      );
    });

    ctx.restore();
  }

  const stroke = node.stroke ?? 0;
  if (stroke > 0) {
  }

  if (node.children) {
    node.children.forEach((child) => {
      drawNodeTree(ctx, child, catBuffer);
    });
  }

  ctx.restore();
}
