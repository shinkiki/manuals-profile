import type { PropsWithChildren } from 'react'

export function Section({ id, title, children }: PropsWithChildren<{ id: string; title: string }>) {
  return (
    <section id={id} className="scroll-mt-24 py-14 sm:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>
      {children}
    </section>
  )
}
