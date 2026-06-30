import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ALL_SKINS = [
  { id: 1, name: "P250 | Asiimov", rarity: "mil-spec", color: "#4b69ff", emoji: "🔵", price: 15 },
  { id: 2, name: "FAMAS | Mecha Industries", rarity: "mil-spec", color: "#4b69ff", emoji: "🔵", price: 8 },
  { id: 3, name: "Glock | Water Elemental", rarity: "restricted", color: "#8847ff", emoji: "🟣", price: 35 },
  { id: 4, name: "MP5 | Whiteout", rarity: "restricted", color: "#8847ff", emoji: "🟣", price: 45 },
  { id: 5, name: "AK-47 | Redline", rarity: "classified", color: "#eb4b4b", emoji: "🔴", price: 120 },
  { id: 6, name: "USP | Neo-Noir", rarity: "classified", color: "#eb4b4b", emoji: "🔴", price: 95 },
  { id: 7, name: "AK-47 | Vulcan", rarity: "classified", color: "#eb4b4b", emoji: "🔴", price: 180 },
  { id: 8, name: "M4A4 | Asiimov", rarity: "covert", color: "#e4ae39", emoji: "🟠", price: 280 },
  { id: 9, name: "Desert Eagle | Blaze", rarity: "covert", color: "#e4ae39", emoji: "🟡", price: 450 },
  { id: 10, name: "MP9 | Hot Rod", rarity: "covert", color: "#e4ae39", emoji: "🟠", price: 340 },
]

const RARITY_UPGRADE: Record<string, string> = {
  "mil-spec": "restricted",
  restricted: "classified",
  classified: "covert",
  covert: "knife",
}

const RARITY_COLORS: Record<string, string> = {
  "mil-spec": "#4b69ff",
  restricted: "#8847ff",
  classified: "#eb4b4b",
  covert: "#e4ae39",
  knife: "#ffd700",
}

const RARITY_LABELS: Record<string, string> = {
  "mil-spec": "Mil-Spec",
  restricted: "Restricted",
  classified: "Classified",
  covert: "Covert",
  knife: "★ Особый",
}

const REQUIRED = 5

