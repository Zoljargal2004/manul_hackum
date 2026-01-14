"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Link, Lock } from "lucide-react";
import { useNodes } from "./nodeProvider";
import { SelectParent } from "./resusables/selectParent";
import { Node } from "./cat-creator-types";

export const NodeSelector = () => {
  const { nodes, selected, selectNode } = useNodes();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-2 flex-wrap">
        {nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => selectNode(node.id)}
            className={cn(
              "rounded-xl border px-4 py-1 text-sm hover:bg-slate-800 transition",
              selected === node.id && "bg-slate-900"
            )}
          >
            {node.id}
          </button>
        ))}

        <DialogTrigger className="rounded-xl border px-3 hover:bg-slate-800">
          +
        </DialogTrigger>

        <NodeCreator onDone={() => setOpen(false)} />
      </div>
    </Dialog>
  );
};

const NodeCreator = ({ onDone }: { onDone: () => void }) => {
  const { addNode, selected, nodes, adoptNode } = useNodes();

  const [id, setId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [scale, setScale] = useState({ width: 0, height: 0 });
  const [imageRatio, setImageRatio] = useState(1);

  const [parent, setParent] = useState<string | null>(selected);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      setScale({ width: img.width, height: img.height });
      setImageRatio(img.height / img.width);
    };
    img.src = url;

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleAddNode = async () => {
    if (!id.trim() || !file) return;

    const img = new Image();
    img.src = previewUrl!;
    await img.decode();

    const new_node: Node = {
      id,
      src: img,
      scale,
      rotation: 0,
      position: { x: 100, y: 100 },
      parent
    }

  
    if(parent) {
      adoptNode(parent, new_node)
    }
    else{
      addNode(new_node)
    }

    setId("");
    setFile(null);
    onDone();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Node үүсгэх</DialogTitle>
        <DialogDescription>Шинэ элемент нэмэх</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        {/* ID */}
        <div className="flex flex-col gap-2">
          <Label>ID</Label>
          <Input
            placeholder="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Эцэг элемент</Label>
          <SelectParent onChange={setParent} />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <Label>Зураг</Label>

          <input
            id="new_node_img"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setFile(f);
            }}
          />

          <label
            htmlFor="new_node_img"
            className="w-full min-h-24 border rounded-xl flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {!previewUrl ? (
              <span className="text-2xl text-muted-foreground">+</span>
            ) : (
              <img
                src={previewUrl}
                alt="preview"
                className="max-h-40 object-contain"
              />
            )}
          </label>
        </div>

        {/* Size */}
        <ImageSizeControl
          scale={scale}
          setScale={setScale}
          ratio={imageRatio}
        />

        <Button onClick={handleAddNode}>Нэмэх</Button>
      </div>
    </DialogContent>
  );
};

const ImageSizeControl = ({
  scale,
  setScale,
  ratio,
}: {
  scale: { width: number; height: number };
  setScale: (v: { width: number; height: number }) => void;
  ratio: number;
}) => {
  const [lock, setLock] = useState(false);
  const [w, setW] = useState("0");
  const [h, setH] = useState("0");

  useEffect(() => {
    setW(String(scale.width));
    setH(String(scale.height));
  }, [scale.width, scale.height]);

  const changeW = (v: string) => {
    setW(v);
    if (v === "") return;
    const n = Number(v);
    if (isNaN(n)) return;

    if (lock) {
      const nh = Math.round(n * ratio);
      setH(String(nh));
      setScale({ width: n, height: nh });
    } else {
      setScale({ ...scale, width: n });
    }
  };

  const changeH = (v: string) => {
    setH(v);
    if (v === "") return;
    const n = Number(v);
    if (isNaN(n)) return;

    if (lock) {
      const nw = Math.round(n / ratio);
      setW(String(nw));
      setScale({ width: nw, height: n });
    } else {
      setScale({ ...scale, height: n });
    }
  };

  return (
    <div className="space-y-2">
      <Label className="font-semibold text-sm">Хэмжээ</Label>

      <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
        <Input
          value={w}
          type="number"
          onChange={(e) => changeW(e.target.value)}
        />
        <Input
          value={h}
          type="number"
          onChange={(e) => changeH(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setLock((p) => !p)}
          className={cn(
            "h-9 w-9 rounded-md border flex items-center justify-center",
            lock ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          )}
        >
          {lock ? <Link size={16} /> : <Lock size={16} />}
        </button>
      </div>
    </div>
  );
};
