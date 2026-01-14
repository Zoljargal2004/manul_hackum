import { Navigation } from "@/components/navigation";
import { CatCreator } from "@/components/cat-creator/cat-creator";
import { NodeManager } from "@/components/cat-creator/nodeProvider";
import { KeyboardShortcuts } from "@/components/cat-creator/editor/keyboardshortcut";

export const metadata = {
  title: "Create Your Pallas's Cat - Interactive Cat Creator",
  description:
    "Design your own unique Pallas's cat with our interactive creator",
};

export default function CreatorPage() {
  return (
    <div className="min-h-screen">
      <NodeManager>
        <KeyboardShortcuts />

        <div>
          <Navigation />
          <div className="text-4xl mt-20 text-center">Персона үүсгэх</div>
          <CatCreator />
        </div>
      </NodeManager>
    </div>
  );
}
