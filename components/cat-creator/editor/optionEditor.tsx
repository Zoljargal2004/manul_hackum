import { Check } from "lucide-react";
import { Layers, PartKey } from "../cat-creator-types";
import { buildPath } from "../utils/layer/path";

type OptionProps = {
  layers: Layers;
  partKey: PartKey;
  file: string;
  setLayer: (key: PartKey, path: string | null) => void;
};

export const Option = ({ layers, partKey, file, setLayer }: OptionProps) => {
  const path = buildPath(partKey, file);
  const active = layers[partKey] === path;

  return (
    <button
      onClick={() => {
        if (path === layers[partKey]) {
          setLayer(partKey, null);
          return;
        }
        setLayer(partKey, path);
      }}
      className={`p-2 border rounded relative overflow-hidden bg-white `}
    >
      <img src={path} className="w-14 h-14 object-contain" />
      {active && (
        <div className="absolute flex justify-center items-center inset-0 bg-[#0E121680] z-30">
          <Check />
        </div>
      )}
    </button>
  );
};
