import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Открытие кейсов",
    description: "Десятки кейсов на любой вкус. Крути за бесплатные монеты и выбивай скины от Mil-Spec до Covert и редких ножей.",
    icon: "brain",
    badge: "Кейсы",
  },
  {
    title: "Апгрейд скинов",
    description: "Прокачивай свои скины до более дорогих. Выбирай шанс и забирай предмет круче того, что уже есть в инвентаре.",
    icon: "zap",
    badge: "Апгрейд",
  },
  {
    title: "Бесплатные монеты",
    description: "Получай монеты за вход каждый день, бонусы, задания и промокоды. Крути кейсы абсолютно бесплатно.",
    icon: "globe",
    badge: "Бесплатно",
  },
  {
    title: "Контракты",
    description: "Объединяй ненужные скины в контракт и получай один предмет выше классом. Шанс на апгрейд всегда с тобой.",
    icon: "link",
    badge: "Контракты",
  },
  {
    title: "Продажа скинов",
    description: "Продавай выпавшие скины за монеты в один клик и сразу пускай их в новую крутку или вывод.",
    icon: "target",
    badge: "Маркет",
  },
  {
    title: "Честные дропы",
    description: "Прозрачная система Provably Fair и моментальный вывод предметов в твой инвентарь Steam.",
    icon: "lock",
    badge: "Честно",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Всё для крутки в одном месте</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Открывай кейсы, апгрейди скины и зарабатывай монеты — без вложений и регистрации лишних данных
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "brain" && "&#129504;"}
                    {feature.icon === "lock" && "&#128274;"}
                    {feature.icon === "globe" && "&#127760;"}
                    {feature.icon === "zap" && "&#9889;"}
                    {feature.icon === "link" && "&#128279;"}
                    {feature.icon === "target" && "&#127919;"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}