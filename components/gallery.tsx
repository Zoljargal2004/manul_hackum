import { Download } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function Gallery() {
  const images = ["manul2", "manul3", "manul4"];
  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center text-balance">
            Галерей
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center leading-relaxed"></p>

          <div className="grid md:grid-cols-3 gap-6">
            {images.map((img: string, index) => (
              <GalleryFrame img={img} key={`gal` + index} />
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
        <img
          src={`/${img}.png`}
          alt="manul"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button className="absolute right-4 bottom-4">
          <Link href={`/${img}.png`} download={true}>
            <Download />
          </Link>
        </Button>
      </div>
    </div>
  );
};
