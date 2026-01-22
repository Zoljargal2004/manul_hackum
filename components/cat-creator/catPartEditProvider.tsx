"use client";

import { createContext, useContext, useState } from "react";
import { DRAW_ORDER, PartKey, PARTS } from "./cat-creator-types";
import { Button } from "../ui/button";

const CatContext = createContext<{ selectedCatPart: PartKey | null }>({
  selectedCatPart: null,
});

export const CatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCatPart, setSelectedCatpart] = useState<PartKey>("fang");
  return (
    <CatContext.Provider value={{ selectedCatPart }}>
      <PartSelector selectPart={setSelectedCatpart} />
      {children}
    </CatContext.Provider>
  );
};

const PartSelector = ({
  selectPart,
}: {
  selectPart: (partke: PartKey) => void;
}) => {
  return (
    <div className="fixed bottom-2 flex justify-center-safe z-50 w-[90%] gap-4 overflow-x-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {DRAW_ORDER.map((part) => (
        <Button
          onClick={() => selectPart(part)}
          //   variant={"ghost"}
          key={`side` + part}
        >
          {PARTS[part].label}
        </Button>
      ))}
    </div>
  );
};

export const useCatParts = () => {
  return useContext(CatContext);
};
