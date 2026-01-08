"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

type Node = {
  id: string;
  points: Point[];
  fill: string;
  stroke?: string;
};

export default function NodeBasedEdit() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mightyRef = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edit, setEdit] = useState<string | null>(null);

  useEffect(() => {
    draw();
  }, [nodes]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((node) => drawNode(ctx, node));
  };

  const drawNode = (ctx: CanvasRenderingContext2D, node: Node) => {
    if (node.points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(node.points[0].x, node.points[0].y);

    for (let i = 1; i < node.points.length; i++) {
      ctx.lineTo(node.points[i].x, node.points[i].y);
    }

    ctx.closePath();

    ctx.fillStyle = node.fill;
    ctx.fill();

    if (node.stroke) {
      ctx.strokeStyle = node.stroke;
      ctx.stroke();
    }
  };

  return (
    <div className="flex flex-col gap-12 ">
      <div>
        <Button onClick={() => {
            
        }}>O</Button>
      </div>
      <div ref={mightyRef} className="w-[600] overflow-hidden relative">
        <canvas
          ref={canvasRef}
          width={1408}
          height={1304}
          className="w-full aspect-square bg-slate-800"
        />
      </div>
    </div>
  );
}
