"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

export function CatCreator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [baseSrc] = useState("/create-cat/base.png");
  const [layers, setLayers] = useState({
    eyebrows: "/create-cat/eyebrows/1.svg",
    nose: "/create-cat/nose/1.svg",
    eye: "/create-cat/eye/1.svg",
    stain: "/create-cat/stain/1.svg",
    fang: "/create-cat/fang/1.svg",
    mouth: "/create-cat/mouth/1.svg",
    naruto_beard: "/create-cat/naruto-beard/1.svg",
    beard: "/create-cat/beard/1.svg",
  });
  useEffect(() => {
    drawCanvas();
  }, [layers]);
  const drawCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    await drawImage(ctx, baseSrc);

    await drawImage(ctx, layers.eyebrows, 570, 240, 520, 134);
    await drawImage(ctx, layers.mouth, 815, 439, 109, 142);
    await drawImage(ctx, layers.fang, 810, 483, 119, 49);
    await drawImage(ctx, layers.nose, 754, 418, 212, 116);
    await drawImage(ctx, layers.naruto_beard, 453, 367, 779, 253);
    await drawImage(ctx, layers.beard, 354, 327, 951, 284);
    await drawImage(ctx, layers.eye, 600, 273, 477, 224);
    await drawImage(ctx, layers.stain, 761, 247, 100, 76);
  };
  const drawImage = (
    ctx: CanvasRenderingContext2D,
    src: string,
    x: number = 0,
    y: number = 0,
    width?: number,
    height?: number
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve();
        return;
      }

      const img = new Image();
      img.crossOrigin = "anonymous";
      if(!src){
        resolve()
        return
      }
      img.src = src;

      img.onload = () => {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        if (width && height) {
          ctx.drawImage(img, x, y, width, height);
        } else {
          ctx.drawImage(img, x, y, img.width, img.height);
        }

        resolve();
      };

      img.onerror = () => reject(`Failed to load ${src}`);
    });
  };

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Персона үүсгэх
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="p-8">
            <canvas
              ref={canvasRef}
              width={1408}
              height={1304}
              className="w-full aspect-square"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Custommm</h2>

              {/* eyebrows */}

              <Option
                filename="1.svg"
                dest="eyebrows"
                setComp={(val) => setLayers({ ...layers, eyebrows: val })}
              />
              <Option
                filename="2.svg"
                dest="eyebrows"
                setComp={(val) => setLayers({ ...layers, eyebrows: val })}
              />
              <Option
                filename="3.svg"
                dest="eyebrows"
                setComp={(val) => setLayers({ ...layers, eyebrows: val })}
              />

              <div></div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

const Option = ({
  filename,
  dest,
  setComp,
}: {
  filename: string;
  dest: string;
  setComp: (value: string) => void;
}) => {
  const relPath = `/create-cat/${dest}/${filename}` 
  return (
    <div onClick={() => setComp(relPath)}>
      <img src={relPath} />
    </div>
  );
};
