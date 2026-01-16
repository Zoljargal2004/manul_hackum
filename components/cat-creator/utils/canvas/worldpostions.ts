import { Node } from "../../cat-creator-types";

export function getWorldPosition(
  nodes: Node[],
  targetId: string,
  acc = { x: 0, y: 0 }
): { x: number; y: number } | null {
  for (const n of nodes) {
    const next = {
      x: acc.x + n.position.x,
      y: acc.y + n.position.y,
    };

    if (n.id === targetId) return next;

    if (n.children) {
      const found = getWorldPosition(n.children, targetId, next);
      if (found) return found;
    }
  }

  return null;
}
