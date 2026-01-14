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
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllNodes } from "../utils/buildFunctions";
import { useNodes } from "../nodeProvider";

export function SelectParent({
  onChange,
}: {
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { nodes, selected } = useNodes();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    setValue(selected ?? "__root__");
  }, [selected]);

  const ROOT = "__root__";

  const parents = getAllNodes(nodes).map((id) => ({
    label: id,
    value: id, // always string
  }));

  parents.unshift({ label: "root", value: ROOT });

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {parents.find((p) => p.value === value)?.label || "Select parent..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search parent..." />
          <CommandList>
            <CommandEmpty>No parent found.</CommandEmpty>
            <CommandGroup>
              {parents.map((parent) => (
                <CommandItem
                  key={parent.value}
                  value={parent.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    onChange(currentValue === ROOT ? null : currentValue);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === parent.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {parent.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
