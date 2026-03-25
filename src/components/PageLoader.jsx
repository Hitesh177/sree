import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const { language } = useLanguage()
  const zh = language === 'zh'

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#1A0805',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          {/* Logo bloom animation */}
          <motion.img
            src="/logo.png"
            alt="Sree India Palace"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 1, 0.9, 1],
              scale:  [0.6, 1.05, 1, 1.03, 1],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.35, 0.55, 0.75, 1],
              ease: 'easeInOut',
            }}
            style={{ width: 280, height: 'auto', filter: 'drop-shadow(0 0 32px rgba(212,168,75,0.6))' }}
          />

          {/* Restaurant name fades in after lotus appears */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <p
              className="font-sans"
              style={{
                color: '#C4A04A',
                fontSize: '9px',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              {zh ? '台中 · 台灣' : 'Taichung · Taiwan'}
            </p>
            <h1
              className="font-heading font-light"
              style={{ color: '#F5EDD8', fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', letterSpacing: '0.04em' }}
            >
              {zh ? '斯里印度宮' : 'Sree India Palace'}
            </h1>
          </motion.div>

          {/* Thin gold progress line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.5, duration: 1.8, ease: 'easeInOut' }}
            style={{ height: 1, background: '#C4A04A', opacity: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
