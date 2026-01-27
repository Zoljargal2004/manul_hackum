import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Foldable } from "./editCat";
import { FieldLabel, Section } from "./nodeProperties";
import { UseTopPanel } from "../top-panel-provider";

export function NodeIdPanel({
  id,
  updateNode,
}: {
  id: string;
  updateNode: any;
}) {
  const { open, setOpen } = UseTopPanel();

  const [newId, setNewId] = useState(id);
  useEffect(() => setNewId(id), [id]);

  return (
    <Foldable
      title="ID"
      open={open === "ID"}
      onClick={() => setOpen((prev) => (prev === "ID" ? null : "ID"))}
    >
      <Section>
        <div className="space-y-2">
          <FieldLabel>Node ID</FieldLabel>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateNode(id, (n: any) => ({ ...n, id: newId }));
            }}
          >
            <Input
              value={newId}
              disabled={id === "cat"}
              onChange={(e) => setNewId(e.target.value)}
              placeholder="node-id"
            />
          </form>
        </div>
      </Section>
    </Foldable>
  );
}
