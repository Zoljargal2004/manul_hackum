"use client";

import { useEffect, useRef, useState } from "react";
import { Node } from "./cat-creator-types";
import {
  getMousePos,
  mouseDown,
  mouseMove,
  mouseUp,
} from "./utils/input/mouse";
import { ResizeHandle, getResizeHandle } from "./editor/hitTest";
import { composeCanvas } from "./utils/canvas/compositor";
import { drawRetriangle } from "./utils/canvas/overlay";
import { createBufferCanvas } from "./utils/canvas/buffer";
import { downloadPNG } from "./utils/file/download";
import { randomize } from "./utils/layer/randomize";
import { NodeSelector } from "./nodeSelector";
import { NodeProperty } from "./editor/nodeProperties";
import { useNodes } from "./nodeProvider";
import { NodeNav } from "./reusables/property-menu-items";
import { useCatParts } from "./catPartEditProvider";

export function CatCreator() {
  const { setLayers } = useCatParts();
  const { nodes, selected, selectNode, updateNode, updateNodeRaw } = useNodes();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const bufferRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const [dragging, setDragging] = useState(false);

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

  useEffect(() => {
    if (!dragging)
      composeCanvas(canvasRef.current!, bufferRef.current!, nodes, updateNode);
  }, [nodes, dragging]);

  useEffect(() => {
    if (!overlayRef.current) return;
    drawRetriangle(overlayRef.current, nodes, selected);
  }, [nodes, selected]);

  return (
    <section className="py-16 px-4 overflow-hidden">
      
      <div className=" mx-auto gap-8">
        <div className="p-6 w-full relative">
          <div className="flex  whitespace-nowrap items-center gap-3 mb-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <span className="text-2xl">Персона үүсгэх</span>
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
                ⬇ Зураг татах
              </button>
              {selected && <NodeProperty key={"FML"} />}
              <NodeNav />

              <NodeSelector />
          </div>
          <div className="  flex justify-center gap-8 ">
            <div className="w-[90%] md:w-[60%] lg:w-[40%] relative bg-card rounded-2xl border-0">
              <canvas
                ref={canvasRef}
                width={700}
                height={650}
                className="w-full rounded block"
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
                    resizeStart,
                  )
                }
                onMouseMove={(e) => {
                  if (!dragging && selected && canvasRef.current) {
                    const pos = getMousePos(e, canvasRef.current);
                    const handle = getResizeHandle(
                      nodes,
                      pos.x,
                      pos.y,
                      selected,
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
                    resizeStart,
                  );
                }}
                onMouseUp={() => {
                  mouseUp(
                    setDragging,
                    dragStartNodes,
                    dragging,
                    updateNode,
                    selected,
                    resizeHandle,
                  );
                }}
              />

              <canvas
                ref={overlayRef}
                width={700}
                height={650}
                className="w-full absolute inset-0 pointer-events-none z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
