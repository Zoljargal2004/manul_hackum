import { useState } from "react";
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

const FONTS = [
  "Arial",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Verdana",
  "Trebuchet MS",
  "Impact",
  "Comic Sans MS",
  "Helvetica",
  "Tahoma",
  "Lucida Console",
  "Palatino",
  "Garamond",
  "Bookman",
  "Courier",
  "Monaco",
  "Menlo",
  "Consolas",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Ubuntu",
];

export function FontSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span style={{ fontFamily: value }}>{value || "Select font..."}</span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[240px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search font..." />
          <CommandList>
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup>
              {FONTS.map((font) => (
                <CommandItem
                  key={font}
                  value={font}
                  onSelect={() => {
                    onValueChange(font);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === font ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span style={{ fontFamily: font }}>{font}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
