import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { BOOKING_URL } from '../constants'

const navLinks = [
  { path: '/',          label: 'Home',     labelZH: '首頁' },
  { path: '/menu',      label: 'Menu',     labelZH: '菜單' },
  { path: '/gallery',   label: 'Gallery',  labelZH: '相簿' },
  { path: '/our-story', label: 'Our Story',labelZH: '我們的故事' },
  { path: '/events',    label: 'Events',   labelZH: '活動' },
  { path: '/blog',      label: 'Blog',     labelZH: '部落格' },
  { path: '/spices',    label: 'Spices',   labelZH: '香料' },
  { path: '/contact',   label: 'Contact',  labelZH: '聯絡' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-art-bg/96 backdrop-blur-sm border-b border-art-border'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-18 flex items-center justify-between" style={{ height: '72px' }}>

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Sree India Palace"
              style={{
                height: '52px',
                width: 'auto',
                borderRadius: '4px',
                filter: 'drop-shadow(0 2px 8px rgba(155,122,42,0.3))',
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ path, label, labelZH }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                style={{ fontFamily: "'Monograph', system-ui, sans-serif", fontSize: '15px' }}
                className={({ isActive }) =>
                  `relative tracking-[0.05em] transition-colors duration-200 group ${
                    isActive
                      ? 'text-art-gold'
                      : scrolled
                        ? 'text-art-ink hover:text-art-gold'
                        : 'text-white/90 hover:text-art-gold'
                  }`
                }
              >
                {language === 'zh' ? labelZH : label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-art-gold group-hover:w-full transition-all duration-300" />
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              onClick={toggleLanguage}
              style={{ fontFamily: "'Monograph', system-ui, sans-serif", fontSize: '14px' }}
              className={`tracking-[0.1em] uppercase transition-colors border-b border-transparent hover:border-art-gold pb-0.5 hover:text-art-gold ${scrolled ? 'text-art-ink' : 'text-white/80'}`}
            >
              {language === 'en' ? 'ZH' : 'EN'}
            </button>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontFamily: "'Monograph', system-ui, sans-serif", fontSize: '13px' }}>
              Reserve
            </a>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className={`w-5 h-px block ${scrolled ? 'bg-art-ink' : 'bg-white'}`}
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className={`w-5 h-px block ${scrolled ? 'bg-art-ink' : 'bg-white'}`}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className={`w-5 h-px block ${scrolled ? 'bg-art-ink' : 'bg-white'}`}
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-art-bg flex flex-col pt-24 px-8 pb-12"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-0 mt-6">
              {navLinks.map(({ path, label, labelZH }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="border-b border-art-border"
                >
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `block font-heading text-3xl py-5 transition-colors ${
                        isActive ? 'text-art-gold' : 'text-art-ink'
                      }`
                    }
                  >
                    {language === 'zh' ? labelZH : label}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="font-sans text-xs text-art-ink-2 border border-art-border px-4 py-3 tracking-[0.2em] uppercase hover:text-art-ink hover:border-art-ink transition-colors"
              >
                {language === 'en' ? '中文' : 'English'}
              </button>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 text-center">
                Reserve a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
