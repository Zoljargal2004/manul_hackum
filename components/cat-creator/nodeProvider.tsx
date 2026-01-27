"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Layers, Node } from "./cat-creator-types";
import { buildInitialLayers } from "./utils/layer/initial";
import { searchNode } from "./utils/node/search";

type NodeContextType = {
  nodes: Node[];
  selected: string | null;
  selectNode: (id: string | null) => void;
  updateNode: (id: string, updater: (n: Node) => Node) => void;
  addNode: (node: Node) => void;
  removeNode: (id: string) => void;
  adoptNode: (parentid: string, child: Node) => void;
  undo: () => void;
  redo: () => void;
  updateNodeRaw: (id: string, updater: (n: Node) => Node) => void;
  moveNode: (id: string, direction: "up" | "down") => void;
  selectedNode: Node | null;
  setToggleRation: (toggle: boolean) => void;
  nodeRatio: number;
  updateCat: (layer: Layers) => void;
};

const NodeContext = createContext<NodeContextType | null>(null);

export const NodeManager = ({ children }: { children: React.ReactNode }) => {
  const [toggleRation, setToggleRation] = useState(false);
  const [selected, setSelected] = useState<string | null>("cat");

  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "cat",
      position: { x: 82, y: 81 },
      scale: { width: 525, height: 487 },
      rotation: 0,
      parent: null,
      stroke: 0,
      special: true,
      layers: buildInitialLayers(),
    },
  ]);

  const nodeRatio = useRef<number>(1);

  const undoStack = useRef<Node[][]>([]);
  const redoStack = useRef<Node[][]>([]);

  function commit(next: Node[]) {
    undoStack.current.push(nodes);
    redoStack.current.length = 0;
    setNodes(next);
  }

  function undo() {
    const prev = undoStack.current.pop();
    if (!prev) return;
    redoStack.current.push(nodes);
    setNodes(prev);
  }

  function redo() {
    const next = redoStack.current.pop();
    if (!next) return;
    undoStack.current.push(nodes);
    setNodes(next);
  }

  const selectedNode = searchNode(nodes, selected);

  useEffect(() => {
    if (!selectedNode) return;
    const { width, height } = selectedNode.scale;
    nodeRatio.current = width / height;
  }, [selected]);

  const selectNode = (id: string | null) => {
    setSelected(id);
  };

  function updateNodeRaw(id: string, updater: (n: Node) => Node) {
    const update = (nodes: Node[]): Node[] =>
      nodes.map((node) => {
        if (node.id === id) return roundNode(updater(node));
        if (node.children?.length) {
          return { ...node, children: update(node.children) };
        }
        return node;
      });

    setNodes(update);
  }

  function updateNode(id: string, updater: (n: Node) => Node) {
    const update = (nodes: Node[]): Node[] =>
      nodes.map((node) => {
        if (node.id === id) return updater(node);
        if (node.children?.length) {
          return { ...node, children: update(node.children) };
        }
        return node;
      });

    commit(update(nodes));
  }

  const addNode = (node: Node) => {
    commit([...nodes, node]);
  };

  const removeNode = (id: string) => {
    if (id === "cat") return;

    commit(removeNodeById(nodes, id));
    setSelected((s) => (s === id ? null : s));
  };

  function removeNodeById(nodes: Node[], id: string): Node[] {
    nodes.forEach(node => {if (node.id === "cat") addNode(node)})
    return nodes
      .filter((n) => n.id !== id)
      .map((n) => ({
        ...n,
        children: n.children ? removeNodeById(n.children, id) : n.children,
      }));
  }
  function moveNodeById(
    nodes: Node[],
    id: string,
    direction: "up" | "down",
  ): Node[] {
    function getWorldCenter(
      nodeList: Node[],
      targetId: string,
      accumulatedTransform = { x: 0, y: 0 },
    ): { x: number; y: number } | null {
      for (const n of nodeList) {
        // This node's center in world space
        const nodeCenter = {
          x: accumulatedTransform.x + n.position.x,
          y: accumulatedTransform.y + n.position.y,
        };

        if (n.id === targetId) return nodeCenter;

        if (n.children) {
          const nextTransform = {
            x: accumulatedTransform.x + n.position.x,
            y: accumulatedTransform.y + n.position.y,
          };
          const found = getWorldCenter(n.children, targetId, nextTransform);
          if (found) return found;
        }
      }
      return null;
    }

    function findNodeById(nodeList: Node[], targetId: string): Node | null {
      for (const n of nodeList) {
        if (n.id === targetId) return n;
        if (n.children) {
          const found = findNodeById(n.children!, targetId);
          if (found) return found;
        }
      }
      return null;
    }

    function helper(
      list: Node[],
      parent: Node | null,
      ancestorPos = { x: 0, y: 0 },
    ): { nodes: Node[]; absorbed?: Node } {
      const copy = [...list];
      const index = copy.findIndex((n) => n.id === id);

      if (index !== -1) {
        if (direction === "up" && index > 0) {
          [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
          return { nodes: copy };
        }

        if (direction === "down" && index < copy.length - 1) {
          [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
          return { nodes: copy };
        }

        if (direction === "up" && index === 0 && parent) {
          const child = copy[0];
          const siblings = copy.slice(1);

          // Calculate world center positions before swap
          const parentWorldCenter = getWorldCenter(nodes, parent.id);
          const childWorldCenter = getWorldCenter(nodes, child.id);

          if (parentWorldCenter && childWorldCenter) {
            // Get grandparent center (or root origin)
            const grandparentCenterPos = parent.parent
              ? getWorldCenter(nodes, parent.parent) || { x: 0, y: 0 }
              : { x: 0, y: 0 };

            // New parent (old child) should appear at child's old world center
            // Its position relative to grandparent should be:
            const newParentPos = {
              x:
                childWorldCenter.x -
                child.scale.width / 2 -
                grandparentCenterPos.x,
              y:
                childWorldCenter.y -
                child.scale.height / 2 -
                grandparentCenterPos.y,
            };

            // After swap, new parent's center will be at:
            const newParentWorldCenter = {
              x:
                grandparentCenterPos.x + newParentPos.x + child.scale.width / 2,
              y:
                grandparentCenterPos.y +
                newParentPos.y +
                child.scale.height / 2,
            };

            // New child (old parent) should appear at parent's old world center
            // Its position relative to new parent's center should be:
            const newChildPos = {
              x:
                parentWorldCenter.x -
                parent.scale.width / 2 -
                newParentWorldCenter.x,
              y:
                parentWorldCenter.y -
                parent.scale.height / 2 -
                newParentWorldCenter.y,
            };

            const newParentNode: Node = {
              ...parent,
              position: newChildPos,
              children: child.children ?? [],
            };

            const newChildNode: Node = {
              ...child,
              position: newParentPos,
              parent: parent.parent,
              children: [newParentNode, ...siblings],
            };

            return { nodes: [newChildNode], absorbed: parent };
          }

          // Fallback to simple swap if world positions can't be calculated
          const p = parent.position;
          const c = child.position;

          const newParent: Node = {
            ...parent,
            position: {
              x: -c.x,
              y: -c.y,
            },
            children: child.children ?? [],
          };

          const newChild: Node = {
            ...child,
            position: {
              x: p.x + c.x,
              y: p.y + c.y,
            },
            parent: parent.parent,
            children: [newParent, ...siblings],
          };

          return { nodes: [newChild], absorbed: parent };
        }

        return { nodes: copy };
      }

      return {
        nodes: copy.flatMap((n) => {
          if (!n.children) return [n];

          const nextAncestorPos = {
            x: ancestorPos.x + n.position.x,
            y: ancestorPos.y + n.position.y,
          };
          const res = helper(n.children, n, nextAncestorPos);

          // if this child absorbed its parent, replace it
          if (res.absorbed && n.id === res.absorbed.id) {
            return res.nodes;
          }

          return [{ ...n, children: res.nodes }];
        }),
      };
    }

    return helper(nodes, null).nodes;
  }

  const moveNode = (id: string, direction: "up" | "down") => {
    commit(moveNodeById(nodes, id, direction));
  };

  const adoptNode = (parentId: string, child: Node) => {
    const insert = (nodes: Node[]): Node[] =>
      nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: node.children ? [...node.children, child] : [child],
          };
        }

        if (node.children) {
          return { ...node, children: insert(node.children) };
        }

        return node;
      });

    commit(insert(nodes));
  };

  const updateCat = (layers: Layers) => {
    const node = searchNode(nodes, "cat");
    if (!node) return;
    node.layers = layers;
    // Drawspecials
  };

  return (
    <NodeContext.Provider
      value={{
        updateCat,
        nodeRatio: nodeRatio.current,
        setToggleRation,
        selectedNode,
        nodes,
        selected,
        selectNode,
        updateNode,
        addNode,
        removeNode,
        adoptNode,
        undo,
        redo,
        updateNodeRaw,
        moveNode,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

function roundNode(node: Node): Node {
  return {
    ...node,
    position: {
      x: Math.round(node.position.x),
      y: Math.round(node.position.y),
    },
    scale: {
      width: Math.round(node.scale.width),
      height: Math.round(node.scale.height),
    },
    rotation: Math.round(node.rotation),
    children: node.children?.map(roundNode),
  };
}

export const useNodes = () => {
  const ctx = useContext(NodeContext);
  if (!ctx) throw new Error("useNodes must be used inside NodeManager");
  return ctx;
};
