import Container from './Container'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

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

          <div className="flex items-center gap-2">{right}</div>
        </div>
      </Container>
    </header>
  )
}
