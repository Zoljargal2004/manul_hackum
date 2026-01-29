import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LinkButton } from "./generic/LinkButton";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center ">
      <div className="absolute inset-0 overflow-hidden ">
        <img
          src="https://raw.githubusercontent.com/Zoljargal2004/manul_hackum/refs/heads/main/public/home.png"
          alt="Манул"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 from-background/60  via-background/40 to-background bg-[#0E121680]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-8xl font-bold text-foreground mb-6 text-balance">
          Мануул
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Төв Азийн зэрлэг муур
        </p>
        <div className="flex gap-4 justify-center">
          <LinkButton link="#about">Танин мэдэх</LinkButton>
        </div>
      </div>
    </section>
  );
}
