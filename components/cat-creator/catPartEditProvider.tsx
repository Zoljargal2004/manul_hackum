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
import { Option } from "./editor/optionEditor";
import { FieldLabel } from "./editor/nodeProperties";

const CatContext = createContext<{
  setLayers: Dispatch<SetStateAction<Layers>>;
} | null>(null);

export const CatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { selectedNode } = useNodes();

  const [selectedCatPart, setSelectedCatpart] = useState<PartKey>("cloth");
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
  if (selected !== "cat") return;
  return (
    <>
      <div className="hidden   lg:flex fixed left-8 z-50 h-full items-center">
        <div className="h-80% bg-card flex flex-col gap-4 rounded-xl border shadow-sm py-4 px-2">
          {DRAW_ORDER.map((part) => (
            <Button
              onClick={() => {
                selectPart(part);
                setOpen(true);
              }}
              variant={"ghost"}
              className={`border ${part === selectedCatPart && "border-accent"}`}
              key={`side` + part}
            >
              {PARTS[part].label}
            </Button>
          ))}
        </div>
      </div>
      <div className="hidden  lg:flex fixed right-8 z-50 h-full items-center">
        <div className="h-[80%] bg-card  flex flex-col gap-4 rounded-xl border shadow-sm">
          {menuOrder
            .filter((key) => key == selectedCatPart)
            .map((key) => (
              <div key={key} className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <FieldLabel>{PARTS[key].label}</FieldLabel>
                </div>

                <div className="flex gap-3 flex-wrap flex-col overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
      </div>
      <div className="lg:hidden fixed bottom-2 w-full z-50 flex flex-col gap-2">
        <div className="flex  justify-center-safe w-full inset-x-auto gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {DRAW_ORDER.map((part) => (
            <Button
              onClick={() => {
                selectPart(part);
                setOpen(true);
              }}
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
    </>
  );
};

export function useCatParts() {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCatParts must be used within a CatProvider");
  }
  return context;
}
