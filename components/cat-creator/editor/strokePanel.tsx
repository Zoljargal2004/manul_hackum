import { Slider } from "@/components/ui/slider";

export function StrokeControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Slider
        value={[value]}
        max={25}
        min={0}
        step={1}
        onValueChange={(v) => onChange(v[0])}
      />
      <span className="w-12 text-right text-sm text-muted-foreground">
        {value}px
      </span>
    </div>
  );
}
