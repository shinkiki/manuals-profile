import { useEffect } from 'react'
import { profile } from '../data/profile'
import { career } from '../data/career'
import { Badge } from '../components/Badge'

export default function PrintPage() {
    useEffect(() => {
        // 자동 인쇄 다이얼로그 호출 (선택 사항)
        // window.print()
    }, [])

    return (
        <div className="mx-auto max-w-[210mm] bg-white p-[10mm] text-zinc-900 print:p-0">
            {/* 화면에서만 보이는 인쇄 버튼 */}
            <div className="mb-8 flex justify-end print:hidden">
                <button
                    onClick={() => window.print()}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    PDF로 저장 / 인쇄
                </button>
            </div>

            {/* 헤더 */}
            <header className="mb-8 border-b border-zinc-200 pb-6">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="mt-1 text-lg text-zinc-600">{profile.headline}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-600">
                    {profile.contact.email && <span>📧 {profile.contact.email}</span>}
                    {profile.contact.github && <span>🔗 {profile.contact.github}</span>}
                    {profile.contact.blog && <span>📝 {profile.contact.blog}</span>}
                </div>
            </header>

            {/* 소개 */}
            <section className="mb-8">
                <h2 className="mb-3 text-xl font-bold border-b border-zinc-100 pb-1">자기소개</h2>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
                    {profile.intro}
                </p>
                {profile.selfIntroduction && (
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
                        {profile.selfIntroduction.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                )}
            </section>

            {/* 기술 스택 */}
            <section className="mb-8">
                <h2 className="mb-3 text-xl font-bold border-b border-zinc-100 pb-1">기술 스택</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="mb-2 text-sm font-semibold">주력 (Main)</h3>
                        <div className="flex flex-wrap gap-1">
                            {profile.tech.filter(t => t.level === 'main').map(t => (
                                <Badge key={t.name}>{t.name}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-2 text-sm font-semibold">활용 (Used)</h3>
                        <div className="flex flex-wrap gap-1">
                            {profile.tech.filter(t => t.level === 'used').map(t => (
                                <Badge key={t.name}>{t.name}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 경력 */}
            <section className="mb-8">
                <h2 className="mb-4 text-xl font-bold border-b border-zinc-100 pb-1">경력</h2>
                <div className="space-y-6">
                    {career.map((c, i) => (
                        <div key={i} className="break-inside-avoid">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-bold">{c.company}</h3>
                                <span className="text-sm text-zinc-500">{c.period}</span>
                            </div>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-base font-semibold">{c.title}</span>
                                {c.role && <span className="text-sm text-zinc-600">({c.role})</span>}
                            </div>

                            <div className="mt-3 space-y-3">
                                {c.scope && (
                                    <div className="text-sm">
                                        <span className="font-semibold text-zinc-700">주요 업무:</span>
                                        <ul className="mt-1 list-disc list-inside space-y-0.5 text-zinc-600 pl-2">
                                            {c.scope.map(s => <li key={s}>{s}</li>)}
                                        </ul>
                                    </div>
                                )}
                                {c.environment && (
                                    <div className="text-sm">
                                        <span className="font-semibold text-zinc-700">환경: </span>
                                        <span className="text-zinc-600">{c.environment.join(', ')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 프로젝트 */}
            <section className="mb-8">
                <h2 className="mb-4 text-xl font-bold border-b border-zinc-100 pb-1">프로젝트 (Portfolio)</h2>
                <div className="space-y-8">
                    {profile.projects.map((p) => (
                        <div key={p.slug} className="break-inside-avoid rounded-lg border border-zinc-200 p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold">
                                    {p.title}
                                    {p.status === 'in-progress' && <span className="ml-2 text-xs text-yellow-600 border border-yellow-200 bg-yellow-50 px-1 rounded">진행중</span>}
                                </h3>
                            </div>
                            <p className="mt-1 text-sm text-zinc-600">{p.oneLiner}</p>

                            <div className="mt-4 grid gap-4 text-sm">
                                <div>
                                    <span className="font-semibold block mb-1">Purpose</span>
                                    <div className="text-zinc-700 leading-relaxed">
                                        {Array.isArray(p.purpose)
                                            ? p.purpose.map((line, i) => <p key={i}>{line}</p>)
                                            : p.purpose}
                                    </div>
                                </div>
                                <div>
                                    <span className="font-semibold block mb-1">Role</span>
                                    <p className="text-zinc-700 leading-relaxed">{p.role}</p>
                                </div>
                                <div>
                                    <span className="font-semibold block mb-1">Tech Stack</span>
                                    <div className="flex flex-wrap gap-1">
                                        {p.tech.map(t => <span key={t} className="inline-block bg-zinc-100 px-1.5 py-0.5 rounded text-xs text-zinc-700 border border-zinc-200">{t}</span>)}
                                    </div>
                                </div>
                                {p.highlights && (
                                    <div>
                                        <span className="font-semibold block mb-1">Highlights</span>
                                        <ul className="list-disc list-inside space-y-0.5 text-zinc-700 pl-1">
                                            {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}
