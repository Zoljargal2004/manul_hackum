import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Layers, PartKey, PARTS } from "../cat-creator-types";
import { Option } from "./optionEditor";
import { useState } from "react";
import { MoveDown, MoveLeft, MoveRight } from "lucide-react";
import { useNodes } from "../nodeProvider";
import { searchNode } from "../utils/node/search";

type EditCatProps = {
  menuOrder: readonly PartKey[];
  layers: Layers;
  setLayer: (key: PartKey, value: string | null) => void;
};

export const Foldable = ({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) => {
  const [folded, setFolded] = useState(true);

  return (
    <Card
      className={`px-8 py-4 transition-all duration-300 flex flex-col ${
        folded ? "gap-0" : "gap-4"
      }`}
    >
      <button
        onClick={() => setFolded((p) => !p)}
        className="flex w-full justify-between items-center"
      >
        <span className="font-semibold">{title}</span>
        {
          <MoveRight
            className={cn(
              "transition-all duration-300 stroke-1",
              folded ? `rotate-0` : "rotate-90",
            )}
          />
        }
      </button>

      <div
        className={cn(
          "transition-all duration-300 overflow-hidden",
          folded ? "max-h-0 opacity-0 pointer-events-none" : " opacity-100",
        )}
      >
        <div className="pt-3">{children}</div>
      </div>
    </Card>
  );
};

export const EditCat = ({ menuOrder, layers, setLayer }: EditCatProps) => {
  const { nodes, updateNode } = useNodes();
  const catNode = searchNode(nodes, "cat");
  const stroke = catNode?.stroke ?? 0;

  return (
    <>
      <Card className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Background</h3>
        </div>
      </Card>

      <Foldable title="Catze">
        {menuOrder.map((key) => (
          <div key={key} className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{PARTS[key].label}</h3>
            </div>

            <div className="flex gap-3 flex-wrap">
              {PARTS[key].options.map((file) => (
                <Option
                  key={file}
                  file={file}
                  partKey={key}
                  layers={layers}
                  setLayer={setLayer}
                />
              ))}
            </div>
          </div>
        ))}
      </Foldable>
    </>
  );
};
