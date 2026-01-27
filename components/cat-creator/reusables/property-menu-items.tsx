"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { getAllNodesNames } from "../utils/node/search";
import { useNodes } from "../nodeProvider";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

const PopoverContentNoPortal = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "start", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={className}
    {...props}
  />
));
PopoverContentNoPortal.displayName = "PopoverContentNoPortal";

export function SelectParent({
  value,
  onChange,
}: {
  value: string | null;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { nodes } = useNodes();

  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<string>("");

  React.useEffect(() => {
    setInternal("__root__");
  }, [value]);

  const ROOT = "__root__";

  

  const parents = getAllNodesNames(nodes).filter(nodeName => nodeName !== "cat").map((id) => ({
    label: id,
    value: id,
  }));
  parents.push({ label: "root", value: ROOT });


  return (
    <div className="flex flex-col gap-2">
      <Label>Эцэг элемент</Label>
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-between hover:text-white">
            {parents.find((p) => p.value === internal)?.label ||
              "Select parent"}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContentNoPortal className="p-0">
          <Command>
            <CommandInput placeholder="Search parent..." />
            <CommandList>
              <CommandEmpty>No parent found.</CommandEmpty>
              <CommandGroup>
                {parents.map((parent) => (
                  <CommandItem
                    key={parent.value}
                    value={parent.value}
                    onSelect={(v) => {
                      setInternal(v);
                      setOpen(false);
                      onChange(v === ROOT ? null : v);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        internal === parent.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {parent.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContentNoPortal>
      </Popover>
    </div>
  );
}
export const NodeNav = () => {
  const { nodes } = useNodes();
  return (
    <>
      {getAllNodesNames(nodes).map((node) => (
        <NodeButon key={node} node={node} />
      ))}
    </>
  );
};

const NodeButon = ({ node }: { node: string }) => {
  const { selectNode, selected } = useNodes();
  return (
    <button
      onClick={() => selectNode(node)}
      className={cn(
        "rounded-xl border px-4 py-1 text-sm hover:bg-slate-800 transition",
        selected === node && "bg-slate-900"
      )}
    >
      {node}
    </button>
  );
};

export const ImageInput = ({
  setFile,
  previewUrl,
}: {
  setFile: (file: File) => void;
  previewUrl: string | null;
}) => {
  return (
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
  );
};

export const IDInput = ({
  id,
  setId,
}: {
  id: string;
  setId: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>ID</Label>
      <Input
        placeholder="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
    </div>
  );
};

export const NodeOrderEditor = () => {
  const { moveNode, selected } = useNodes();

  if (!selected) return null;

  return (
    <div className="flex gap-2">
      <Button onClick={() => moveNode(selected, "up")}>⬆ Up</Button>
      <Button onClick={() => moveNode(selected, "down")}>⬇ Down</Button>
    </div>
  );
};

