import { useEffect, useMemo, useState } from 'react'
import { profile } from '../data/profile'
import { career } from '../data/career'
import { Badge } from '../components/Badge'
import CryptoJS from 'crypto-js'

const PASSWORD_HASH = 'a6f4dd2f9a6f9ce54f86545ac31fc872411411db74b694489c68b58fc8f0d1ee'

function parseDate(dateStr: string) {
    if (dateStr.includes('현재')) return new Date()
    const parts = dateStr.match(/(\d{4})년 (\d{2})월/)
    if (!parts) return new Date()
    return new Date(parseInt(parts[1]), parseInt(parts[2]) - 1, 1)
}

function calculateCareerDuration(careerItems: typeof career) {
    const intervals = careerItems.map(c => {
        const [startStr, endStr] = c.period.split(' ~ ')
        return {
            start: parseDate(startStr.trim()).getTime(),
            end: parseDate(endStr.trim()).getTime()
        }
    }).sort((a, b) => a.start - b.start)

    if (intervals.length === 0) return { years: 0, months: 0 }

    const merged = []
    let current = intervals[0]

    for (let i = 1; i < intervals.length; i++) {
        const next = intervals[i]
        if (next.start <= current.end) {
            current.end = Math.max(current.end, next.end)
        } else {
            merged.push(current)
            current = next
        }
    }
    merged.push(current)

    let totalMonths = 0
    merged.forEach(({ start, end }) => {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth()) + 1
        totalMonths += months
    })

    return {
        years: Math.floor(totalMonths / 12),
        months: totalMonths % 12
    }
}

