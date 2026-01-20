import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import { Badge } from '../components/Badge'
import { career } from '../data/career'

function BlockTitle({ children }: Readonly<{ children: string }>) {
  return <h2 className="text-base font-semibold tracking-tight">{children}</h2>
}

function Card({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <div className="rounded-xl border border-zinc-200/60 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
      <BlockTitle>{title}</BlockTitle>
      <div className="mt-2">{children}</div>
    </div>
  )
}

type TimelinePhase = {
  label: string
  period: string
  current?: boolean
}

const timeline: TimelinePhase[] = [
  { label: '시작', period: '2002.03 ~ 2012.12' },
  { label: '타임소프트', period: '2013.03 ~ 2018.12' },
  { label: '프리랜서', period: '2019.01 ~ 2022.04' },
  { label: 'GSITM', period: '2022.04 ~ 2025.02' },
  { label: 'GS비즈플', period: '2025.02 ~ 현재', current: true },
]

// 타임라인 구간(재직 형태)과 실제 프로젝트 회사명을 연결합니다.
// 필요하면 여기만 수정해서 화면의 회사별 묶음을 쉽게 조정할 수 있습니다.
const phaseToCompanies: Record<string, string[]> = {
  시작: ['한국교육과정평가원', 'COMNEX', '레코피스'],
  타임소프트: ['타임소프트'],
  프리랜서: ['삼정회계법인', 'IBK시스템'],
  GSITM: ['에치와이', 'GS리테일'],
  GS비즈플: ['GS비즈플'],
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function CareerPage() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Layout에서 전달된 스크롤 요청 처리
    if ((location.state as any)?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // 상태 초기화 (새로고침 시 스크롤 방지 등)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const phaseCards = useMemo(() => {
    return timeline.map((phase) => {
      const companies = phaseToCompanies[phase.label] ?? [phase.label]
      const entries = career
        .map((item, idx) => ({ item, idx }))
        .filter(({ item }) => companies.includes(item.company))

      const byCompany = entries.reduce<Record<string, Array<{ item: (typeof career)[number]; idx: number }>>>(
        (acc, e) => {
          if (!acc[e.item.company]) acc[e.item.company] = []
          acc[e.item.company].push(e)
          return acc
        },
        {},
      )

      const orderedCompanies = companies.filter((c) => byCompany[c]?.length)
      const additionalCompanies = Object.keys(byCompany).filter((c) => !orderedCompanies.includes(c))
      const companyOrder = [...orderedCompanies, ...additionalCompanies]

      return {
        phase,
        companies,
        entries,
        byCompany,
        companyOrder,
      }
    })
  }, [])

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
              <span>홈</span>
            </Link>
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">경력기술서</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            수행 프로젝트/역할/환경/특이사항을 프로젝트 단위로 정리했습니다.
          </p>

          {/* 상단 타임라인 */}
          <section className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">경력 타임라인</h2>
            </div>
            <div className="mt-4 overflow-x-auto pb-2">
              <ol className="relative flex w-full flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-zinc-200 bg-white px-5 py-5 dark:border-zinc-800 dark:bg-zinc-900">
                {timeline.map((t, idx) => {
                  const isLast = idx === timeline.length - 1
                  const node = (
                    <div className="relative flex h-10 w-10 items-center justify-center">
                      {t.current ? (
                        <>
                          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-[10px] font-semibold text-white">
                            현재
                          </span>
                        </>
                      ) : (
                        <span className="inline-flex h-3.5 w-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      )}
                    </div>
                  )

                  return (
                    <li key={`${t.label}-${t.period}`} className="flex min-w-[180px] flex-1 items-center">
                      {node}
                      <div className="min-w-0 pr-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.label}</span>
                        </div>
                        <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-300">{t.period}</div>
                      </div>

                      {isLast ? null : <div className="mx-2 h-px flex-1 bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />}
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>

          {/* 재직회사(타임라인 구간)별 프로젝트 요약 */}
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">프로젝트</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              재직 구간별로 진행 프로젝트를 모아봤습니다. 제목을 클릭하면 아래 상세로 이동합니다.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-flow-col sm:auto-cols-fr">
              {phaseCards.map(({ phase, entries, byCompany, companyOrder }) => {
                const multiCompany = companyOrder.length > 1
                return (
                  <div
                    key={`${phase.label}-${phase.period}`}
                    className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{phase.label}</div>
                        <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-300">{phase.period}</div>
                      </div>
                      {phase.current ? (
                        <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                          현재
                        </span>
                      ) : null}
                    </div>

                    {entries.length ? (
                      <div className="mt-4 space-y-4">
                        {companyOrder.map((company) => {
                          const list = byCompany[company] ?? []
                          if (!list.length) return null
                          return (
                            <div key={company} className="space-y-2">
                              {multiCompany ? (
                                <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">{company}</div>
                              ) : null}
                              <ul className="space-y-2">
                                {list.map(({ item, idx }) => {
                                  const id = `career-${idx}`
                                  return (
                                    <li key={id}>
                                      <button
                                        type="button"
                                        onClick={() => scrollToId(id)}
                                        className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-left text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/20 dark:text-zinc-100 dark:hover:bg-zinc-800"
                                      >
                                        <div className="truncate">{item.title}</div>
                                        <div className="mt-1 text-xs font-normal text-zinc-600 dark:text-zinc-300">{item.period}</div>
                                      </button>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">등록된 프로젝트가 없습니다.</p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          <div className="mt-8 grid gap-6">
            {career.map((c, idx) => (
              <article
                key={`${c.company}-${c.title}-${c.period}`}
                id={`career-${idx}`}
                className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-soft dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">{c.title}</h2>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {c.company} · {c.period}
                    </p>
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">역할</p>
                      <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{c.role ?? '개발'}</p>
                        {c.duty ? (
                          <p className="text-sm text-zinc-700 dark:text-zinc-200">
                            <span aria-hidden="true">—</span> <span>{c.duty}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 카드들은 row당 1개만: 세로 스택 */}
                <div className="mt-5 flex flex-col gap-5">

                  {c.scope?.length ? (
                    <Card title="업무">
                      <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-200">
                        {c.scope.map((s) => (
                          <li key={s}>• {s}</li>
                        ))}
                      </ul>
                    </Card>
                  ) : null}

                  {c.environment?.length ? (
                    <Card title="환경">
                      <div className="flex flex-wrap gap-2">
                        {c.environment.map((e) => (
                          <Badge key={e}>{e}</Badge>
                        ))}
                      </div>
                    </Card>
                  ) : null}

                  {c.notes?.length ? (
                    <Card title="핵심 포인트">
                      <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-200">
                        {c.notes.map((n) => (
                          <li key={n}>• {n}</li>
                        ))}
                      </ul>
                    </Card>
                  ) : null}

                  {c.subCards?.length ? (
                    <Card title="세부 경력">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {c.subCards.map((sub) => (
                          <div
                            key={`${sub.title}-${sub.period}`}
                            className="rounded-xl border border-zinc-200/70 bg-white p-3 text-sm text-zinc-700 shadow-soft dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-200"
                          >
                            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{sub.title}</div>
                            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{sub.period}</div>
                            {(sub.role || sub.duty) && (
                              <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">
                                {sub.role ? <span className="font-semibold">{sub.role}</span> : null}
                                {sub.role && sub.duty ? <span aria-hidden="true"> · </span> : null}
                                {sub.duty ? <span>{sub.duty}</span> : null}
                              </div>
                            )}
                            {sub.notes?.length ? (
                              <ul className="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
                                {sub.notes.map((note) => (
                                  <li key={note}>• {note}</li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </Card>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </main>
  )
}
