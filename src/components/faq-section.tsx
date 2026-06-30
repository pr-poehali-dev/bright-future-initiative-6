import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Как получить бесплатные монеты?",
      answer:
        "Монеты начисляются за ежедневный вход, выполнение заданий, бонусы для новичков и активацию промокодов. Их хватает, чтобы крутить кейсы без вложений.",
    },
    {
      question: "Как работает открытие кейсов?",
      answer:
        "Выбираешь кейс, тратишь монеты и крутишь. Выпавший скин сразу попадает в твой инвентарь на сайте — его можно вывести в Steam, продать за монеты или прокачать.",
    },
    {
      question: "Что такое апгрейд скинов?",
      answer:
        "Апгрейд позволяет обменять скин на более дорогой с выбранным шансом. Чем выше желаемый предмет, тем меньше шанс — но и приз ценнее.",
    },
    {
      question: "Как работают контракты?",
      answer:
        "Контракт объединяет несколько ненужных скинов в один предмет более высокого класса. Отличный способ превратить мелочь во что-то стоящее.",
    },
    {
      question: "Можно ли вывести скины в Steam?",
      answer:
        "Да. Любой выпавший скин выводится прямо в твой инвентарь Steam за пару минут. Также его можно продать за монеты и пустить в новую крутку.",
    },
    {
      question: "Честные ли дропы?",
      answer:
        "Да. Мы используем систему Provably Fair — каждый результат можно проверить. Шансы выпадения прозрачны и не меняются.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Всё о монетах, кейсах, апгрейде, контрактах и выводе скинов в Steam.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}