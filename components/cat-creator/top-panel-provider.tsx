import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNodes } from "./nodeProvider";

type TopPanelState = "ID" | "Text" | "Transform" | null;

const TopPanelContext = createContext<{
  open: "ID" | "Text" | "Transform" | null;
  setOpen: React.Dispatch<React.SetStateAction<TopPanelState>>;
} | null>(null);

export const TopPanelContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { selectedNode } = useNodes();
  const [openPanel, setOpenPanel] = useState<
    "ID" | "Text" | "Transform" | null
  >(null);



  return (
    <TopPanelContext.Provider
      value={{ open: openPanel, setOpen: setOpenPanel }}
    >
      {openPanel && <div className="w-[100vh] h-screen absolute z-30" onClick={() => setOpenPanel(null)} />}

      {children}
    </TopPanelContext.Provider>
  );
};

export const UseTopPanel = () => {
  const ctx = useContext(TopPanelContext);
  if (!ctx) throw new Error("UseTopPanel must be used inside UseTopProvider");
  return ctx;
};
