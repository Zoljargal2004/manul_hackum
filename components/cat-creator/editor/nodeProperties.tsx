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

export const NodeProperty = () => {
  const { nodes, selected, updateNode, selectNode } = useNodes();

  if (!selected) return;

  const node = searchNode(nodes, selected);

  if (!node) {
    return (
      <div className="text-sm text-muted-foreground">Node сонгоогүй байна</div>
    );
  }

  const { scale, position, rotation, children, id, stroke } = node;
  const [newId, setNewId] = useState<string>(id);

  return (
    <div className="flex flex-col gap-4">
      <Foldable title="Node order">
        {/* node order */}
        <NodeOrderEditor />
      </Foldable>
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

      {/* Text - only for text nodes */}
      {node.text !== undefined && (
        <>
          <Foldable title="Text">
            <Input
              value={node.text || ""}
              onChange={(e) => {
                updateNode(id, (n) => ({
                  ...n,
                  text: e.target.value,
                }));
              }}
              placeholder="Enter text..."
            />
          </Foldable>

          <Foldable title="Text Color">
            <div className="flex gap-2 items-center">
              <Input
                type="color"
                value={node.textColor || "#FFF"}
                onChange={(e) => {
                  updateNode(id, (n) => ({
                    ...n,
                    textColor: e.target.value,
                  }));
                }}
                className="w-20 h-10 cursor-pointer"
              />
              <Input
                value={node.textColor || "#FFF"}
                onChange={(e) => {
                  updateNode(id, (n) => ({
                    ...n,
                    textColor: e.target.value,
                  }));
                }}
                placeholder="#FFF"
                className="flex-1"
              />
            </div>
          </Foldable>

          <Foldable title="Font">
            <FontSelect
              value={node.fontFamily || "Arial"}
              onValueChange={(value) => {
                updateNode(id, (n) => ({
                  ...n,
                  fontFamily: value,
                }));
              }}
            />
          </Foldable>

          <Foldable title="Font Style">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={node.fontWeight === "bold" ? "default" : "outline"}
                onClick={() => {
                  updateNode(id, (n) => ({
                    ...n,
                    fontWeight: n.fontWeight === "bold" ? "normal" : "bold",
                  }));
                }}
                className="flex-1"
              >
                <Bold size={16} className="mr-2" />
                Bold
              </Button>
            </div>
          </Foldable>
          <Foldable title="Font Size">
            <div className="flex gap-2">
              <Input
                type="number"
                value={node.fontSize || 40}
                onChange={(e) => {
                  updateNode(id, (n) => ({
                    ...n,
                    fontSize: Number(e.target.value),
                  }));
                }}
              />
            </div>
          </Foldable>

          <Foldable title="Text Alignment">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={node.textAlign === "left" ? "default" : "outline"}
                onClick={() => {
                  updateNode(id, (n) => ({
                    ...n,
                    textAlign: "left",
                  }));
                }}
                className="flex-1"
              >
                <AlignLeft size={16} />
              </Button>
              <Button
                type="button"
                variant={
                  node.textAlign === "center" || !node.textAlign
                    ? "default"
                    : "outline"
                }
                onClick={() => {
                  updateNode(id, (n) => ({
                    ...n,
                    textAlign: "center",
                  }));
                }}
                className="flex-1"
              >
                <AlignCenter size={16} />
              </Button>
              <Button
                type="button"
                variant={node.textAlign === "right" ? "default" : "outline"}
                onClick={() => {
                  updateNode(id, (n) => ({
                    ...n,
                    textAlign: "right",
                  }));
                }}
                className="flex-1"
              >
                <AlignRight size={16} />
              </Button>
            </div>
          </Foldable>
        </>
      )}

      <Foldable title="Transform">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Label>Position</Label>
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

          <div className="flex flex-col gap-4">
            <Label>Rotation</Label>
            <Slider
              className={cn("w-[60%]")}
              value={[rotation]}
              max={360}
              min={0}
              step={1}
              onValueChange={(value) =>
                updateNode(id, (n) => ({ ...n, rotation: value[0] }))
              }
            />
            <span>{rotation}°</span>
          </div>
          <div className="flex flex-col gap-4">
            <Label>Scale</Label>

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

          <div className="flex gap-3">
            <Label>Хүрээ</Label>
            <Slider
              className={cn("w-[60%]")}
              value={[stroke ?? 0]}
              max={25}
              min={0}
              step={1}
              onValueChange={(value) =>
                updateNode(id, (n) => ({
                  ...n,
                  stroke: value[0],
                }))
              }
            />
            <span>{stroke ?? 0}px</span>
          </div>

          <Label>Хүүхэд</Label>
          {children?.length ? (
            children.map((c) => (
              <div
                onClick={() => selectNode(c.id)}
                className="w-full border-[1] p-4 rounded-xl"
                key={c.id}
              >
                {c.id}
              </div>
            ))
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

const FONTS = [
  "Arial",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Verdana",
  "Trebuchet MS",
  "Impact",
  "Comic Sans MS",
  "Helvetica",
  "Tahoma",
  "Lucida Console",
  "Palatino",
  "Garamond",
  "Bookman",
  "Courier",
  "Monaco",
  "Menlo",
  "Consolas",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Ubuntu",
];

function FontSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select font..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search font..." />
          <CommandList>
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup>
              {FONTS.map((font) => (
                <CommandItem
                  key={font}
                  value={font}
                  onSelect={() => {
                    onValueChange(font);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === font ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span style={{ fontFamily: font }}>{font}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
