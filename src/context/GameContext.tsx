import { createContext, useContext, useState, ReactNode } from "react"

export type Skin = {
  id: number
  name: string
  rarity: "mil-spec" | "restricted" | "classified" | "covert" | "knife"
  color: string
  image: string
  price: number
  uid?: string
}

export const RARITY_COLORS: Record<string, string> = {
  "mil-spec": "#4b69ff",
  restricted: "#8847ff",
  classified: "#eb4b4b",
  covert: "#e4ae39",
  knife: "#ffd700",
}

export const RARITY_LABELS: Record<string, string> = {
  "mil-spec": "Mil-Spec",
  restricted: "Restricted",
  classified: "Classified",
  covert: "Covert",
  knife: "★ Особый",
}

export const ALL_SKINS: Skin[] = [
  { id: 1,  name: "P250 | Asiimov",           rarity: "mil-spec",   color: "#4b69ff", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 15 },
  { id: 2,  name: "FAMAS | Mecha Industries", rarity: "mil-spec",   color: "#4b69ff", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 8 },
  { id: 3,  name: "Glock | Water Elemental",  rarity: "restricted", color: "#8847ff", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 35 },
  { id: 4,  name: "MP5 | Whiteout",           rarity: "restricted", color: "#8847ff", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 45 },
  { id: 5,  name: "AK-47 | Redline",          rarity: "classified", color: "#eb4b4b", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 120 },
  { id: 6,  name: "USP-S | Neo-Noir",         rarity: "classified", color: "#eb4b4b", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 95 },
  { id: 7,  name: "AK-47 | Vulcan",           rarity: "classified", color: "#eb4b4b", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 180 },
  { id: 8,  name: "M4A4 | Asiimov",           rarity: "covert",    color: "#e4ae39", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 280 },
  { id: 9,  name: "Desert Eagle | Blaze",     rarity: "covert",    color: "#e4ae39", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 450 },
  { id: 10, name: "MP9 | Hot Rod",            rarity: "covert",    color: "#e4ae39", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 340 },
  { id: 11, name: "AWP | Dragon Lore",        rarity: "knife",     color: "#ffd700", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 1200 },
  { id: 12, name: "★ Нож | Butterfly",        rarity: "knife",     color: "#ffd700", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 2800 },
  { id: 13, name: "★ Перчатки | Fade",        rarity: "knife",     color: "#ffd700", image: "https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEOAkjhHISIGKoFZB9vQoSBL-I7wbMKJ5RFIDGkfQE9NCMMMCxAb2qLOGIJAvUZCGdNqBJTnzNuCivh-a4rQFT5rfVMO4YpTAdV-A/360fx360f", price: 1800 },
]

type GameContextType = {
  coins: number
  inventory: Skin[]
  spendCoins: (amount: number) => boolean
  addCoins: (amount: number) => void
  addToInventory: (skin: Skin) => void
  removeFromInventory: (uid: string) => void
  sellSkin: (uid: string) => void
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState(250)
  const [inventory, setInventory] = useState<Skin[]>([])

  const spendCoins = (amount: number): boolean => {
    if (coins < amount) return false
    setCoins((c) => c - amount)
    return true
  }

  const addCoins = (amount: number) => setCoins((c) => c + amount)

  const addToInventory = (skin: Skin) => {
    const entry = { ...skin, uid: `${skin.id}-${Date.now()}-${Math.random()}` }
    setInventory((inv) => [entry, ...inv])
  }

  const removeFromInventory = (uid: string) => {
    setInventory((inv) => inv.filter((s) => s.uid !== uid))
  }

  const sellSkin = (uid: string) => {
    const skin = inventory.find((s) => s.uid === uid)
    if (!skin) return
    removeFromInventory(uid)
    addCoins(Math.floor(skin.price * 0.7))
  }

  return (
    <GameContext.Provider value={{ coins, inventory, spendCoins, addCoins, addToInventory, removeFromInventory, sellSkin }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGame must be inside GameProvider")
  return ctx
}
