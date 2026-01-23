import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Habitat } from "@/components/habitat";
import { Gallery } from "@/components/gallery";
import { Navigation } from "@/components/navigation";
import { CreateCatSection } from "@/components/create-cat-section";
import { Company } from "@/components/company";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Company />
      {/* <Habitat /> */}
      <CreateCatSection />
      <Gallery />
    </div>
  );
}
