import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const SKINS = [
  { id: 1, name: "P250 | Asiimov", rarity: "mil-spec", color: "#4b69ff", emoji: "🔵", price: 15 },
  { id: 2, name: "Glock | Water Elemental", rarity: "restricted", color: "#8847ff", emoji: "🟣", price: 35 },
  { id: 3, name: "AK-47 | Redline", rarity: "classified", color: "#eb4b4b", emoji: "🔴", price: 120 },
  { id: 4, name: "USP | Neo-Noir", rarity: "classified", color: "#eb4b4b", emoji: "🔴", price: 95 },
  { id: 5, name: "AK-47 | Vulcan", rarity: "classified", color: "#eb4b4b", emoji: "🔴", price: 180 },
  { id: 6, name: "M4A4 | Asiimov", rarity: "covert", color: "#e4ae39", emoji: "🟠", price: 280 },
  { id: 7, name: "Desert Eagle | Blaze", rarity: "covert", color: "#e4ae39", emoji: "🟡", price: 450 },
  { id: 8, name: "MP9 | Hot Rod", rarity: "covert", color: "#e4ae39", emoji: "🟠", price: 340 },
  { id: 9, name: "AWP | Dragon Lore", rarity: "knife", color: "#ffd700", emoji: "🟡", price: 1200 },
  { id: 10, name: "Нож | Butterfly", rarity: "knife", color: "#ffd700", emoji: "⭐", price: 2800 },
  { id: 11, name: "Перчатки | Fade", rarity: "knife", color: "#ffd700", emoji: "⭐", price: 1800 },
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

type UpgradePhase = "idle" | "spinning" | "win" | "lose"

function SkinCard({
  skin,
  selected,
  onClick,
  label,
}: {
  skin: typeof SKINS[0] | null
  selected?: boolean
  onClick?: () => void
  label: string
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-all duration-200 min-h-[160px] justify-center
        ${onClick ? "cursor-pointer hover:scale-105" : ""}
        ${selected ? "scale-105" : ""}
        ${skin ? "" : "border-dashed border-zinc-700 bg-zinc-900/50"}
      `}
      style={
        skin
          ? {
              borderColor: RARITY_COLORS[skin.rarity] + "80",
              background: RARITY_COLORS[skin.rarity] + "12",
              boxShadow: selected ? `0 0 20px ${RARITY_COLORS[skin.rarity]}40` : "none",
            }
          : {}
      }
    >
      {skin ? (
        <>
          <span className="text-5xl">{skin.emoji}</span>
          <div className="text-center">
            <div className="text-white font-bold text-sm leading-tight">{skin.name}</div>
            <div className="text-xs mt-1 font-bold" style={{ color: RARITY_COLORS[skin.rarity] }}>
              {RARITY_LABELS[skin.rarity]}
            </div>
            <div className="text-gray-400 text-xs mt-1">~{skin.price}₽</div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="text-4xl mb-2">➕</div>
          <div className="text-gray-500 text-sm">{label}</div>
        </div>
      )}
    </div>
  )
}

export function UpgradeSection() {
  const [fromSkin, setFromSkin] = useState<typeof SKINS[0] | null>(null)
  const [toSkin, setToSkin] = useState<typeof SKINS[0] | null>(null)
  const [phase, setPhase] = useState<UpgradePhase>("idle")
  const [chance, setChance] = useState(50)
  const [selectingFor, setSelectingFor] = useState<"from" | "to" | null>(null)
  const [spinAngle, setSpinAngle] = useState(0)
  const [resultAngle, setResultAngle] = useState(0)

  const winZoneSize = (chance / 100) * 360

  const availableTo = fromSkin ? SKINS.filter((s) => s.price > fromSkin.price * (100 / chance - 0.1)) : SKINS

  const upgrade = () => {
    if (!fromSkin || !toSkin || phase === "spinning") return
    setPhase("spinning")

    const spins = 1440 + Math.random() * 720
    const winLandMin = 270 - winZoneSize / 2
    const winLandMax = 270 + winZoneSize / 2
    const loseLandMin = 90 + winZoneSize / 2 + 10
    const loseLandMax = 270 - winZoneSize / 2 - 10

    const win = Math.random() * 100 < chance
    let landAngle: number
    if (win) {
      landAngle = winLandMin + Math.random() * (winLandMax - winLandMin)
    } else {
      if (loseLandMax > loseLandMin) {
        landAngle = loseLandMin + Math.random() * (loseLandMax - loseLandMin)
      } else {
        landAngle = 90
      }
    }

    const finalAngle = spins + landAngle
    setSpinAngle(finalAngle)
    setResultAngle(landAngle % 360)

    setTimeout(() => {
      setPhase(win ? "win" : "lose")
    }, 3500)
  }

  const reset = () => {
    setPhase("idle")
    setSpinAngle(0)
    setResultAngle(0)
  }

  return (
    <section id="upgrade" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">⚡ Апгрейд скинов</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Прокачай свой скин до более дорогого. Выбери шанс и испытай удачу!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-10">
          <div>
            <div className="text-center text-gray-400 text-sm mb-3 font-orbitron uppercase tracking-wider">Ваш скин</div>
            <SkinCard
              skin={fromSkin}
              selected={selectingFor === "from"}
              label="Выбрать скин"
              onClick={() => setSelectingFor(selectingFor === "from" ? null : "from")}
            />
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="relative" style={{ width: 200, height: 200 }}>
              <svg width="200" height="200" viewBox="0 0 200 200" className="absolute inset-0">
                <circle cx="100" cy="100" r="88" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                <path
                  d={describeArc(100, 100, 88, 270 - winZoneSize / 2, 270 + winZoneSize / 2)}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="100" r="70" fill="#09090b" />
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="20"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: "100px 100px",
                    transform: `rotate(${phase === "spinning" ? spinAngle : resultAngle}deg)`,
                    transition:
                      phase === "spinning"
                        ? "transform 3.5s cubic-bezier(0.05,0.9,0.3,1)"
                        : "none",
                  }}
                />
                <circle cx="100" cy="100" r="8" fill="white" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {phase === "win" && <span className="text-3xl">✅</span>}
                {phase === "lose" && <span className="text-3xl">❌</span>}
              </div>
            </div>

            <div className="w-full text-center">
              <div className="text-gray-400 text-sm mb-2">Шанс апгрейда: <span className="text-green-400 font-bold text-lg">{chance}%</span></div>
              <Slider
                min={5}
                max={75}
                step={5}
                value={[chance]}
                onValueChange={([v]) => { setChance(v); reset() }}
                className="w-full"
                disabled={phase === "spinning"}
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>5%</span>
                <span>75%</span>
              </div>
            </div>

            {phase === "idle" && (
              <Button
                onClick={upgrade}
                disabled={!fromSkin || !toSkin}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-orbitron py-5 text-lg disabled:opacity-40"
              >
                Апгрейд!
              </Button>
            )}
            {phase === "spinning" && (
              <Button disabled className="w-full font-orbitron py-5 text-lg">
                Крутим...
              </Button>
            )}
            {phase === "win" && (
              <div className="text-center w-full">
                <div className="text-green-400 font-bold text-xl mb-3 font-orbitron">🎉 Апгрейд удался!</div>
                <Button onClick={reset} className="w-full bg-red-600 hover:bg-red-500 text-white font-orbitron py-4">
                  Играть снова
                </Button>
              </div>
            )}
            {phase === "lose" && (
              <div className="text-center w-full">
                <div className="text-red-400 font-bold text-xl mb-3 font-orbitron">💔 Не повезло...</div>
                <Button onClick={reset} className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-orbitron py-4">
                  Попробовать ещё
                </Button>
              </div>
            )}
          </div>

          <div>
            <div className="text-center text-gray-400 text-sm mb-3 font-orbitron uppercase tracking-wider">Цель</div>
            <SkinCard
              skin={toSkin}
              selected={selectingFor === "to"}
              label="Выбрать цель"
              onClick={() => setSelectingFor(selectingFor === "to" ? null : "to")}
            />
          </div>
        </div>

        {selectingFor && (
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
            <div className="text-white font-bold mb-4 font-orbitron">
              {selectingFor === "from" ? "Выберите ваш скин:" : `Выберите цель (дороже ~${fromSkin ? Math.round(fromSkin.price * (100/chance - 0.1)) : 0}₽):`}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {(selectingFor === "to" ? availableTo : SKINS).map((skin) => (
                <div
                  key={skin.id}
                  onClick={() => {
                    if (selectingFor === "from") { setFromSkin(skin); setToSkin(null) }
                    else setToSkin(skin)
                    setSelectingFor(null)
                    reset()
                  }}
                  className="rounded-xl border p-3 flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-all"
                  style={{ borderColor: RARITY_COLORS[skin.rarity] + "60", background: RARITY_COLORS[skin.rarity] + "10" }}
                >
                  <span className="text-3xl">{skin.emoji}</span>
                  <span className="text-white text-xs text-center leading-tight">{skin.name}</span>
                  <span className="text-xs font-bold" style={{ color: RARITY_COLORS[skin.rarity] }}>~{skin.price}₽</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const x1 = cx + r * Math.cos(toRad(startAngle))
  const y1 = cy + r * Math.sin(toRad(startAngle))
  const x2 = cx + r * Math.cos(toRad(endAngle))
  const y2 = cy + r * Math.sin(toRad(endAngle))
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}
