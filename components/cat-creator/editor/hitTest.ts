import { Node } from "../cat-creator-types";

export function isInsideNode(node: Node, x: number, y: number) {
  return (
    x >= node.position.x &&
    x <= node.position.x + node.scale.width &&
    y >= node.position.y &&
    y <= node.position.y + node.scale.height
  );
}
