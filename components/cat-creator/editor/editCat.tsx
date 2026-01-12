import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Layers, PartKey, PARTS } from "../cat-creator-types";
import { Option } from "./optionEditor";

type EditCatProps = {
  stroke: number;
  setStroke: (v: number) => void;
  menuOrder: readonly PartKey[];
  layers: Layers;
  setLayer: (key: PartKey, value: string | null) => void;
};

export const EditCat = ({
  stroke,
  setStroke,
  menuOrder,
  layers,
  setLayer,
}: EditCatProps) => {
  return (
    <>
      <Card className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Background</h3>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Хүрээ</h3>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Slider
            className={cn("w-[60%]")}
            value={[stroke]}
            max={25}
            step={1}
            onValueChange={(value) => setStroke(value[0])}
          />
          <span>{stroke}px</span>
        </div>
      </Card>

      {menuOrder.map((key) => (
        <Card key={key} className="p-4 space-y-3">
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
        </Card>
      ))}
    </>
  );
};
