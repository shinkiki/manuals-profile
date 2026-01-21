import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Container from './Container'

const navItems = [
  { id: 'about', label: '소개' },
  { id: 'tech', label: '기술' },
  { id: 'projects', label: '포트폴리오' },
  { id: 'contact', label: '연락처' },
] as const

type SectionId = (typeof navItems)[number]['id']

export function Nav({
  right,
  onSection,
  onHome,
  onCareer,
}: Readonly<{
  right?: ReactNode
  onSection?: (id: SectionId) => void
  onHome?: () => void
  onCareer?: () => void
}>) {
  const [isOpen, setIsOpen] = useState(false)

  const handleMobileNavClick = (callback?: () => void) => {
    setIsOpen(false)
    callback?.()
  }

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70">
      <Container>
        <div className="flex h-14 items-center justify-between gap-3">
          <button
            type="button"
            onClick={onHome}
            className="font-semibold tracking-tight"
            aria-label="홈으로"
          >
            Portfolio
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-4 sm:flex" aria-label="주요 섹션">
            {navItems.map((i) => (
              <button
                key={i.id}
                type="button"
                onClick={() => onSection?.(i.id)}
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                {i.label}
              </button>
            ))}

            <button
              type="button"
              onClick={onCareer}
              className="text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white"
            >
              경력기술서
            </button>

            <Link
              to="/print"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              PDF
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {right}

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="ml-2 rounded-md p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 sm:hidden dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="메뉴 열기"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <nav className="absolute left-0 top-full w-full border-b border-zinc-200 bg-zinc-50/95 px-2 py-4 shadow-lg backdrop-blur-sm sm:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
            <ul className="flex flex-col gap-2">
              {navItems.map((i) => (
                <li key={i.id}>
                  <button
                    type="button"
                    onClick={() => handleMobileNavClick(() => onSection?.(i.id))}
                    className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  >
                    {i.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => handleMobileNavClick(onCareer)}
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                  경력기술서
                </button>
              </li>
              <li>
                <Link
                  to="/print"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                  PDF 다운로드
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  )
}
