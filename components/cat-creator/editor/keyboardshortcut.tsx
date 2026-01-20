"use client";

import { useEffect } from "react";
import { useNodes } from "../nodeProvider";
import { composeCanvas } from "../utils/canvas/compositor";
import { searchNode } from "../utils/node/search";

export function KeyboardShortcuts() {
  const { selected, removeNode, undo, redo, nodes, addNode, adoptNode } =
    useNodes();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        if (!selected) return;
        e.preventDefault();
        removeNode(selected);
      }
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        const node = searchNode(nodes, selected);
        if (!node) return;
        let number = 0;
        const duplicateNode = (num: number) => {
          num++;
          const searchy = searchNode(nodes, `${node.id} ${num}`);
          if (!searchy) {
            if (!node.parent) addNode({ ...node, id: `${node.id} ${num}` });
            else adoptNode(node.parent, { ...node, id: `${node.id} ${num}` });
          } else {
            duplicateNode(num);
          }
          return;
        };
        duplicateNode(number);
      } else if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "z"
      ) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, removeNode]);

  return null;
}
