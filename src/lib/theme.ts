const STORAGE_KEY = 'manuals-profile-theme'

export type ThemeMode = 'light' | 'dark'

export function getInitialTheme(): ThemeMode {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  const prefersDark =
    typeof globalThis !== 'undefined' && 'matchMedia' in globalThis
      ? (globalThis.matchMedia as (q: string) => MediaQueryList)('(prefers-color-scheme: dark)').matches
      : false
  return prefersDark ? 'dark' : 'light'
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  if (mode === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
  localStorage.setItem(STORAGE_KEY, mode)
}
