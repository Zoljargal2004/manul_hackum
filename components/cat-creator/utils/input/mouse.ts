import { RefObject } from "react";
import { findNewSelectedNode, getResizeHandle } from "../../editor/hitTest";
import { ResizeHandle } from "../../editor/hitTest";
import { Node } from "../../cat-creator-types";
import { searchNode } from "../node/search";

export function getMousePos(
  e: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement
) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height),
  };
}

export const mouseDown = (
  e: React.MouseEvent<HTMLCanvasElement>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  selectNode: (id: string) => void,
  dragOffset: RefObject<{ x: number; y: number }>,
  nodes: Node[],
  setDragging: React.Dispatch<React.SetStateAction<boolean>>,
  dragStartNodes: RefObject<Node[] | null>,
  selected: string | null,
  resizeHandle: RefObject<ResizeHandle>,
  resizeStart: RefObject<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>
) => {
  if (!canvasRef.current) return;

  const pos = getMousePos(e, canvasRef.current);

  if (selected) {
    const handle = getResizeHandle(nodes, pos.x, pos.y, selected);
    if (handle) {
      const node = searchNode(nodes, selected);
      if (node) {
        resizeHandle.current = handle;
        resizeStart.current = {
          width: node.scale.width,
          height: node.scale.height,
          x: pos.x,
          y: pos.y,
        };
        setDragging(true);
        dragStartNodes.current = nodes;
        return;
      }
    }
  }

  // Otherwise check for node selection/dragging
  let node = findNewSelectedNode(nodes, pos.x, pos.y);
  if (!node) {
    resizeHandle.current = null;
    return;
  }

  selectNode(node.id);
  setDragging(true);
  resizeHandle.current = null;

  dragStartNodes.current = nodes;

  dragOffset.current = {
    x: pos.x - node.position.x,
    y: pos.y - node.position.y,
  };
};
export const mouseMove = (
  e: React.MouseEvent<HTMLCanvasElement>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  dragOffset: RefObject<{ x: number; y: number }>,
  dragging: boolean,
  selected: string | null,
  updateNodeRaw: (id: string, updater: (n: Node) => Node) => void,
  resizeHandle: RefObject<ResizeHandle>,
  resizeStart: RefObject<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>
) => {
  if (!canvasRef.current || !dragging || !selected) return;

  const pos = getMousePos(e, canvasRef.current);

  if (resizeHandle.current && resizeStart.current) {
    console.log(pos, resizeStart.current)
    const deltaX = pos.x - resizeStart.current.x;
    const deltaY = pos.y - resizeStart.current.y;

    let newWidth = resizeStart.current.width;
    let newHeight = resizeStart.current.height;

    switch (resizeHandle.current) {
      case "s":
        newHeight = resizeStart.current.height + deltaY;
        break;
      case "e":
        newWidth = resizeStart.current.width + deltaX;
        break;
      case "se": // south east bb
        newWidth = resizeStart.current.width + deltaX;
        newHeight = resizeStart.current.height + deltaY;
        break;
    }

    newWidth = Math.max(10, newWidth);
    newHeight = Math.max(10, newHeight);

    updateNodeRaw(selected, (n: any) => ({
      ...n,
      scale: {
        width: newWidth,
        height: newHeight,
      },
    }));
    return;
  }

  // Handle dragging
  updateNodeRaw(selected, (n: Node) => ({
    ...n,
    position: {
      x: pos.x - dragOffset.current.x,
      y: pos.y - dragOffset.current.y,
    },
  }));
};

export const mouseUp = (
  setDragging: React.Dispatch<React.SetStateAction<boolean>>,
  dragStartNodes: RefObject<Node[] | null>,
  dragging: boolean,
  updateNode: (id: string, updater: (n: Node) => Node) => void,
  selected: string | null,
  resizeHandle: RefObject<ResizeHandle>
) => {
  if (dragging && dragStartNodes.current) {
    updateNode(selected!, (n: any) => n);
  }

  dragStartNodes.current = null;
  resizeHandle.current = null;
  setDragging(false);
};