function calculateAge(birthdateStr: string) {
    const birthDate = new Date(birthdateStr)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

export default function PrintPage() {
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [showPasswordInput, setShowPasswordInput] = useState(false)
    const [password, setPassword] = useState('')
    const [decryptedData, setDecryptedData] = useState<{ birthdate: string, phone: string, address: string } | null>(null)

    useEffect(() => {
        // 자동 인쇄 다이얼로그 호출 (선택 사항)
        // window.print()
    }, [])

    const duration = useMemo(() => calculateCareerDuration(career), [])

    const handleUnlock = () => {
        const inputHash = CryptoJS.SHA256(password).toString()
        if (inputHash === PASSWORD_HASH) {
            setIsUnlocked(true)
            setShowPasswordInput(false)

            // Decrypt data
            if (profile.encryptedData) {
                try {
                    const bytesBirth = CryptoJS.AES.decrypt(profile.encryptedData.birthdate, password)
                    const bytesPhone = CryptoJS.AES.decrypt(profile.encryptedData.phone, password)
                    const bytesAddr = CryptoJS.AES.decrypt(profile.encryptedData.address, password)

                    setDecryptedData({
                        birthdate: bytesBirth.toString(CryptoJS.enc.Utf8),
                        phone: bytesPhone.toString(CryptoJS.enc.Utf8),
                        address: bytesAddr.toString(CryptoJS.enc.Utf8)
                    })
                } catch (e) {
                    alert('복호화 중 오류가 발생했습니다.')
                    console.error(e)
                }
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.')
        }
    }

    const ageInfo = useMemo(() => {
        if (!decryptedData?.birthdate) return null
        const date = new Date(decryptedData.birthdate)
        const age = calculateAge(decryptedData.birthdate)
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (만 ${age}세)`
    }, [decryptedData])

    return (
        <div className="mx-auto max-w-[210mm] bg-white p-[10mm] text-zinc-900 print:p-0">
            {/* 화면에서만 보이는 인쇄 버튼 및 잠금해제 */}
            <div className="mb-8 flex justify-end gap-2 print:hidden">
                {!isUnlocked && !showPasswordInput && (
                    <button
                        onClick={() => setShowPasswordInput(true)}
                        className="rounded-lg bg-zinc-600 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
                    >
                        전체정보 표시
                    </button>
                )}

                {showPasswordInput && (
                    <div className="flex gap-2">
                        <input
                            type="password"
                            className="border border-zinc-300 rounded px-2 text-sm"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                        />
                        <button
                            onClick={handleUnlock}
                            className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                        >
                            확인
                        </button>
                        <button
                            onClick={() => setShowPasswordInput(false)}
                            className="rounded-lg bg-zinc-400 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-500"
                        >
                            취소
                        </button>
                    </div>
                )}

                <button
                    onClick={() => window.print()}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    PDF로 저장 / 인쇄
                </button>
            </div>

            {/* 헤더 */}
            <header className="mb-8 border-b border-zinc-200 pb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    <p className="mt-1 text-lg text-zinc-600">{profile.headline}</p>
                    <div className="mt-4 flex flex-col gap-1 text-sm text-zinc-600">
                        {ageInfo && <div>생년월일: {ageInfo}</div>}
                        <div className="flex gap-4">
                            {decryptedData?.phone && <span>Mobile: {decryptedData.phone}</span>}
                            {profile.contact.email && <span>E-mail: {profile.contact.email}</span>}
                        </div>
                        {decryptedData?.address && <div>Address: {decryptedData.address}</div>}
                        {/* 요청 주소 추가 */}
                        <div>
                            <span>Profile: https://shinkiki.github.io/manuals-profile</span>
                        </div>
                        <div className="flex gap-4">
                            {profile.contact.github && <span>GitHub: {profile.contact.github}</span>}
                            {profile.contact.blog && <span>Blog: {profile.contact.blog}</span>}
                        </div>
                    </div>
                </div>
                {profile.avatar && (
                    <img
                        src={profile.avatar.src}
                        alt={profile.avatar.alt}
                        className="w-32 h-40 object-cover rounded-md border border-zinc-200"
                    />
                )}
            </header>

            {/* 소개 */}
            <section className="mb-8">
                <h2 className="mb-3 text-xl font-bold border-b border-zinc-100 pb-1">자기소개</h2>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
                    {profile.intro}
                </p>
                {profile.selfIntroduction && (
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
                        {profile.selfIntroduction.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
                    </div>
                )}
            </section>

            {/* 기술적 기준 */}
            {profile.techStandards && (
                <section className="mb-8">
                    <h2 className="mb-3 text-xl font-bold border-b border-zinc-100 pb-1">기술적 기준</h2>
                    <ul className="list-none space-y-1.5 text-sm text-zinc-700">
                        {profile.techStandards.map((std, i) => (
                            <li key={i}>{std}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* 학력 (요청사항 추가) */}
            <section className="mb-8">
                <h2 className="mb-3 text-xl font-bold border-b border-zinc-100 pb-1">학력</h2>
                <div className="space-y-2 text-sm text-zinc-700">
                    <div className="flex justify-between">
                        <span className="font-semibold">명지전문대학 토목과 졸업</span>
                        <span className="text-zinc-500">2008년 03월 ~ 2010년 02월</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">선린인터넷 고등학교 졸업</span>
                        <span className="text-zinc-500">1999년 03월 ~ 2002년 02월</span>
                    </div>
                </div>
            </section>

            {/* 병역 (요청사항 추가) */}
            <section className="mb-8">
                <h2 className="mb-3 text-xl font-bold border-b border-zinc-100 pb-1">병역</h2>
                <div className="text-sm text-zinc-700">
                    <div className="flex justify-between mb-1">
                        <span className="font-semibold">군필 (육군/행정, 병장 만기전역)</span>
                        <span className="text-zinc-500">2004년 10월 ~ 2006년 10월 (24개월)</span>
                    </div>
                </div>
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
                <h2 className="mb-4 text-xl font-bold border-b border-zinc-100 pb-1">
                    경력 <span className="text-base font-normal text-zinc-500 ml-2">({duration.years}년 {duration.months}월)</span>
                </h2>
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
                                {c.notes && (
                                    <div className="text-sm">
                                        <span className="font-semibold text-zinc-700">핵심 성과:</span>
                                        <ul className="mt-1 list-disc list-inside space-y-0.5 text-zinc-600 pl-2">
                                            {c.notes.map(n => <li key={n}>{n}</li>)}
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
