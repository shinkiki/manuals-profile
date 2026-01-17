import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './routes/Layout'
import HomePage from './routes/HomePage'
import ProjectPage from './routes/ProjectPage'
import CareerPage from './routes/CareerPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
