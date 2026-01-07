import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Төрлийн тухай
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row content-center ">
              <div className="content-center">
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  <b>Мануул</b> нь Төв Азийн хүйтэн, хуурай бүс нутагт — Каспийн
                  тэнгисээс Монгол хүртэлх өргөн уудам нутагт тархсан. Тэд
                  далайн түвшнээс дээш 900–4,600 метрийн өндөрт байрлах
                  чулуурхаг орчинд амьдрахад сайн дасан зохицсон байдаг
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Эдгээр муурнууд нь хээр тал, тал хээр болон уулын бүс
                  нутгуудад тархсан бөгөөд тэдний өтгөн үс нь –50°C (–58°F)-аас
                  доош унах боломжтой хэт хүйтэн температурын нөхцөлөөс
                  хамгаалдаг.
                </p>
              </div>
              <div className="mx-auto relative max-w-100 w-full lg:max-h-[300] lg:max-w-none rounded-lg overflow-hidden">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Manul2.jpg"
                  alt="nutag"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    2.5–4.5 кг
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Дундаж жин
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    46-65 cm
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Биеийн өндөр
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    11-12 жил
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Дундаж наслалт
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Биеийн онцлог
                </h3>
                <ul className="space-y-3 text-muted-foreground leading-relaxed">
                  <li>• Хэт хүйтэн уур амьсгалд дасан зохицсон зузаан үс</li>
                  <li>• Том, илэрхий нүдтэй хавтгай царай</li>
                  <li>• Богино хөлтэй, бөх биетэй</li>
                  <li>• Толгойн доод хэсэгт байрласан бөөрөнхий чих</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Зан төлөв
                </h3>
                <ul className="space-y-3 text-muted-foreground leading-relaxed">
                  <li>• Ихэвчлэн үүрийн болон шөнийн идэвхтэй</li>
                  <li>• Ганцаарчилсан амьдралтай, ангууч зан төлөвтэй</li>
                  <li>• Жижиг хөхтөн амьтад болон шувуугаар хооллодог</li>
                  <li>• Чулуурхаг ан цав, завсрыг оромж болгон ашигладаг</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
