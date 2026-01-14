"use client";

import { createContext, useContext, useRef, useState } from "react";
import { Node } from "./cat-creator-types";

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
};

const NodeContext = createContext<NodeContextType | null>(null);

export const NodeManager = ({ children }: { children: React.ReactNode }) => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "cat",
      position: { x: 100, y: 100 },
      scale: { width: 700, height: 650 },
      rotation: 0,
      parent: null,
    },
  ]);

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

  const [selected, setSelected] = useState<string | null>("cat");

  const selectNode = (id: string | null) => {
    setSelected(id);
  };

  function updateNodeRaw(id: string, updater: (n: Node) => Node) {
    const update = (nodes: Node[]): Node[] =>
      nodes.map((node) => {
        if (node.id === id) return updater(node);
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
    return nodes
      .filter((n) => n.id !== id)
      .map((n) => ({
        ...n,
        children: n.children ? removeNodeById(n.children, id) : n.children,
      }));
  }

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

  return (
    <NodeContext.Provider
      value={{
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
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export const useNodes = () => {
  const ctx = useContext(NodeContext);
  if (!ctx) throw new Error("useNodes must be used inside NodeManager");
  return ctx;
};
