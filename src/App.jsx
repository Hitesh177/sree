import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingReserveButton from './components/FloatingReserveButton'
import CursorFollower from './components/CursorFollower'
import RaniChatbot from './components/RaniChatbot'
import PageLoader from './components/PageLoader'
import FloatingOffer from './components/FloatingOffer'
import MusicPlayer from './components/MusicPlayer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import OurStory from './pages/OurStory'
import Events from './pages/Events'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Spices from './pages/Spices'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/spices" element={<Spices />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-art-bg text-art-ink">
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <FloatingReserveButton />
          <RaniChatbot />
          <FloatingOffer />
          <MusicPlayer />
          <CursorFollower />
          <PageLoader />
          <Analytics />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  )
}
