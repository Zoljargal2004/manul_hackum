import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bold, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Foldable } from "./editCat";
import { FieldLabel, Section } from "./nodeProperties";
import { FontSelect } from "./fontSelect";
import { UseTopPanel } from "../top-panel-provider";

export function TextPanel({
  node,
  updateNode,
}: {
  node: any;
  updateNode: any;
}) {
  if (node.text === undefined) return null;
  const { setOpen, open } = UseTopPanel();

  return (
    <>
      <Foldable
        title="Text"
        onClick={() => setOpen((prev) => (prev === "Text" ? null : "Text"))}
        open={open === "Text"}
      >
        <Section>
          <div className="space-y-4">
            <div className="space-y-2">
              <FieldLabel>Text color</FieldLabel>
              <div className="flex gap-2 items-center">
                <Input
                  type="color"
                  value={node.textColor || "#ffffff"}
                  onChange={(e) =>
                    updateNode(node.id, (n: any) => ({
                      ...n,
                      textColor: e.target.value,
                    }))
                  }
                  className="w-16 h-10 cursor-pointer"
                />
                <Input
                  value={node.textColor || "#ffffff"}
                  onChange={(e) =>
                    updateNode(node.id, (n: any) => ({
                      ...n,
                      textColor: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <FieldLabel>Font family</FieldLabel>
              <FontSelect
                value={node.fontFamily || "Arial"}
                onValueChange={(v) =>
                  updateNode(node.id, (n: any) => ({
                    ...n,
                    fontFamily: v,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <FieldLabel>Style</FieldLabel>
              <div className="flex rounded-xl border overflow-hidden">
                <Button
                  type="button"
                  variant={node.fontWeight === "bold" ? "default" : "ghost"}
                  className="flex-1 rounded-none"
                  onClick={() =>
                    updateNode(node.id, (n: any) => ({
                      ...n,
                      fontWeight: n.fontWeight === "bold" ? "normal" : "bold",
                    }))
                  }
                >
                  <Bold size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <FieldLabel>Font size</FieldLabel>
              <Input
                type="number"
                value={node.fontSize || 40}
                onChange={(e) => {
                  if (e.target.value == "") return;

                  updateNode(node.id, (n: any) => ({
                    ...n,
                    fontSize: Number(e.target.value),
                  }));
                }}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel>Alignment</FieldLabel>
              <div className="flex rounded-xl border overflow-hidden">
                <Button
                  type="button"
                  variant={node.textAlign === "left" ? "default" : "ghost"}
                  className="flex-1 rounded-none"
                  onClick={() =>
                    updateNode(node.id, (n: any) => ({
                      ...n,
                      textAlign: "left",
                    }))
                  }
                >
                  <AlignLeft size={16} />
                </Button>

                <Button
                  type="button"
                  variant={
                    node.textAlign === "center" || !node.textAlign
                      ? "default"
                      : "ghost"
                  }
                  className="flex-1 rounded-none"
                  onClick={() =>
                    updateNode(node.id, (n: any) => ({
                      ...n,
                      textAlign: "center",
                    }))
                  }
                >
                  <AlignCenter size={16} />
                </Button>

                <Button
                  type="button"
                  variant={node.textAlign === "right" ? "default" : "ghost"}
                  className="flex-1 rounded-none"
                  onClick={() =>
                    updateNode(node.id, (n: any) => ({
                      ...n,
                      textAlign: "right",
                    }))
                  }
                >
                  <AlignRight size={16} />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <FieldLabel>Text</FieldLabel>

              <Input
                type=""
                value={node.text || ""}
                placeholder="Enter text..."
                onChange={(e) =>
                  updateNode(node.id, (n: any) => ({
                    ...n,
                    text: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </Section>
      </Foldable>
    </>
  );
}
