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
import {
  IDInput,
  ImageInput,
  NodeNav,
  NodeOrderEditor,
  SelectParent,
} from "./reusables/property-menu-items";
import { Node } from "./cat-creator-types";
import { searchNode } from "./utils/node/search";

export const NodeSelector = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-2 flex-wrap">
        <NodeNav />
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
  const [nodeType, setNodeType] = useState<"image" | "text">("image");
  const [text, setText] = useState("");

  const [scale, setScale] = useState({ width: 200, height: 50 });
  const [imageRatio, setImageRatio] = useState(1);

  const [parent, setParent] = useState<string | null>(selected);

  useEffect(() => {
    setParent(selected);
  }, [selected]);

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
    if (!id.trim()) return;
    
    if (nodeType === "image") {
      if (!file) return;

      const img = new Image();
      img.src = previewUrl!;
      await img.decode();

      const new_node: Node = {
        id,
        src: img,
        scale,
        rotation: 0,
        position: { x: 100, y: 100 },
        parent,
        stroke: 0,
      };

      if (parent) {
        adoptNode(parent, new_node);
      } else {
        addNode(new_node);
      }
    } else {
      // Text node
      const new_node: Node = {
        id,
        text: text || "Text",
        scale,
        rotation: 0,
        position: { x: 100, y: 100 },
        parent,
        stroke: 0,
        textColor: "#000000",
        fontFamily: "Arial",
        fontWeight: "normal",
        textAlign: "center",
      };

      if (parent) {
        adoptNode(parent, new_node);
      } else {
        addNode(new_node);
      }
    }

    setId("");
    setFile(null);
    setText("");
    setScale({ width: 200, height: 50 });
    onDone();
  };

  return (
    <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle>Node үүсгэх</DialogTitle>
        <DialogDescription>Шинэ элемент нэмэх</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        {/* ID */}
        <IDInput id={id} setId={setId} />

        {/* parent */}
        <SelectParent value={parent} onChange={setParent} />

        {/* Node Type */}
        <div className="space-y-2">
          <Label className="font-semibold text-sm">Төрөл</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={nodeType === "image" ? "default" : "outline"}
              onClick={() => setNodeType("image")}
              className="flex-1"
            >
              Зураг
            </Button>
            <Button
              type="button"
              variant={nodeType === "text" ? "default" : "outline"}
              onClick={() => setNodeType("text")}
              className="flex-1"
            >
              Текст
            </Button>
          </div>
        </div>

        {/* image or text */}
        {nodeType === "image" ? (
          <>
            <ImageInput previewUrl={previewUrl} setFile={setFile} />
            <ImageSizeControl
              scale={scale}
              setScale={setScale}
              ratio={imageRatio}
            />
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label className="font-semibold text-sm">Текст</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Текст оруулах..."
              />
            </div>
            <ImageSizeControl
              scale={scale}
              setScale={setScale}
              ratio={1}
            />
          </>
        )}

        <Button
          disabled={
            !id || id === "cat" || id === "root" || searchNode(nodes, id)
              ? true
              : false
          }
          onClick={handleAddNode}
        >
          Нэмэх
        </Button>
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

