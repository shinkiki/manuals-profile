import { useEffect, useState } from 'react'

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            // 페이지가 300px 이상 스크롤되면 버튼 표시
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-xl dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
                }`}
            aria-label="맨 위로 스크롤"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </button>
    )
}
