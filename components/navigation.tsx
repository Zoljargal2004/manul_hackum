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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${!scrollY? "bg-background/80" : "bg-background"} trasition-call duration-300 backdrop-blur-sm border-b border-border`}
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
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full ">
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                  <SheetDescription>
                    <span className="flex flex-col gap-4">
                      <NavElements />
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
  return (
    <>
      <a
        href="/#about"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Тухай
      </a>
      <a
        href="/#hackum"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Hackum
      </a>
      <a
        href="/creator"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Persona үүсгэх
      </a>
      <a
        href="/#gallery"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Галлерэй
      </a>
    </>
  );
};
