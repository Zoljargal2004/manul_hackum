import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function CreateCatSection() {
  return (
    <section id="persona" className="py-20 px-4 from-primary/10 via-background to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Өөрийн манул персона үүсгэх</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              
            </p>
          </div>

          <Link href="/creator">
            <Button size="lg" className="text-lg px-8 py-6 gap-2">
              <Sparkles className="w-5 h-5" />
              Үүсгэх
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
