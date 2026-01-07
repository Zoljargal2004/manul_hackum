"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function CreateCat() {
  const [furColor, setFurColor] = useState("#8B7355")
  const [eyeColor, setEyeColor] = useState("#FFD700")
  const [pattern, setPattern] = useState("striped")

  const furColors = [
    { name: "Gray", value: "#8B7355" },
    { name: "Brown", value: "#A0826D" },
    { name: "Light", value: "#C4B5A0" },
    { name: "Dark", value: "#6B5D52" },
  ]

  const eyeColors = [
    { name: "Gold", value: "#FFD700" },
    { name: "Green", value: "#00AB84" },
    { name: "Blue", value: "#0085CA" },
    { name: "Amber", value: "#E5BF03" },
  ]

  const patterns = [
    { name: "Striped", value: "striped" },
    { name: "Spotted", value: "spotted" },
    { name: "Solid", value: "solid" },
  ]

  return (
    <section id="create" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Create Your Palla&apos;s Cat</h2>
          <p className="text-center text-muted-foreground mb-12 text-balance">
            Customize your own unique Palla&apos;s cat with different fur colors, eye colors, and patterns
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Cat Preview */}
            <Card className="p-8 bg-background">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Cat illustration */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Body */}
                    <ellipse cx="100" cy="120" rx="60" ry="50" fill={furColor} />

                    {/* Pattern overlay */}
                    {pattern === "striped" && (
                      <g opacity="0.3">
                        <line x1="70" y1="100" x2="70" y2="140" stroke="#171818" strokeWidth="3" />
                        <line x1="80" y1="95" x2="80" y2="145" stroke="#171818" strokeWidth="3" />
                        <line x1="90" y1="95" x2="90" y2="145" stroke="#171818" strokeWidth="3" />
                        <line x1="110" y1="95" x2="110" y2="145" stroke="#171818" strokeWidth="3" />
                        <line x1="120" y1="95" x2="120" y2="145" stroke="#171818" strokeWidth="3" />
                        <line x1="130" y1="100" x2="130" y2="140" stroke="#171818" strokeWidth="3" />
                      </g>
                    )}
                    {pattern === "spotted" && (
                      <g opacity="0.3">
                        <circle cx="80" cy="110" r="5" fill="#171818" />
                        <circle cx="95" cy="105" r="4" fill="#171818" />
                        <circle cx="110" cy="110" r="5" fill="#171818" />
                        <circle cx="120" cy="105" r="4" fill="#171818" />
                        <circle cx="85" cy="130" r="4" fill="#171818" />
                        <circle cx="115" cy="130" r="4" fill="#171818" />
                      </g>
                    )}

                    {/* Head */}
                    <circle cx="100" cy="70" r="40" fill={furColor} />

                    {/* Ears */}
                    <ellipse cx="75" cy="45" rx="15" ry="20" fill={furColor} />
                    <ellipse cx="125" cy="45" rx="15" ry="20" fill={furColor} />

                    {/* Eyes */}
                    <ellipse cx="85" cy="70" rx="10" ry="12" fill={eyeColor} />
                    <ellipse cx="115" cy="70" rx="10" ry="12" fill={eyeColor} />
                    <circle cx="85" cy="72" r="5" fill="#171818" />
                    <circle cx="115" cy="72" r="5" fill="#171818" />

                    {/* Nose */}
                    <ellipse cx="100" cy="85" rx="6" ry="5" fill="#EF3340" />

                    {/* Whiskers */}
                    <line x1="60" y1="75" x2="40" y2="70" stroke="#171818" strokeWidth="1.5" />
                    <line x1="60" y1="80" x2="40" y2="80" stroke="#171818" strokeWidth="1.5" />
                    <line x1="140" y1="75" x2="160" y2="70" stroke="#171818" strokeWidth="1.5" />
                    <line x1="140" y1="80" x2="160" y2="80" stroke="#171818" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </Card>

            {/* Customization Options */}
            <div className="space-y-6">
              {/* Fur Color */}
              <div>
                <h3 className="font-semibold mb-3">Fur Color</h3>
                <div className="grid grid-cols-4 gap-2">
                  {furColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setFurColor(color.value)}
                      className={`aspect-square rounded-lg border-2 transition-all ${
                        furColor === color.value ? "border-primary scale-105" : "border-border hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={color.name}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Eye Color */}
              <div>
                <h3 className="font-semibold mb-3">Eye Color</h3>
                <div className="grid grid-cols-4 gap-2">
                  {eyeColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setEyeColor(color.value)}
                      className={`aspect-square rounded-lg border-2 transition-all ${
                        eyeColor === color.value ? "border-primary scale-105" : "border-border hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={color.name}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pattern */}
              <div>
                <h3 className="font-semibold mb-3">Pattern</h3>
                <div className="grid grid-cols-3 gap-2">
                  {patterns.map((p) => (
                    <Button
                      key={p.value}
                      variant={pattern === p.value ? "default" : "outline"}
                      onClick={() => setPattern(p.value)}
                      className="w-full"
                    >
                      {p.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-6" size="lg">
                Save Your Cat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
