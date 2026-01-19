import { Node } from "../cat-creator-types";
import { getAllNodes, getAllNodesNames } from "../utils/node/search";

export function isInsideNode(
  node: Node,
  mouseX: number,
  mouseY: number,
  worldPos: { x: number; y: number },
) {
  return (
    mouseX >= worldPos.x &&
    mouseX <= worldPos.x &&
    mouseY >= worldPos.y &&
    mouseY <= worldPos.y
  );
}

export function findNewSelectedNode(
  nodes: Node[],
  x: number,
  y: number,
): Node | null {
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];

    let lx = x - node.position.x;
    let ly = y - node.position.y;

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
      lx >= 0 &&
      lx <= node.scale.width &&
      ly >= 0 &&
      ly <= node.scale.height
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
  selectedId: string,
): ResizeHandle {
  const allnodes = getAllNodes(nodes);
  for (let i = allnodes.length - 1; i >= 0; i--) {
    const node = allnodes[i];

    let lx = x - node.position.x;
    let ly = y - node.position.y;

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

      if (
        lx >= w / 2 - margin &&
        lx <= w / 2 + margin &&
        ly >= h - margin &&
        ly <= h + margin
      ) {
        return "s";
      }
      if (
        lx >= w - margin &&
        lx <= w + margin &&
        ly >= h / 2 - margin &&
        ly <= h / 2 + margin
      ) {
        return "e";
      }

      if (
        lx >= w - margin &&
        lx <= w + margin &&
        ly >= h - margin &&
        ly <= h + margin
      ) {
        return "se";
      }
    }
  }

  return null;
}
