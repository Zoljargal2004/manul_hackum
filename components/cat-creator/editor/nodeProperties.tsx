import { useState } from "react";
import { Foldable } from "./editCat";
import { useNodes } from "../nodeProvider";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchNode } from "../utils/node/search";
import { NodeOrderEditor } from "../reusables/property-menu-items";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  ChevronsUpDownIcon,
  CheckIcon,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { NodeIdPanel } from "./nodeIdPanel";
import { TextPanel } from "./textpanel";
import { TransformPanel } from "./transformPanel";

export const NodeProperty = () => {
  const { nodes, selected, updateNode, selectNode, moveNode } = useNodes();
  if (!selected) return;
  const node = searchNode(nodes, selected);
  if (!node) return;
  return (
    <div className="flex flex-col gap-4">
      <NodeIdPanel id={node.id} updateNode={updateNode} />

      <TextPanel node={node} updateNode={updateNode} />

      <TransformPanel
        node={node}
        updateNode={updateNode}
        selectNode={selectNode}
        moveNode={moveNode}
      />
    </div>
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
    <div className="rounded-2xl border bg-muted/40 p-4 space-y-4">
      {children}
    </div>
  );
}
