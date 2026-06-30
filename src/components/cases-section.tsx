import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const SKINS = [
  { id: 1, name: "AK-47 | Redline", rarity: "classified", color: "#eb4b4b", emoji: "🔴", price: 120 },
  { id: 2, name: "M4A4 | Asiimov", rarity: "covert", color: "#eb4b4b", emoji: "🟠", price: 280 },
  { id: 3, name: "AWP | Dragon Lore", rarity: "covert", color: "#e4ae39", emoji: "🟡", price: 1200 },
  { id: 4, name: "Glock | Water Elemental", rarity: "restricted", color: "#8847ff", emoji: "🟣", price: 35 },
  { id: 5, name: "USP | Neo-Noir", rarity: "classified", color: "#eb4b4b", emoji: "🔴", price: 95 },
  { id: 6, name: "Desert Eagle | Blaze", rarity: "covert", color: "#e4ae39", emoji: "🟡", price: 450 },
  { id: 7, name: "P250 | Asiimov", rarity: "mil-spec", color: "#4b69ff", emoji: "🔵", price: 15 },
  { id: 8, name: "MP9 | Hot Rod", rarity: "covert", color: "#e4ae39", emoji: "🟡", price: 340 },
  { id: 9, name: "Нож | Butterfly", rarity: "knife", color: "#ffd700", emoji: "⭐", price: 2800 },
  { id: 10, name: "Перчатки | Fade", rarity: "knife", color: "#ffd700", emoji: "⭐", price: 1800 },
  { id: 11, name: "AK-47 | Vulcan", rarity: "classified", color: "#eb4b4b", emoji: "🔴", price: 180 },
  { id: 12, name: "FAMAS | Mecha Industries", rarity: "mil-spec", color: "#4b69ff", emoji: "🔵", price: 8 },
]

const CASES = [
  {
    id: 1,
    name: "Куперняга",
    price: 30,
    emoji: "📦",
    gradient: "from-blue-900/80 to-blue-700/40",
    border: "border-blue-500/40",
    glow: "shadow-blue-500/20",
    skins: [1, 4, 7, 12, 11],
  },
  {
    id: 2,
    name: "ДропКейс",
    price: 89,
    emoji: "💎",
    gradient: "from-purple-900/80 to-purple-700/40",
    border: "border-purple-500/40",
    glow: "shadow-purple-500/20",
    skins: [1, 5, 6, 11, 3],
  },
  {
    id: 3,
    name: "Соннет",
    price: 149,
    emoji: "🔮",
    gradient: "from-red-900/80 to-red-700/40",
    border: "border-red-500/40",
    glow: "shadow-red-500/20",
    skins: [2, 5, 6, 8, 9],
  },
  {
    id: 4,
    name: "Радмир",
    price: 249,
    emoji: "🌟",
    gradient: "from-orange-900/80 to-orange-700/40",
    border: "border-orange-500/40",
    glow: "shadow-orange-500/20",
    skins: [2, 3, 6, 8, 10],
  },
  {
    id: 5,
    name: "Каравай",
    price: 399,
    emoji: "👑",
    gradient: "from-yellow-900/80 to-yellow-700/40",
    border: "border-yellow-500/40",
    glow: "shadow-yellow-500/20",
    skins: [3, 6, 8, 9, 10],
  },
]

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

