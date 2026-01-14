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
import { getMousePos } from "./utils/mouse";
import { findNewSelectedNode, isInsideNode } from "./editor/hitTest";
import { composeCanvas } from "./canvas/compositor";
import { drawRetriangle } from "./canvas/overlay";
import { createBufferCanvas } from "./canvas/buffer";
import { EditCat } from "./editor/editCat";
import { buildInitialLayers } from "./utils/builtinLayer";
import { downloadPNG, randomize } from "./utils/buildFunctions";
import { NodeSelector } from "./nodeSelecter";
import { NodePropery } from "./editor/nodeProperties";
import { useNodes } from "./nodeProvider";
import { SelectParent } from "./resusables/selectParent";

export function CatCreator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [layers, setLayers] = useState<Layers>(buildInitialLayers);
  const [stroke, setStroke] = useState<number>(0);
  const bufferRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const { nodes, selected, selectNode, updateNode, addNode, removeNode } =
    useNodes();

  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    bufferRef.current = createBufferCanvas(1400, 1300);
  }, []);

  const menuOrder = useMemo(() => DRAW_ORDER, []);

  useEffect(() => {
    if (!dragging)
      composeCanvas(
        canvasRef.current!,
        bufferRef.current!,
        layers,
        // stroke,
        nodes
      );
  }, [layers, stroke, nodes, dragging]);

  useEffect(() => {
    if (!overlayRef.current) return;
    drawRetriangle(overlayRef.current, nodes, selected);
  }, [nodes, selected]);

  const selectedNode = nodes.find((node) => node.id === selected);

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
                onMouseDown={(e) => {
                  if (!canvasRef.current) return;

                  const pos = getMousePos(e, canvasRef.current);

                  let node = findNewSelectedNode(nodes, pos.x, pos.y);

                  if (!node) return;

                  selectNode(node.id);

                  setDragging(true);

                  dragOffset.current = {
                    x: pos.x - node.position.x,
                    y: pos.y - node.position.y,
                  };
                }}
                onMouseMove={(e) => {
                  if (!canvasRef.current || !dragging || !selected) return;

                  const pos = getMousePos(e, canvasRef.current);

                  updateNode(selected, (n) => ({
                    ...n,
                    position: {
                      x: pos.x - dragOffset.current.x,
                      y: pos.y - dragOffset.current.y,
                    },
                  }));
                }}
                onMouseUp={() => setDragging(false)}
                onMouseLeave={() => setDragging(false)}
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
              {selected && selectedNode && (
                <div className="space-y-4">
                  <NodePropery key={"FML"} />
                  {selected == "cat" && (
                    <EditCat
                      stroke={stroke}
                      setStroke={setStroke}
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
