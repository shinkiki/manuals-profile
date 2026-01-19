import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from '../components/Container'
import { Badge } from '../components/Badge'
import { profile } from '../data/profile'
import { withBaseUrl } from '../lib/url'
import { ImageModal } from '../components/ImageModal'

function NotFoundProject() {
  return (
    <main>
      <Container>
        <div className="py-14">
          <h1 className="text-2xl font-semibold tracking-tight">프로젝트를 찾을 수 없어요</h1>
          <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-200">
            주소가 잘못되었거나, 데이터에서 slug가 변경되었을 수 있습니다.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              <span aria-hidden="true">←</span>
              <span>홈으로</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const project = useMemo(() => profile.projects.find((p) => p.slug === slug), [slug])

  if (!project) return <NotFoundProject />

  return (
    <main>
      <Container>
        <div className="py-10 sm:py-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              <span aria-hidden="true">←</span>
              <span>목록</span>
            </Link>
          </div>

          <h1 className="mt-6 flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
            {project.status === 'in-progress' && (
              <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2.5 py-1 text-sm font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20 dark:text-yellow-400">
                진행중
              </span>
            )}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{project.oneLiner}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm font-semibold">목적</p>
              {Array.isArray(project.purpose) ? (
                project.purpose.map((line, i) => (
                  <p key={i} className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                    {line}
                  </p>
                ))
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">{project.purpose}</p>
              )}
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm font-semibold">역할</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">{project.role}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-semibold">기술</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-semibold">하이라이트</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.images?.length ? (
            <div className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">이미지</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {project.images.map((img) => (
                  <figure
                    key={img.src}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-soft dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <button
                      type="button"
                      onClick={() => setModalImage({ src: withBaseUrl(img.src), alt: img.alt })}
                      className="group block w-full"
                      aria-label="이미지 원본 보기"
                    >
                      <img
                        src={withBaseUrl(img.src)}
                        alt={img.alt}
                        loading="lazy"
                        className="h-auto w-full bg-zinc-50 object-cover transition-transform group-hover:scale-[1.01] dark:bg-zinc-950"
                      />
                    </button>
                    {(img.caption || img.alt) && (
                      <figcaption className="border-t border-zinc-200 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-200">
                        {Array.isArray(img.caption) ? (
                          <ul className="space-y-1">
                            {img.caption.map((c) => (
                              <li key={c}>{c.startsWith('-') ? c : `- ${c}`}</li>
                            ))}
                          </ul>
                        ) : (
                          <div>{img.caption ?? img.alt}</div>
                        )}

                        {img.descriptions?.length ? (
                          <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-200">
                            {img.descriptions.map((d) => (
                              <li key={d}>- {d}</li>
                            ))}
                          </ul>
                        ) : null}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>

              <ImageModal
                open={!!modalImage}
                src={modalImage?.src ?? ''}
                alt={modalImage?.alt ?? '이미지'}
                onClose={() => setModalImage(null)}
              />
            </div>
          ) : null}

          {project.links?.length ? (
            <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-base font-semibold">링크</h2>
              <div className="mt-4 flex flex-wrap gap-4">
                {project.links.map((l) => (
                  <div key={l.href} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
                    >
                      {l.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                    {l.details && <span className="text-sm text-zinc-500 dark:text-zinc-400">({l.details})</span>}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </main>
  )
}
