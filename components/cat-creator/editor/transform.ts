import { Node } from "../cat-creator-types";

export function moveTheNode(
  selected: string,
  nodes: Node[],
  x: number,
  y: number
) {
  return nodes.map((n) =>
    n.id === selected
      ? { ...n, position: { x: Math.round(x), y: Math.round(y) } }
      : n
  );
}
