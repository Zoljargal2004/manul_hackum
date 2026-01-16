import { Node } from "../../cat-creator-types";

export function searchNode(nodes: Node[], search: string | null): Node | null {
  for (const node of nodes) {
    if (node.id === search) return node;

    if (node.children?.length) {
      const found = searchNode(node.children, search);
      if (found) return found;
    }
  }

  return null;
}

export const getAllNodesNames = (nodes: Node[]) => {
  const allnodes: string[] = [];

  for (const node of nodes) {
    if (node.id) allnodes.push(node.id);

    if (node.children?.length) {
      const children = getAllNodesNames(node.children);
      allnodes.push(...children);
    }
  }

  return allnodes;
};
export const getAllNodes = (nodes: Node[]) => {
  const allnodes: Node[] = [];

  for (const node of nodes) {
    if (node.id) allnodes.push(node);

    if (node.children?.length) {
      const children = getAllNodes(node.children);
      allnodes.push(...children);
    }
  }

  return allnodes;
};

