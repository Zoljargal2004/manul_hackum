import { Input } from "@/components/ui/input";

export function NumberPair({
  a,
  b,
  onAChange,
  onBChange,
  aLabel = "A",
  bLabel = "B",
}: {
  a: number;
  b: number;
  aLabel?: string;
  bLabel?: string;
  onAChange: (v: number) => void;
  onBChange: (v: number) => void;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <Input
        type="number"
        value={a || ""}
        placeholder={aLabel}
        onChange={(e) => {
          onAChange(Number(e.target.value));
        }}
      />

      <Input
        type="number"
        value={b|| ""}
        placeholder={bLabel}
        onChange={(e) => {
          onBChange(Number(e.target.value));
        }}
      />
    </div>
  );
}
