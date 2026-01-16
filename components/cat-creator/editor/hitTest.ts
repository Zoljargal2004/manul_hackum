import { Node } from "../cat-creator-types";

export function isInsideNode(
  node: Node,
  mouseX: number,
  mouseY: number,
  worldPos: { x: number; y: number }
) {
  return (
    mouseX >= worldPos.x &&
    mouseX <= worldPos.x + node.scale.width &&
    mouseY >= worldPos.y &&
    mouseY <= worldPos.y + node.scale.height
  );
}

export function findNewSelectedNode(
  nodes: Node[],
  x: number,
  y: number
): Node | null {
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];

    let lx = x - (node.position.x + node.scale.width / 2);
    let ly = y - (node.position.y + node.scale.height / 2);

    if (node.rotation) {
      const rad = (-node.rotation * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      const rx = lx * cos - ly * sin;
      const ry = lx * sin + ly * cos;

      lx = rx;
      ly = ry;
    }

    if (node.children) {
      const found = findNewSelectedNode(node.children, lx, ly);
      if (found) return found;
    }
    if (
      lx >= -node.scale.width / 2 &&
      lx <= node.scale.width / 2 &&
      ly >= -node.scale.height / 2 &&
      ly <= node.scale.height / 2
    ) {
      return node;
    }
  }

  return null;
}

export type ResizeHandle = "se" | "s" | "e" | null;

const HANDLE_SIZE = 8;

export function getResizeHandle(
  nodes: Node[],
  x: number,
  y: number,
  selectedId: string
): ResizeHandle {
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];

    let lx = x - (node.position.x + node.scale.width / 2);
    let ly = y - (node.position.y + node.scale.height / 2);

    if (node.rotation) {
      const rad = (-node.rotation * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      const rx = lx * cos - ly * sin;
      const ry = lx * sin + ly * cos;

      lx = rx;
      ly = ry;
    }
    if (node.children) {
      const found = getResizeHandle(node.children, lx, ly, selectedId);
      if (found) return found;
    }
    if (node.id === selectedId) {
      const w = node.scale.width;
      const h = node.scale.height;
      const margin = HANDLE_SIZE / 2 + 4;

      // console.log(lx, -w / 2, margin);
      // console.log(lx, w / 2, margin);

      if (
        lx >= -margin &&
        lx <= +margin &&
        ly >= h / 2 - margin &&
        ly <= h / 2 + margin
      ) {
        return "s";
      }
      if (
        lx >= w / 2 - margin &&
        lx <= w / 2 + margin &&
        ly >= -margin &&
        ly <= +margin
      ) {
        return "e";
      }

      if (
        lx >= w / 2 - margin &&
        lx <= w / 2 + margin &&
        ly >= h / 2 - margin &&
        ly <= h / 2 + margin
      ) {
        return "se";
      }
    }
  }

  return null;
}
