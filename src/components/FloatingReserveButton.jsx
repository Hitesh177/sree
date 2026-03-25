import { motion } from 'framer-motion'
import { BOOKING_URL } from '../constants'

export default function FloatingReserveButton() {
  return (
    <motion.div
      className="fixed bottom-8 left-6 z-50"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
    >
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-art-ink text-art-cream font-sans font-medium
                   px-5 py-3.5 text-xs tracking-[0.2em] uppercase
                   shadow-lg hover:bg-art-dark-2 transition-colors duration-300"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Reserve
      </a>
    </motion.div>
  )
}
