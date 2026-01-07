import { Navigation } from "@/components/navigation"
import { CatCreator } from "@/components/cat-creator"

export const metadata = {
  title: "Create Your Pallas's Cat - Interactive Cat Creator",
  description: "Design your own unique Pallas's cat with our interactive creator",
}

export default function CreatorPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <CatCreator />
    </div>
  )
}
