import { useState } from "react";
import { useNodes } from "../nodeProvider";
import { searchNode } from "../utils/node/search";
import { NodeIdPanel } from "./nodeIdPanel";
import { TextPanel } from "./textpanel";
import { TransformPanel } from "./transformPanel";

export const NodeProperty = () => {
  const { nodes, selected, updateNode, selectNode, moveNode } = useNodes();
  if (!selected) return;
  const node = searchNode(nodes, selected);
  if (!node) return;
  return (
    <>
      <NodeIdPanel id={node.id} updateNode={updateNode} />

      <TransformPanel
        node={node}
        updateNode={updateNode}
        selectNode={selectNode}
        moveNode={moveNode}
      />
      
      <TextPanel node={node} updateNode={updateNode} />
    </>
  );
};

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
      {children}
    </p>
  );
}

export function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-background space-y-4 overflow-hidden">
      <div className="bg-card p-4">{children}</div>
    </div>
  );
}
