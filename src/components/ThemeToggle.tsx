import { useEffect, useMemo, useState } from 'react'
import { applyTheme, getInitialTheme, type ThemeMode } from '../lib/theme'

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('light')

  const label = useMemo(() => (mode === 'dark' ? '다크' : '라이트'), [mode])

  useEffect(() => {
    const initial = getInitialTheme()
    setMode(initial)
    applyTheme(initial)
  }, [])

  function toggle() {
    const next: ThemeMode = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    applyTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      aria-label={`테마 전환 (현재: ${label})`}
    >
      <span className="hidden sm:inline">테마</span>
      <span aria-hidden="true" className="text-xs">
        {label}
      </span>
    </button>
  )
}
