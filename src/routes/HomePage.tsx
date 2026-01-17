import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { profile } from '../data/profile'
import Container from '../components/Container'
import { Section } from '../components/Section'
import { Badge } from '../components/Badge'
import { withBaseUrl } from '../lib/url'
import { ImageModal } from '../components/ImageModal'

function ExternalLink({ href, children }: Readonly<{ href: string; children: ReactNode }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null)

  const techGroups = useMemo(() => {
    const main: string[] = []
    const used: Record<string, string[]> = {
      Backend: [],
      Frontend: [],
      DevOps: [],
      Mobile: [],
      Etc: [],
    }
    const learning: string[] = []

    for (const t of profile.tech) {
      if (t.level === 'main') {
        main.push(t.name)
      } else if (t.level === 'learning') {
        learning.push(t.name)
      } else {
        // level === 'used'
        const cat = t.category || 'Etc'
        const key = cat.charAt(0).toUpperCase() + cat.slice(1) // 첫 글자 대문자 변환
        if (!used[key]) used[key] = []
        used[key].push(t.name)
      }
    }

    return { main, used, learning }
  }, [])

  // Nav에서 state로 전달된 스크롤 요청 처리
  // (HashRouter를 쓰기 때문에 URL 앵커(#about) 대신 state 기반 스크롤)
  useEffect(() => {
    const st = location.state as { scrollTo?: string } | null
    if (!st?.scrollTo) return

    // 렌더 후 스크롤
    requestAnimationFrame(() => {
      scrollToSection(st.scrollTo!)
      navigate('.', { replace: true, state: null })
    })
  }, [location.state, navigate])

  // 프로젝트 상세 페이지에서 뒤로가기 시 스크롤 위치 복원
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('home_scroll_y')
    if (savedScroll) {
      const y = parseInt(savedScroll, 10)
      window.scrollTo(0, y)
      // 특정 스크롤 위치 삭제 (일회성 복원)
      sessionStorage.removeItem('home_scroll_y')
    }
  }, [])

  return (
    <main>
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid items-start gap-10 sm:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{profile.jobTitle || profile.name}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">{profile.headline}</h1>
              <p className="mt-5 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-200">{profile.intro}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  포트폴리오
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  연락하기
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
              {profile.avatar ? (
                <div className="mb-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setModalImage({ src: withBaseUrl(profile.avatar!.src), alt: profile.avatar!.alt })}
                    className="group relative"
                    aria-label="프로필 사진 원본 보기"
                  >
                    <img
                      src={withBaseUrl(profile.avatar.src)}
                      alt={profile.avatar.alt}
                      className="h-24 w-24 rounded-2xl border border-zinc-200 bg-zinc-50 object-cover shadow-soft transition-transform group-hover:scale-[1.02] dark:border-zinc-800 dark:bg-zinc-950"
                      loading="lazy"
                    />
                    <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-blue-500/0 transition group-hover:ring-4 group-hover:ring-blue-500/10" />
                  </button>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Profile</p>
                    <p className="truncate text-3xl font-bold text-zinc-900 dark:text-zinc-100">{profile.name}</p>
                  </div>
                </div>
              ) : null}

              <ImageModal
                open={!!modalImage}
                src={modalImage?.src ?? ''}
                alt={modalImage?.alt ?? '이미지'}
                onClose={() => setModalImage(null)}
              />

              <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                {profile.goals.map((g) => (
                  <li key={g} className="flex gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    <span dangerouslySetInnerHTML={{ __html: g }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <Section id="about" title="소개">
          <div className="grid gap-6 sm:grid-cols-2">
            {profile.selfIntroduction?.length ? (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:col-span-2 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-base font-semibold">자기소개</h3>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                  {profile.selfIntroduction.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-semibold">목적</h3>
              {profile.sitePurpose ? (
                <p
                  className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200"
                  dangerouslySetInnerHTML={{ __html: profile.sitePurpose }}
                />
              ) : null}

            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-semibold">기술적 기준</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                {profile.techStandards?.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="tech" title="기술 스택">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-semibold">주력</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {techGroups.main.length ? techGroups.main.map((t) => <Badge key={t}>{t}</Badge>) : <p className="text-sm">-</p>}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-semibold">사용 경험</h3>
              <div className="mt-4 flex flex-col gap-4">
                {Object.entries(techGroups.used).map(([category, items]) => {
                  if (items.length === 0) return null
                  return (
                    <div key={category}>
                      <h4 className="mb-2 text-xs font-medium text-zinc-500">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-semibold">학습 중</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {techGroups.learning.length ? (
                  techGroups.learning.map((t) => <Badge key={t}>{t}</Badge>)
                ) : (
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">현재는 학습 중인 항목이 없습니다.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-base font-semibold">노트</h3>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-700 dark:text-zinc-200 sm:grid-cols-2">
              {profile.tech
                .filter((t) => t.note)
                .map((t) => (
                  <li key={t.name} className="flex gap-2">
                    <span className="min-w-0">
                      <b className="font-semibold">{t.name}</b>
                      <span className="text-zinc-600 dark:text-zinc-300"> — {t.note}</span>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </Section>

        <Section id="projects" title="포트폴리오(개인프로젝트)">
          <div className="grid gap-6">
            {profile.projects.map((p) => (
              <article
                key={p.slug}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-soft dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col p-6">
                    <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{p.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{p.oneLiner}</p>

                    <div className="mt-6 space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                          Purpose
                        </p>
                        <div className="space-y-2">
                          {Array.isArray(p.purpose) ? (
                            p.purpose.map((line, i) => (
                              <p key={i} className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                {line}
                              </p>
                            ))
                          ) : (
                            <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{p.purpose}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                          Tech Stack
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {p.tech.map((t) => (
                            <Badge key={t}>{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            sessionStorage.setItem('home_scroll_y', window.scrollY.toString())
                            navigate(`/project/${p.slug}`)
                          }}
                          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                          자세히 보기
                        </button>
                        {p.links?.map((l) => (
                          <div key={l.href} className="flex items-center">
                            <ExternalLink href={l.href}>{l.label}</ExternalLink>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {p.images?.[0] ? (
                    <div className="flex items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950 sm:border-l sm:border-zinc-200 sm:dark:border-zinc-800">
                      <button
                        type="button"
                        onClick={() =>
                          setModalImage({
                            src: p.images![0].src,
                            alt: p.images![0].alt,
                          })
                        }
                        className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/5 transition-transform hover:scale-[1.02] dark:border-zinc-800 dark:bg-zinc-900 dark:ring-white/10"
                        aria-label="크게 보기"
                      >
                        <img
                          src={withBaseUrl(p.images[0].src)}
                          alt={p.images[0].alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
                      </button>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" title="연락처">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-base font-semibold">Link</h3>

            <div className="mt-4 flex flex-wrap gap-4">
              {profile.contact.email ? <ExternalLink href={`mailto:${profile.contact.email}`}>Email</ExternalLink> : null}
              {profile.contact.github ? <ExternalLink href={profile.contact.github}>GitHub</ExternalLink> : null}
              {profile.contact.blog ? <ExternalLink href={profile.contact.blog}>Blog</ExternalLink> : null}
              {profile.contact.linkedin ? <ExternalLink href={profile.contact.linkedin}>LinkedIn</ExternalLink> : null}
            </div>
          </div>
        </Section>

        <footer className="py-10">
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">© {new Date().getFullYear()} {profile.name}. Built with Vite + React.</p>
        </footer>
      </Container>
    </main>
  )
}
