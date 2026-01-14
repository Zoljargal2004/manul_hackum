import { useState } from "react";
import { Foldable } from "./editCat";
import { useNodes } from "../nodeProvider";
import { Input } from "@/components/ui/input";

export const NodePropery = () => {
  const { nodes, selected, updateNode } = useNodes();

  const node = nodes.find((n) => n.id === selected);

  if (!node) {
    return <div className="text-sm text-muted-foreground">Node сонгоогүй байна</div>;
  }

  const { scale, position, rotation, children, id } = node;
  const [newId, setNewId] = useState<string>(id);

  return (
    <div className="flex flex-col gap-4">
      <Foldable title="ID">
        <form
          className="flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            updateNode(id, (n) => ({ ...n, id: newId }));
          }}
        >
          <Input
            value={newId}
            disabled={id === "cat"}
            onChange={(e) => setNewId(e.target.value)}
          />
        </form>
      </Foldable>

      <Foldable title="Position">
        <div className="flex gap-4">
          <Input
            type="number"
            value={position.x}
            onChange={(e) => {
              const x = Number(e.target.value);
              updateNode(id, (n) => ({
                ...n,
                position: { ...n.position, x },
              }));
            }}
          />

          <Input
            type="number"
            value={position.y}
            onChange={(e) => {
              const y = Number(e.target.value);
              updateNode(id, (n) => ({
                ...n,
                position: { ...n.position, y },
              }));
            }}
          />
        </div>
      </Foldable>

      {/* Rotation */}
      <Foldable title="Rotation">
        <Input
          type="number"
          value={rotation}
          onChange={(e) => {
            const r = Number(e.target.value);
            updateNode(id, (n) => ({ ...n, rotation: r }));
          }}
        />
      </Foldable>

      {/* Scale */}
      <Foldable title="Scale">
        <div className="flex gap-4">
          <Input
            type="number"
            value={scale.width}
            onChange={(e) => {
              const w = Number(e.target.value);
              updateNode(id, (n) => ({
                ...n,
                scale: { ...n.scale, width: w },
              }));
            }}
          />

          <Input
            type="number"
            value={scale.height}
            onChange={(e) => {
              const h = Number(e.target.value);
              updateNode(id, (n) => ({
                ...n,
                scale: { ...n.scale, height: h },
              }));
            }}
          />
        </div>
      </Foldable>

      {/* Children */}
      <Foldable title="Хүүхэд">
        <div className="w-full flex flex-col gap-4">
          {children?.length ? (
            children.map((c) => <div key={c.id}>{c.id}</div>)
          ) : (
            <div className="text-center text-muted-foreground">
              Хүүхэд элемент байхгүй
            </div>
          )}
        </div>
      </Foldable>
    </div>
  );
};