export function ContractsSection() {
  const [selected, setSelected] = useState<typeof ALL_SKINS[0][]>([])
  const [result, setResult] = useState<typeof ALL_SKINS[0] | null>(null)
  const [phase, setPhase] = useState<"idle" | "done">("idle")

  const toggle = (skin: typeof ALL_SKINS[0]) => {
    if (phase !== "idle") return
    const alreadyIn = selected.find((s) => s.id === skin.id)
    if (alreadyIn) {
      setSelected(selected.filter((s) => s.id !== skin.id))
      return
    }
    if (selected.length >= REQUIRED) return

    const firstRarity = selected[0]?.rarity
    if (firstRarity && skin.rarity !== firstRarity) return

    setSelected([...selected, skin])
  }

  const canContract = selected.length === REQUIRED

  const contract = () => {
    if (!canContract) return
    const targetRarity = RARITY_UPGRADE[selected[0].rarity]
    const candidates = ALL_SKINS.filter((s) => s.rarity === targetRarity)
    const pick = candidates.length > 0
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : { id: 999, name: "Нож | Butterfly", rarity: "knife", color: "#ffd700", emoji: "⭐", price: 2800 }
    setResult(pick)
    setPhase("done")
  }

  const reset = () => {
    setSelected([])
    setResult(null)
    setPhase("idle")
  }

  const currentRarity = selected[0]?.rarity
  const nextRarity = currentRarity ? RARITY_UPGRADE[currentRarity] : null

  return (
    <section id="contracts" className="py-24 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">📋 Контракты</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Объедини {REQUIRED} скинов одной редкости — получи один предмет следующего класса
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold font-orbitron">Слоты контракта</h3>
              <span className="text-gray-400 text-sm">{selected.length}/{REQUIRED}</span>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-4">
              {Array.from({ length: REQUIRED }).map((_, i) => {
                const skin = selected[i]
                return (
                  <div
                    key={i}
                    onClick={() => skin && setSelected(selected.filter((_, j) => j !== i))}
                    className={`rounded-xl border-2 p-2 flex flex-col items-center gap-1 min-h-[100px] justify-center transition-all
                      ${skin ? "cursor-pointer hover:opacity-70" : "border-dashed border-zinc-700 bg-zinc-900/50"}
                    `}
                    style={
                      skin
                        ? { borderColor: RARITY_COLORS[skin.rarity] + "80", background: RARITY_COLORS[skin.rarity] + "12" }
                        : {}
                    }
                  >
                    {skin ? (
                      <>
                        <span className="text-3xl">{skin.emoji}</span>
                        <span className="text-white text-center leading-tight" style={{ fontSize: 9 }}>
                          {skin.name.split(" | ")[1]}
                        </span>
                      </>
                    ) : (
                      <span className="text-zinc-600 text-2xl">+</span>
                    )}
                  </div>
                )
              })}
            </div>

            {currentRarity && nextRarity && (
              <div className="flex items-center gap-3 bg-zinc-900 rounded-xl p-3 mb-4">
                <div className="text-sm">
                  <span className="font-bold" style={{ color: RARITY_COLORS[currentRarity] }}>
                    {RARITY_LABELS[currentRarity]}
                  </span>
                  <span className="text-gray-400 mx-2">→</span>
                  <span className="font-bold" style={{ color: RARITY_COLORS[nextRarity] }}>
                    {RARITY_LABELS[nextRarity]}
                  </span>
                </div>
              </div>
            )}

            {phase === "idle" ? (
              <Button
                onClick={contract}
                disabled={!canContract}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-orbitron py-5 text-lg disabled:opacity-40"
              >
                {canContract ? "Заключить контракт 🔥" : `Выбери ещё ${REQUIRED - selected.length} скинов`}
              </Button>
            ) : (
              <div className="text-center">
                {result && (
                  <div
                    className="rounded-xl border p-5 mb-4 animate-[fadeIn_0.5s_ease-out]"
                    style={{ borderColor: RARITY_COLORS[result.rarity] + "80", background: RARITY_COLORS[result.rarity] + "15" }}
                  >
                    <div className="text-5xl mb-2">{result.emoji}</div>
                    <div className="text-white font-bold text-lg font-orbitron">{result.name}</div>
                    <div className="text-sm mt-1 font-bold" style={{ color: RARITY_COLORS[result.rarity] }}>
                      {RARITY_LABELS[result.rarity]} • ~{result.price}₽
                    </div>
                    <div className="text-green-400 text-sm mt-2">✅ Добавлено в инвентарь!</div>
                  </div>
                )}
                <Button onClick={reset} className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-orbitron py-4">
                  Новый контракт
                </Button>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-white font-bold font-orbitron mb-4">
              Инвентарь
              {currentRarity && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  (выбрана редкость:{" "}
                  <span style={{ color: RARITY_COLORS[currentRarity] }}>{RARITY_LABELS[currentRarity]}</span>)
                </span>
              )}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
              {ALL_SKINS.map((skin) => {
                const isSelected = !!selected.find((s) => s.id === skin.id)
                const disabled =
                  phase !== "idle" ||
                  selected.length >= REQUIRED && !isSelected ||
                  (currentRarity && skin.rarity !== currentRarity && !isSelected)
                return (
                  <div
                    key={skin.id}
                    onClick={() => !disabled && toggle(skin)}
                    className={`rounded-xl border p-3 flex flex-col items-center gap-2 transition-all
                      ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:scale-105"}
                      ${isSelected ? "ring-2 ring-white/40 scale-105" : ""}
                    `}
                    style={{
                      borderColor: RARITY_COLORS[skin.rarity] + "60",
                      background: isSelected
                        ? RARITY_COLORS[skin.rarity] + "30"
                        : RARITY_COLORS[skin.rarity] + "10",
                    }}
                  >
                    <span className="text-3xl">{skin.emoji}</span>
                    <span className="text-white text-xs text-center leading-tight">{skin.name}</span>
                    <Badge
                      className="text-xs border-0"
                      style={{ background: RARITY_COLORS[skin.rarity] + "30", color: RARITY_COLORS[skin.rarity] }}
                    >
                      {RARITY_LABELS[skin.rarity]}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
          <h4 className="text-white font-bold mb-3 font-orbitron text-sm">Как работают контракты?</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(RARITY_UPGRADE).map(([from, to]) => (
              <div key={from} className="flex items-center gap-2 text-sm">
                <span style={{ color: RARITY_COLORS[from] }}>●</span>
                <span className="text-gray-400">{RARITY_LABELS[from]}</span>
                <span className="text-gray-600">→</span>
                <span style={{ color: RARITY_COLORS[to] }}>●</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
