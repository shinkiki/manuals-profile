import { useEffect } from 'react'

export function ImageModal({
  open,
  src,
  alt,
  onClose,
}: Readonly<{
  open: boolean
  src: string
  alt: string
  onClose: () => void
}>) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="닫기"
        onClick={onClose}
      />

      <div className="relative mx-4 w-full max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">{alt}</p>
              <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-300">원본 보기</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              닫기
            </button>
          </div>

          <div className="max-h-[80dvh] overflow-auto bg-zinc-50 p-2 dark:bg-zinc-950">
            <img src={src} alt={alt} className="h-auto w-full rounded-xl object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}
