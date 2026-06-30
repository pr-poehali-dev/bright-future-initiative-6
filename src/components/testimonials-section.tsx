import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Денис «kr1mz»",
    role: "Играет 8 месяцев",
    avatar: "/cybersecurity-expert-man.jpg",
    content:
      "Зашёл ради бесплатных монет, через неделю выбил нож Karambit. Вывод в Steam пришёл за пару минут, всё честно.",
  },
  {
    name: "Артём",
    role: "Апгрейдит скины каждый день",
    avatar: "/asian-woman-tech-developer.jpg",
    content:
      "Апгрейд тут просто топ. Поднял дешёвую AWP до AK Redline за пару прокрутов. Контракты тоже выручают.",
  },
  {
    name: "Виктория",
    role: "В игре с релиза",
    avatar: "/professional-woman-scientist.png",
    content:
      "Нравится, что можно крутить без вложений. Монеты капают за вход и задания, а ненужные скины продаю в один клик.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-sans">Что говорят игроки</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Тысячи игроков уже крутят кейсы и выводят скины. Вот их отзывы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}