"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DRAW_ORDER, Layers, PartKey, PARTS } from "./cat-creator-types";
import { Button } from "../ui/button";
import { EditCat } from "./editor/editCat";
import { buildInitialLayers } from "./utils/layer/initial";
import { useNodes } from "./nodeProvider";
import { DrawSpecials } from "./utils/canvas/compositor";

const CatContext = createContext<{
  setLayers: Dispatch<SetStateAction<Layers>>;
} | null>(null);

export const CatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { selectedNode } = useNodes();

  const [selectedCatPart, setSelectedCatpart] = useState<PartKey>("fang");
  const [layers, setLayers] = useState<Layers>(
    selectedNode?.layers || buildInitialLayers(),
  );

  return (
    <CatContext.Provider value={{ setLayers }}>
      <PartSelector
        selectedCatPart={selectedCatPart}
        selectPart={setSelectedCatpart}
        layers={layers}
        setLayers={setLayers}
      />
      {children}
    </CatContext.Provider>
  );
};

const PartSelector = ({
  selectPart,
  layers,
  setLayers,
  selectedCatPart,
}: {
  selectedCatPart: PartKey;
  selectPart: (partke: PartKey) => void;
  layers: Layers;
  setLayers: Dispatch<SetStateAction<Layers>>;
}) => {
  const { updateCat, nodes, updateNode, selected } = useNodes();

  const [open, setOpen] = useState(true);
  const menuOrder = useMemo(() => DRAW_ORDER, []);

  useEffect(() => {
    updateCat(layers);
  }, [layers]);
  useEffect(() => {
    DrawSpecials(nodes, updateNode);
  }, [layers]);

  const setLayer = (key: PartKey, value: string | null) =>
    setLayers((p) => ({ ...p, [key]: value }));
  if(selected !== "cat") return
  return (
    <div className="fixed bottom-2 w-full z-50 flex flex-col gap-2">
      <div className="flex justify-center-safe w-full inset-x-auto gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {DRAW_ORDER.map((part) => (
          <Button
            onClick={() => {
              selectPart(part);
              setOpen(true);
            }}
            //   variant={"ghost"}
            key={`side` + part}
          >
            {PARTS[part].label}
          </Button>
        ))}
      </div>
      <EditCat
        selectedCatPart={selectedCatPart}
        layers={layers}
        menuOrder={menuOrder}
        setLayer={setLayer}
        open={open}
        setOpen={setOpen}
        key={"edit cat"}
      />
    </div>
  );
};

export function useCatParts() {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCatParts must be used within a CatProvider");
  }
  return context;
}
