import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Layers, PartKey, PARTS } from "../cat-creator-types";
import { Option } from "./optionEditor";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MoveRight, X } from "lucide-react";

import { FieldLabel } from "./nodeProperties";
import { Button } from "@/components/ui/button";

type EditCatProps = {
  menuOrder: readonly PartKey[];
  layers: Layers;
  setLayer: (key: PartKey, value: string | null) => void;
  selectedCatPart: PartKey;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Foldable = ({
  children,
  title,
  open = false,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  open?: boolean;
}>) => {
  const [folded, setFolded] = useState(!open);

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

export const EditCat = ({
  selectedCatPart,
  menuOrder,
  layers,
  setLayer,
  open,
  setOpen,
}: EditCatProps) => {
  return (
    <>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out bg-card overflow-hidden relative text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm",
          open ? "max-h-96" : "max-h-0 border-0",
        )}
      >
        <Button
          type="button"
          onClick={() => setOpen(false)}
          variant={`ghost`}
          className="absolute right-4 top-4 flex items-center justify-center"
        >
          <X />
        </Button>

        {menuOrder
          .filter((key) => key == selectedCatPart)
          .map((key) => (
            <div key={key} className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <FieldLabel>{PARTS[key].label}</FieldLabel>
              </div>

              <div className="flex gap-3 flex-wrap overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
      </div>
    </>
  );
};
