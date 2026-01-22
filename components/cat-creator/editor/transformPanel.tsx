import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Foldable } from "./editCat";
import { FieldLabel, Section } from "./nodeProperties";
import { NumberPair } from "./nodePair";
import { StrokeControl } from "./strokePanel";
import { ChildrenList } from "./childrenList";
import { Checkbox } from "@/components/ui/checkbox";
import { Node } from "../cat-creator-types";
import { useNodes } from "../nodeProvider";
import { searchNode } from "../utils/node/search";

export function TransformPanel({
  node,
  updateNode,
  selectNode,
  moveNode,
}: any) {
  const { id, position, rotation, scale, stroke, children, flip } = node;
  const { removeNode, addNode, adoptNode, nodes } = useNodes();

  return (
    <Foldable title="Transform">
      <Section>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={() => moveNode(id, "up")}>⬆ Up</Button>
            <Button onClick={() => moveNode(id, "down")}>⬇ Down</Button>
          </div>
          <div className="space-y-2 ">
            <FieldLabel>Flip</FieldLabel>
            <Checkbox
              checked={!!flip}
              className="size-8"
              onCheckedChange={(e) =>
                updateNode(id, (n: Node) => ({
                  ...n,
                  flip: e,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <FieldLabel>Position</FieldLabel>
            <NumberPair
              a={position.x}
              b={position.y}
              aLabel="X"
              bLabel="Y"
              onAChange={(x) =>
                updateNode(id, (n: any) => ({
                  ...n,
                  position: { ...n.position, x },
                }))
              }
              onBChange={(y) =>
                updateNode(id, (n: any) => ({
                  ...n,
                  position: { ...n.position, y },
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <FieldLabel>Rotation</FieldLabel>
            <Input
              type="number"
              value={rotation}
              onChange={(e) =>
                updateNode(id, (n: any) => ({
                  ...n,
                  rotation: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <FieldLabel>Scale</FieldLabel>
            <NumberPair
              a={scale.width}
              b={scale.height}
              aLabel="W"
              bLabel="H"
              onAChange={(width) =>
                updateNode(id, (n: any) => ({
                  ...n,
                  scale: { ...n.scale, width },
                }))
              }
              onBChange={(height) =>
                updateNode(id, (n: any) => ({
                  ...n,
                  scale: { ...n.scale, height },
                }))
              }
            />
          </div>

          {/* <div className="space-y-2">
            <FieldLabel>Stroke</FieldLabel>
            <StrokeControl
              value={stroke ?? 0}
              onChange={(v) =>
                updateNode(id, (n: any) => ({ ...n, stroke: v }))
              }
            />
          </div> */}

          <div className="space-y-2">
            <FieldLabel>Children</FieldLabel>
            <ChildrenList
              childrenNodes={children || []}
              onSelect={selectNode}
            />
          </div>
          {node.id !== "cat" && (
            <div className="space-y-2">
              <FieldLabel>Node</FieldLabel>
              <div className="flex w-full justify-between">
                <Button
                  onClick={() => {
                    const duplicateNode = (num: number) => {
                      num = Number(num + 1);
                      const searchy = searchNode(nodes, `${node.id} ${num}`);
                      if (!searchy) {
                        if (!node.parent)
                          addNode({ ...node, id: `${node.id} ${num}` });
                        else
                          adoptNode(node.parent, {
                            ...node,
                            id: `${node.id} ${num}`,
                          });
                      } else {
                        duplicateNode(num);
                      }
                      return;
                    };
                  }}
                >
                  Хуулбарлах
                </Button>
                <Button
                  onClick={() => {
                    removeNode(node.id);
                  }}
                  variant={`destructive`}
                >
                  Устгах
                </Button>
              </div>
            </div>
          )}
        </div>
      </Section>
    </Foldable>
  );
}
