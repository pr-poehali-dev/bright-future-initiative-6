import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-md border-b border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="font-orbitron text-xl font-bold text-white">
              Case<span className="text-red-500">Drop</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <a
              href="#cases"
              className="font-geist text-white hover:text-red-500 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-red-500/10"
            >
              🎁 Кейсы
            </a>
            <a
              href="#upgrade"
              className="font-geist text-white hover:text-red-500 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-red-500/10"
            >
              ⚡ Апгрейд
            </a>
            <a
              href="#contracts"
              className="font-geist text-white hover:text-red-500 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-red-500/10"
            >
              📋 Контракт
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <span className="text-yellow-400 text-sm font-bold font-orbitron">🪙 250</span>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-500 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/98 border-t border-red-500/20">
              <a
                href="#cases"
                className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                🎁 Кейсы
              </a>
              <a
                href="#upgrade"
                className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                ⚡ Апгрейд
              </a>
              <a
                href="#contracts"
                className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                📋 Контракт
              </a>
              <div className="px-3 py-2">
                <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg px-3 py-2 flex items-center gap-2 w-fit">
                  <span className="text-yellow-400 text-sm font-bold font-orbitron">🪙 250 монет</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
