import { Navigation } from "@/components/navigation";
import { CatCreator } from "@/components/cat-creator/cat-creator";
import { NodeManager } from "@/components/cat-creator/nodeProvider";
import { KeyboardShortcuts } from "@/components/cat-creator/editor/keyboardshortcut";

export const metadata = {
  title: "Мануул",
  description:
    "Өөрийн мануулыг үүсгэх",
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
