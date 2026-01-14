"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllNodes } from "../utils/buildFunctions";
import { useNodes } from "../nodeProvider";
import * as PopoverPrimitive from "@radix-ui/react-popover";

const PopoverContentNoPortal = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "start", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={className}
    {...props}
  />
));
PopoverContentNoPortal.displayName = "PopoverContentNoPortal";

export function SelectParent({
  value,
  onChange,
}: {
  value: string | null;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { nodes } = useNodes();

  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<string>("");

  React.useEffect(() => {
    setInternal(value ?? "__root__");
  }, [value]);

  const ROOT = "__root__";

  const parents = getAllNodes(nodes).map((id) => ({
    label: id,
    value: id,
  }));

  parents.unshift({ label: "root", value: ROOT });

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between">
          {parents.find((p) => p.value === internal)?.label || "Select parent"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContentNoPortal className="p-0">
        <Command>
          <CommandInput placeholder="Search parent..." />
          <CommandList>
            <CommandEmpty>No parent found.</CommandEmpty>
            <CommandGroup>
              {parents.map((parent) => (
                <CommandItem
                  key={parent.value}
                  value={parent.value}
                  onSelect={(v) => {
                    setInternal(v);
                    setOpen(false);
                    onChange(v === ROOT ? null : v);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      internal === parent.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {parent.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContentNoPortal>
    </Popover>
  );
}
