import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import OwaspWebAuditor from '@/pages/projects/OwaspWebAuditor'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Contact from '@/pages/Contact'
import CV from '@/pages/CV'
import AvisoLegal from '@/pages/legal/AvisoLegal'
import Privacidad from '@/pages/legal/Privacidad'
import Cookies from '@/pages/legal/Cookies'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/proyectos/owasp-web-auditor" element={<OwaspWebAuditor />} />
            <Route path="/sobre-mi" element={<About />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/legal/aviso-legal" element={<AvisoLegal />} />
            <Route path="/legal/privacidad" element={<Privacidad />} />
            <Route path="/legal/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
