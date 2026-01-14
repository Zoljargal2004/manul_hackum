"use client";

import { useEffect } from "react";
import { useNodes } from "../nodeProvider";
import { composeCanvas } from "../canvas/compositor";

export function KeyboardShortcuts() {
  const { selected, removeNode, undo, redo } = useNodes();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        if (!selected) return;
        e.preventDefault();
        removeNode(selected);
      }

      // Redo: Ctrl/Cmd + Shift + Z
      else if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "z"
      ) {
        e.preventDefault();
        redo();
      }

      // Undo: Ctrl/Cmd + Z
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, removeNode]);

  return null; // invisible logic-only component
}
