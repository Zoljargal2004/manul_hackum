"use client";

import { createContext, useContext, useState } from "react";
import { Node } from "./cat-creator-types";

type NodeContextType = {
  nodes: Node[];
  selected: string | null;
  selectNode: (id: string | null) => void;
  updateNode: (id: string, updater: (n: Node) => Node) => void;
  addNode: (node: Node) => void;
  removeNode: (id: string) => void;
  adoptNode: (parentid: string, child: Node) => void;
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
    {
      id: "cat2",
      position: { x: 300, y: 100 },
      scale: { width: 700, height: 650 },
      rotation: 0,
      parent: null,
    },
  ]);

  console.log(nodes);

  const [selected, setSelected] = useState<string | null>("cat");

  const selectNode = (id: string | null) => {
    setSelected(id);
  };

  const updateNode = (id: string, updater: (n: Node) => Node) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? updater(n) : n)));
  };

  const addNode = (node: Node) => {
    setNodes((prev) => [...prev, node]);
  };

  const removeNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setSelected((s) => (s === id ? null : s));
  };

  const adoptNode = (parentId: string, child: Node) => {
    setNodes((prev) => {
      const insert = (nodes: Node[]): Node[] =>
        nodes.map((node) => {
          if (node.id === parentId) {
            return {
              ...node,
              children: node.children ? [...node.children, child] : [child],
            };
          }

          if (node.children) {
            return {
              ...node,
              children: insert(node.children),
            };
          }

          return node;
        });

      return insert(prev);
    });
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
