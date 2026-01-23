import Link from "next/link";
import { Button } from "./ui/button";

export function Company() {
  const partners = ["and", "itpark", "mandal", "ms"];
  return (
    <section id="hackum" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-left   text-balance">
            Hackum Vision
          </h2>
          <div className="flex sm:flex-row gap-8 flex-col items-center">
            <div className="flex flex-col gap-4 sm:gap-8 items-start">
              <p className="text-lg text-muted-foreground text-left leading-relaxed">
                Бид стартап мэдээллийн технологийн компанийн хувьд хувь хүн
                болон байгууллагуудын хэрэгцээ, сайн сайхныг нэн тэргүүнд
                тавьсан дэвшилтэт технологийн шийдлүүдийг хүргэхэд зориулагдан
                ажилладаг.
              </p>
              <Button>
                <Link target="_blank" href="https://hackum.com">
                  Холбогдох
                </Link>
              </Button>
            </div>
            <div className="relative overflow-hidden min-w-[20%]">
              <img src="/logo_cat.png" alt="catie" className="w-full h-full" />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="text-lg font-bold text-foreground text-left   text-balance">
              Бидэнтэй хамтарч ажилладаг байгууллагууд
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 overflow-hidden rounded-2xl border divide-y lg:divide-y-0 lg:divide-x">
              {partners.map((name: string, index) => (
                <PartnerGridEle img={name} key={`partner-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PartnerGridEle = ({ img }: { img: string }) => {
  return (
    <div className="flex justify-center items-center py-2 px-4">
      <img src={`/partners/${img}.svg`} className="h-8" />
    </div>
  );
};
