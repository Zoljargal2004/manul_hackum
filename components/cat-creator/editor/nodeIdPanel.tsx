import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Foldable } from "./editCat";
import { FieldLabel, Section } from "./nodeProperties";

export function NodeIdPanel({
  id,
  updateNode,
}: {
  id: string;
  updateNode: any;
}) {
  const [newId, setNewId] = useState(id);

  return (
    <Foldable title="ID">
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
