import { Node } from "../cat-creator-types";
import { searchNode } from "../utils/buildFunctions";

export function isInsideNode(node: Node, x: number, y: number) {
  return (
    x >= node.position.x &&
    x <= node.position.x + node.scale.width &&
    y >= node.position.y &&
    y <= node.position.y + node.scale.height
  );
}


export function findNewSelectedNode(
  nodes: Node[],
  x: number,
  y: number
): Node | null {
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];

    // move into node-centered space
    let lx = x - (node.position.x + node.scale.width / 2);
    let ly = y - (node.position.y + node.scale.height / 2);

    // undo rotation
    if (node.rotation) {
      const rad = (-node.rotation * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      const rx = lx * cos - ly * sin;
      const ry = lx * sin + ly * cos;

      lx = rx;
      ly = ry;
    }

    // check children first (top-most & deepest)
    if (node.children) {
      const found = findNewSelectedNode(node.children, lx, ly);
      if (found) return found;
    }

    // centered box hit test
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
