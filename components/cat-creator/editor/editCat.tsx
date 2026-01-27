import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Layers, PartKey, PARTS } from "../cat-creator-types";
import { Option } from "./optionEditor";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MoveRight, X } from "lucide-react";

import { FieldLabel } from "./nodeProperties";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

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
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <Card
          className={`px-3 py-2 transition-all duration-300 flex flex-col`}
        >
          <span className={`font-semibold`}>
            {title}
          </span>
        </Card>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full z-50 mt-4">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
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
