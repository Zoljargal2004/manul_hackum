"use client";

import { useEffect } from "react";
import { useNodes } from "../nodeProvider";
import { composeCanvas } from "../utils/canvas/compositor";

export function KeyboardShortcuts() {
  const { selected, removeNode, undo, redo } = useNodes();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        if (!selected) return;
        e.preventDefault();
        removeNode(selected);
      }

      else if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "z"
      ) {
        e.preventDefault();
        redo();
      }

      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, removeNode]);

  return null; 
}
