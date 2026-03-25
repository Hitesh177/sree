import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What makes Sree India Palace unique in Taichung?',
    a: "We're Taichung's most-reviewed Indian restaurant — 4.6★ with 1,400+ reviews — and the only place in Taiwan cooking true Hyderabadi Dum Biryani using the traditional sealed-pot slow-cook method with whole spices.",
  },
  {
    q: 'What is Hyderabadi Dum Biryani?',
    a: "Dum Biryani is a royal slow-cooking technique from Hyderabad, India. Marinated meat and parboiled basmati rice are layered in a sealed pot and cooked over a low flame, so steam infuses every grain with deep, aromatic flavour. It's our signature dish and a must-try.",
  },
  {
    q: 'Do you have vegetarian and vegan options?',
    a: 'Absolutely. Our menu features Dal Tadka, Palak Paneer, Paneer Butter Masala, Navratan Korma, Aloo Gobi, Masala Dosa, Idli, and more. Most curries can be made vegetarian on request.',
  },
  {
    q: 'How can I make a reservation?',
    a: 'You can reserve via WhatsApp (+886-910-309-268) or through the reservation form on our Contact page. We recommend booking ahead for weekends and dinner service.',
  },
  {
    q: 'Do you offer delivery in Taichung?',
    a: 'Yes — we deliver across Taichung via UberEats. Search for "Sree India Palace" in the UberEats app to order.',
  },
  {
    q: 'What are your opening hours?',
    a: 'Mon–Thu: 11:30–15:00 & 17:00–22:00. Fri–Sat: 11:00–15:30 & 17:00–22:30. Sun: 11:00–15:30 & 17:00–22:00.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className="py-24 px-8 md:px-14 xl:px-24" style={{ background: '#0A0805' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: '#C4A04A' }}>
            Know Before You Go
          </p>
          <h2
            className="text-3xl md:text-4xl font-light"
            style={{ fontFamily: 'Cinzel, serif', color: '#F5EDD8' }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div className="divide-y" style={{ borderColor: '#2A1F10' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <button
                className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="text-base md:text-lg font-light leading-snug transition-colors"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    color: open === i ? '#C4A04A' : '#F5EDD8',
                  }}
                >
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 mt-1 transition-transform duration-300"
                  style={{
                    color: '#C4A04A',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="pb-5 text-sm md:text-base leading-relaxed"
                      style={{ color: '#BFB08A', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
