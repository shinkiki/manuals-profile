import type { PropsWithChildren } from 'react'

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      {children}
    </span>
  )
}
