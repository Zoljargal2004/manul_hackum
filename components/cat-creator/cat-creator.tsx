"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BASE_SRC,
  DRAW_ORDER,
  Layers,
  Node,
  PartKey,
  PARTS,
} from "./cat-creator-types";
import {
  getMousePos,
  mouseDown,
  mouseMove,
  mouseUp,
} from "./utils/input/mouse";
import { ResizeHandle, getResizeHandle } from "./editor/hitTest";
import { findNewSelectedNode, isInsideNode } from "./editor/hitTest";
import { composeCanvas } from "./utils/canvas/compositor";
import { drawRetriangle } from "./utils/canvas/overlay";
import { createBufferCanvas } from "./utils/canvas/buffer";
import { EditCat } from "./editor/editCat";
import { buildInitialLayers } from "./utils/layer/initial";
import { downloadPNG } from "./utils/file/download";
import { randomize } from "./utils/layer/randomize";
import { searchNode } from "./utils/node/search";
import { NodeSelector } from "./nodeSelector";
import { NodeProperty } from "./editor/nodeProperties";
import { useNodes } from "./nodeProvider";
import { SelectParent } from "./reusables/property-menu-items";

export function CatCreator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [layers, setLayers] = useState<Layers>(buildInitialLayers);
  const bufferRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const {
    nodes,
    selected,
    selectNode,
    updateNode,
    addNode,
    removeNode,
    updateNodeRaw,
  } = useNodes();
  const dragStartNodes = useRef<Node[] | null>(null);

  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeHandle = useRef<ResizeHandle>(null);
  const resizeStart = useRef<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    bufferRef.current = createBufferCanvas(1400, 1300);
  }, []);

  const menuOrder = useMemo(() => DRAW_ORDER, []);

  useEffect(() => {
    if (!dragging)
      composeCanvas(canvasRef.current!, bufferRef.current!, layers, nodes);
  }, [layers, nodes, dragging]);

  useEffect(() => {
    if (!overlayRef.current) return;
    drawRetriangle(overlayRef.current, nodes, selected);
  }, [nodes, selected]);

  const setLayer = (key: PartKey, value: string | null) =>
    setLayers((p) => ({ ...p, [key]: value }));

  return (
    <section className="min-h-screen py-16 px-4">
      <div className=" mx-auto gap-8">
        <div className="p-6 w-full">
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => {
                randomize(setLayers);
              }}
              className="border px-3 py-2 rounded"
            >
              🎲 Random
            </button>
            <button
              onClick={() => {
                downloadPNG(canvasRef);
              }}
              className="border px-3 py-2 rounded"
            >
              ⬇ Download
            </button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={1400}
                height={1300}
                className="w-full border rounded block"
                onMouseDown={(e) =>
                  mouseDown(
                    e,
                    canvasRef,
                    selectNode,
                    dragOffset,
                    nodes,
                    setDragging,
                    dragStartNodes,
                    selected,
                    resizeHandle,
                    resizeStart
                  )
                }
                onMouseMove={(e) => {
                  // console.log(dragging, selected, canvasRef.current)
                  if (!dragging && selected && canvasRef.current) {
                    const pos = getMousePos(e, canvasRef.current);
                    const handle = getResizeHandle(
                      nodes,
                      pos.x,
                      pos.y,
                      selected
                    );
                    if (handle) {
                      const cursors: Record<
                        NonNullable<ResizeHandle>,
                        string
                      > = {
                        se: "se-resize",
                        s: "s-resize",
                        e: "e-resize",
                      };
                      canvasRef.current.style.cursor =
                        cursors[handle] || "auto";
                    } else {
                      canvasRef.current.style.cursor = "default";
                    }
                  }

                  mouseMove(
                    e,
                    canvasRef,
                    dragOffset,
                    dragging,
                    selected,
                    updateNodeRaw,
                    resizeHandle,
                    resizeStart
                  );
                }}
                onMouseUp={() => {
                  mouseUp(
                    setDragging,
                    dragStartNodes,
                    dragging,
                    updateNode,
                    selected,
                    resizeHandle
                  );
                }}
              />

              <canvas
                ref={overlayRef}
                width={1400}
                height={1300}
                className="w-full absolute top-0 left-0 pointer-events-none"
              />
            </div>
            <div className="flex flex-col gap-4">
              <NodeSelector />
              {selected && (
                <div className="space-y-4">
                  <NodeProperty key={"FML"} />
                  {selected == "cat" && (
                    <EditCat
                      menuOrder={menuOrder}
                      layers={layers}
                      setLayer={setLayer}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
