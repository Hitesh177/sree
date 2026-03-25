import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const OFFER = {
  en: {
    tab: 'Gift',
    badge: "Today's Offer",
    heading: 'A Gift From Our Kitchen',
    dish: 'Free Gulab Jamun',
    desc: 'Complimentary with any dine-in order. Rose water syrup, served warm. Just show this to your server.',
    cta: 'Reserve & Claim',
    fine: 'Valid for dine-in only · One per table · Today only',
    code: 'ROYAL–GIFT',
  },
  zh: {
    tab: '禮',
    badge: '今日優惠',
    heading: '廚房的小心意',
    dish: '免費玫瑰球甜點',
    desc: '任何內用訂單皆可享用。玫瑰水糖漿，溫熱上桌。請向服務員出示此畫面。',
    cta: '預訂 & 領取',
    fine: '僅限內用 · 每桌一份 · 僅限今日',
    code: 'ROYAL–GIFT',
  },
}

export default function FloatingOffer() {
  const { language } = useLanguage()
  const zh = language === 'zh'
  const t = zh ? OFFER.zh : OFFER.en

  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [copied, setCopied] = useState(false)

  // Auto-peek after 8 s on first visit
  useEffect(() => {
    const seen = sessionStorage.getItem('offer_seen')
    if (seen) return
    const timer = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem('offer_seen', '1')
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  if (dismissed) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(t.code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Side tab — always visible unless card is open */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="tab"
            initial={{ x: 60 }}
            animate={{ x: 0 }}
            exit={{ x: 60 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={() => setOpen(true)}
            style={{
              position: 'fixed',
              right: 0,
              top: '44%',
              transform: 'translateY(-50%)',
              zIndex: 48,
              background: '#1A0E05',
              border: '1px solid #C4A04A55',
              borderRight: 'none',
              padding: '14px 10px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              borderRadius: '6px 0 0 6px',
            }}
            whileHover={{ x: -4 }}
          >
            {/* Gift icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4A04A" strokeWidth="1.8">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            {/* Rotated label */}
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '9px',
                color: '#C4A04A',
                letterSpacing: '0.22em',
                writingMode: 'vertical-lr',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                userSelect: 'none',
              }}
            >
              {t.tab}
            </span>
            {/* Pulse dot */}
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#C4A04A' }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Offer card */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="card"
            initial={{ x: 340, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 340, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            style={{
              position: 'fixed',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 48,
              width: 'min(320px, 92vw)',
              background: '#1A0E05',
              border: '1px solid #C4A04A44',
              borderRight: 'none',
              borderRadius: '10px 0 0 10px',
              overflow: 'hidden',
              boxShadow: '-8px 0 40px rgba(0,0,0,0.45)',
            }}
          >
            {/* Gold top stripe */}
            <div style={{ height: 3, background: 'linear-gradient(to right, #9B7A2A, #C4A04A, #9B7A2A)' }} />

            <div style={{ padding: '20px 22px 22px' }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: '#C4A04A', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                  {t.badge}
                </p>
                <button
                  onClick={() => { setOpen(false); setDismissed(true) }}
                  style={{ background: 'none', border: 'none', color: '#9B8A6A', cursor: 'pointer', padding: 4, lineHeight: 1 }}
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Heading */}
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: '#F5EDD8', fontWeight: 400, lineHeight: 1.3, marginBottom: 6 }}>
                {t.heading}
              </h3>

              {/* Dish name */}
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)', color: '#C4A04A', fontWeight: 600, marginBottom: 12 }}>
                {t.dish}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: '#C4A04A22', marginBottom: 14 }} />

              {/* Description */}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#AFA090', lineHeight: 1.75, marginBottom: 18 }}>
                {t.desc}
              </p>

              {/* Code box */}
              <button
                onClick={handleCopy}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#2A1A08',
                  border: '1px dashed #C4A04A55',
                  padding: '10px 14px',
                  marginBottom: 16,
                  cursor: 'pointer',
                  borderRadius: 3,
                }}
              >
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: '13px', color: '#C4A04A', letterSpacing: '0.2em' }}>
                  {t.code}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: copied ? '#6BBF6B' : '#9B8A6A', letterSpacing: '0.1em' }}>
                  {copied ? (zh ? '已複製' : 'Copied!') : (zh ? '點擊複製' : 'Tap to copy')}
                </span>
              </button>

              {/* CTA */}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#1A0E05',
                  background: 'linear-gradient(135deg, #C4A04A, #9B7A2A)',
                  padding: '12px',
                  textDecoration: 'none',
                  borderRadius: 3,
                  marginBottom: 12,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {t.cta}
              </Link>

              {/* Fine print */}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: '#9B8A6A', textAlign: 'center', lineHeight: 1.6, opacity: 0.75 }}>
                {t.fine}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
