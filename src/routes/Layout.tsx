import type { ReactNode } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { ThemeToggle } from '../components/ThemeToggle'
import { ScrollToTopButton } from '../components/ScrollToTopButton'

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