function CaseOpenModal({ caseData, onClose }: { caseData: typeof CASES[0]; onClose: () => void }) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<typeof SKINS[0] | null>(null)
  const [offset, setOffset] = useState(0)
  const [phase, setPhase] = useState<"idle" | "spinning" | "done">("idle")
  const containerRef = useRef<HTMLDivElement>(null)

  const ITEM_WIDTH = 140
  const VISIBLE_ITEMS = 7
  const CENTER_INDEX = 3

  const caseSkins = caseData.skins.map((id) => SKINS.find((s) => s.id === id)!).filter(Boolean)

  const roulette = Array.from({ length: 60 }, (_, i) => {
    const skin = caseSkins[i % caseSkins.length]
    return { ...skin, uid: i }
  })

  const spin = () => {
    if (spinning) return
    setPhase("spinning")
    setSpinning(true)
    setResult(null)

    const weights = caseSkins.map((s) => {
      if (s.rarity === "knife") return 1
      if (s.rarity === "covert") return 3
      if (s.rarity === "classified") return 10
      if (s.rarity === "restricted") return 20
      return 40
    })
    const total = weights.reduce((a, b) => a + b, 0)
    let rand = Math.random() * total
    let winSkin = caseSkins[0]
    for (let i = 0; i < caseSkins.length; i++) {
      rand -= weights[i]
      if (rand <= 0) { winSkin = caseSkins[i]; break }
    }

    const landIndex = 45 + Math.floor(Math.random() * 5)
    roulette[landIndex] = { ...winSkin, uid: landIndex }

    const targetOffset = -(landIndex - CENTER_INDEX) * ITEM_WIDTH + (Math.random() * 60 - 30)

    setOffset(targetOffset)

    setTimeout(() => {
      setResult(winSkin)
      setPhase("done")
      setSpinning(false)
    }, 4500)
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-zinc-950 border border-red-500/30 rounded-2xl p-6 max-w-3xl w-full shadow-2xl shadow-red-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white font-orbitron">
            {caseData.emoji} {caseData.name}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-700 mb-6" style={{ height: 160 }}>
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-900 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-900 to-transparent" />
          </div>
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-0.5 bg-red-500 z-20 shadow-[0_0_10px_2px_rgba(239,68,68,0.8)]" />

          <div
            ref={containerRef}
            className="flex items-center h-full"
            style={{
              width: roulette.length * ITEM_WIDTH,
              transform: `translateX(calc(50% - ${ITEM_WIDTH / 2}px + ${offset}px))`,
              transition: phase === "spinning" ? "transform 4s cubic-bezier(0.05,0.9,0.3,1)" : "none",
            }}
          >
            {roulette.map((skin) => (
              <div
                key={skin.uid}
                className="flex-shrink-0 flex flex-col items-center justify-center gap-1 mx-1 rounded-lg border bg-zinc-800/80"
                style={{
                  width: ITEM_WIDTH - 8,
                  height: 130,
                  borderColor: RARITY_COLORS[skin.rarity] + "60",
                  boxShadow: `0 0 8px ${RARITY_COLORS[skin.rarity]}30`,
                }}
              >
                <span className="text-4xl">{skin.emoji}</span>
                <span className="text-white text-xs text-center px-2 leading-tight font-medium" style={{ fontSize: 10 }}>{skin.name}</span>
                <span className="text-xs font-bold" style={{ color: RARITY_COLORS[skin.rarity], fontSize: 9 }}>
                  {RARITY_LABELS[skin.rarity]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {phase === "done" && result && (
          <div className="mb-6 rounded-xl border p-4 text-center animate-[fadeIn_0.5s_ease-out]"
            style={{ borderColor: RARITY_COLORS[result.rarity] + "80", background: RARITY_COLORS[result.rarity] + "15" }}>
            <div className="text-5xl mb-2">{result.emoji}</div>
            <div className="text-white font-bold text-xl font-orbitron">{result.name}</div>
            <div className="text-sm mt-1 font-bold" style={{ color: RARITY_COLORS[result.rarity] }}>
              {RARITY_LABELS[result.rarity]} • ~{result.price}₽
            </div>
            <div className="text-gray-400 text-sm mt-2">Скин добавлен в инвентарь!</div>
          </div>
        )}

        <div className="flex gap-3">
          {phase !== "done" ? (
            <Button
              onClick={spin}
              disabled={spinning}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white font-orbitron text-lg py-6 disabled:opacity-50"
            >
              {spinning ? "Крутим..." : `Открыть за 🪙 ${caseData.price}`}
            </Button>
          ) : (
            <>
              <Button onClick={spin} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-orbitron py-5">
                Ещё раз 🪙 {caseData.price}
              </Button>
              <Button onClick={onClose} variant="outline" className="flex-1 border-zinc-600 text-white hover:bg-zinc-800 py-5">
                Забрать и выйти
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function CasesSection() {
  const [openCase, setOpenCase] = useState<typeof CASES[0] | null>(null)

  return (
    <section id="cases" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">🎁 Открытие кейсов</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Выбирай кейс и крути — внутри скины от Mil-Spec до легендарных ножей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CASES.map((c) => (
            <div
              key={c.id}
              className={`relative rounded-2xl border bg-gradient-to-b ${c.gradient} ${c.border} shadow-lg ${c.glow} hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden`}
              onClick={() => setOpenCase(c)}
            >
              <div className="p-6 flex flex-col items-center gap-4">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                  {c.emoji}
                </div>
                <div className="text-center">
                  <h3 className="text-white font-bold text-lg font-orbitron">{c.name}</h3>
                  <div className="mt-1">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40 font-orbitron text-sm">
                      🪙 {c.price}
                    </Badge>
                  </div>
                </div>

                <div className="w-full space-y-1">
                  {c.skins.slice(0, 3).map((skinId) => {
                    const skin = SKINS.find((s) => s.id === skinId)!
                    return (
                      <div key={skinId} className="flex items-center gap-2 text-xs">
                        <span>{skin.emoji}</span>
                        <span className="text-gray-300 truncate flex-1">{skin.name.split(" | ")[1]}</span>
                        <span className="font-bold" style={{ color: RARITY_COLORS[skin.rarity], fontSize: 9 }}>
                          {RARITY_LABELS[skin.rarity]}
                        </span>
                      </div>
                    )
                  })}
                  <div className="text-gray-500 text-xs text-center">+{c.skins.length - 3} скина</div>
                </div>

                <Button
                  className="w-full bg-red-600/80 hover:bg-red-500 text-white font-orbitron text-sm group-hover:bg-red-500 transition-colors"
                  size="sm"
                >
                  Открыть
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openCase && <CaseOpenModal caseData={openCase} onClose={() => setOpenCase(null)} />}
    </section>
  )
}
