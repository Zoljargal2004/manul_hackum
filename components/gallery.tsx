import { Download } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { LinkButton } from "./generic/LinkButton";

export function Gallery() {
  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center text-balance">
            Галерей
          </h2>
          <LinkButton
            target="_blank"
            link="https://github.com/Zoljargal2004/manul_hackum"
          >
            Contribute
          </LinkButton>

          <p className="text-lg text-muted-foreground mb-12 text-center leading-relaxed"></p>

          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 17 }, (_, i) => (
              <GalleryFrame img={`${i + 1}`} key={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const GalleryFrame = ({ img }: { img: string }) => {
  return (
    <div className="bg-muted/30 rounded-2xl">
      <div className="relative h-80 rounded-lg overflow-hidden group">
        {/* gal */}
        <img
          src={`https://raw.githubusercontent.com/Zoljargal2004/manul_hackum/refs/heads/main/public/gallery/${img}.png`}
          alt="manul"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <a
          className="absolute right-4 bottom-4 p-4 rounded-2xl "
          type="button"
          href={`/gallery/${img}.png`}
          download
        >
          <Download />
        </a>
      </div>
    </div>
  );
};
