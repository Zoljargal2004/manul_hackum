"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Paint from "./paint";

export function CatCreator() {
  const [furColor, setFurColor] = useState("#A0826D");
  const [eyeColor, setEyeColor] = useState("#FFD700");
  const [fluffiness, setFluffiness] = useState([50]);

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Персона үүсгэх
          </h1>
          {/* <p className="text-xl text-muted-foreground">Өөр</p> */}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Paint />
          {/* Right side - Creation controls */}
          <div className="order-1 md:order-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Customize Your Cat</h2>

              <div className="space-y-6">
                {/* Fur Color */}
                <div className="space-y-3">
                  <Label htmlFor="fur-color" className="text-base">
                    Fur Color
                  </Label>
                  <div className="flex gap-4 items-center">
                    <input
                      id="fur-color"
                      type="color"
                      value={furColor}
                      onChange={(e) => setFurColor(e.target.value)}
                      className="h-12 w-20 rounded cursor-pointer border-2 border-border"
                    />
                    <span className="text-sm text-muted-foreground">
                      {furColor}
                    </span>
                  </div>
                </div>

                {/* Eye Color */}
                <div className="space-y-3">
                  <Label htmlFor="eye-color" className="text-base">
                    Eye Color
                  </Label>
                  <div className="flex gap-4 items-center">
                    <input
                      id="eye-color"
                      type="color"
                      value={eyeColor}
                      onChange={(e) => setEyeColor(e.target.value)}
                      className="h-12 w-20 rounded cursor-pointer border-2 border-border"
                    />
                    <span className="text-sm text-muted-foreground">
                      {eyeColor}
                    </span>
                  </div>
                </div>

                {/* Fluffiness */}
                <div className="space-y-3">
                  <Label htmlFor="fluffiness" className="text-base">
                    Fluffiness: {fluffiness[0]}%
                  </Label>
                  <Slider
                    id="fluffiness"
                    value={fluffiness}
                    onValueChange={setFluffiness}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1">Generate Cat</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Reset
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-muted/50">
              <h3 className="font-semibold mb-2">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Pallas's cats are known for their thick, fluffy fur and
                expressive faces. Try different combinations to create your
                perfect manul!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

