import type { ReactNode } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { ThemeToggle } from '../components/ThemeToggle'
import { ScrollToTopButton } from '../components/ScrollToTopButton'

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  // 헤더 높이(약 56px) + 여백(24px) 고려하여 오프셋 설정
  const offset = 80
  const bodyRect = document.body.getBoundingClientRect().top
  const elementRect = el.getBoundingClientRect().top
  const elementPosition = elementRect - bodyRect
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()

  const onSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
      return
    }
    scrollToSection(id)
  }

  const right: ReactNode = <ThemeToggle />

  return (
    <div id="top" className="min-h-dvh">
      <Nav
        right={right}
        onSection={onSection}
        onHome={() => {
          if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
          }
          navigate('/')
        }}
        onCareer={() => {
          if (location.pathname === '/career') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
          }
          navigate('/career', { state: { scrollToTop: true } })
        }}
      />
      <Outlet />
      <ScrollToTopButton />
    </div>
  )
}
