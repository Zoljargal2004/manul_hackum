"use client";

import { useEffect } from "react";
import { useNodes } from "../nodeProvider";
import { composeCanvas } from "../utils/canvas/compositor";
import { searchNode } from "../utils/node/search";

export function KeyboardShortcuts() {
  const { selected, removeNode, undo, redo, nodes, addNode, adoptNode, setToggleRation } =
    useNodes();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        if (!selected) return;
        e.preventDefault();
        removeNode(selected);
      }
      else if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        const node = searchNode(nodes, selected);
        if (!node) return;
        if(node.id === "cat") return
        let number = 0;
        const duplicateNode = (num: number) => {
          num = Number(num + 1);
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
      } else if(e.key ==="Shift"){
        setToggleRation(true)
        return
      }

    };

    const onKeyUp = (e: KeyboardEvent) => {
      if(e.key ==="Shift"){
        setToggleRation(false)
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {window.removeEventListener("keydown", onKeyDown)};
  }, [selected, removeNode]);

  return null;
}
