"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function Navigation() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${!scrollY ? "bg-background/80" : "bg-background"} trasition-call duration-300 backdrop-blur-sm border-b border-border`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-1">
            <img src={`/hackum-symbol.png`} className="h-8" />
            <div className="text-xl font-bold text-foreground">{"Мануул"}</div>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            <NavElements />
          </div>
          <div className={`lg:hidden`}>
            <Sheet open={open} onOpenChange={() =>setOpen(!open)}>
              <SheetTrigger asChild onClick={() => setOpen(true)}>
                <Button variant="outline">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent  className={` "w-0"}`}>
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                  <SheetDescription>
                    <span className="flex flex-col gap-4">
                      {navElements.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={()=> setOpen(false)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </span>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavElements = () => {
  return <></>;
};

const navElements = [
  { href: "/#about", label: "Тухай" },
  { href: "/#hackum", label: "Hackum" },
  { href: "/creator", label: "Persona үүсгэх" },
  { href: "/#gallery", label: "Галлерэй" },
];
