export function Habitat() {
  return (
    <section id="habitat" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Нутаг дэвсгэр
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                <b>Мануул</b> нь Төв Азийн хүйтэн, хуурай бүс нутагт — Каспийн
                тэнгисээс Монгол хүртэлх өргөн уудам нутагт тархсан. Тэд далайн
                түвшнээс дээш 900–4,600 метрийн өндөрт байрлах чулуурхаг орчинд
                амьдрахад сайн дасан зохицсон байдаг
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Эдгээр муурнууд нь хээр тал, тал хээр болон уулын бүс нутгуудад
                тархсан бөгөөд тэдний өтгөн үс нь –50°C (–58°F)-аас доош унах
                боломжтой хэт хүйтэн температурын нөхцөлөөс хамгаалдаг.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <div className="font-semibold text-foreground">
                      Монгол болон Хятад
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Үндсэн нутаг дэвсгэр
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                  <div>
                    <div className="font-semibold text-foreground">Төв Ази</div>
                    <div className="text-sm text-muted-foreground">
                      Казахстан, Киргизстан, ОХУ
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <div>
                    <div className="font-semibold text-foreground">
                      Төвд
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Өндөрлөг бүс нутгууд
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden">
              <img
                src="/manul.jpg"
                alt="nutag"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
