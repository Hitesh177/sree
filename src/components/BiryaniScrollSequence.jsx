import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { BOOKING_URL } from '../constants'

export default function BiryaniScrollSequence() {
  const { language } = useLanguage()
  const videoRef = useRef(null)
  const sectionRef = useRef(null)

  const { scrollY } = useScroll()
  const textY = useTransform(scrollY, [0, 600], [0, -50])

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[600px] overflow-hidden bg-[#050505]">

      {/* Video — always fills full screen on any device */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      >
        <source src="/biryani-hero.mp4" type="video/mp4" />
      </video>

      {/* Top vignette — navbar legibility only */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />

      {/* Bottom gradient — only bottom 40% */}
      <div className="absolute bottom-0 inset-x-0 h-[45%] bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-10" />

      {/* Coordinate annotation — top right corner */}
      <div className="absolute top-28 right-8 z-20 text-right pointer-events-none">
        <p
          className="font-sans"
          style={{ fontSize: '9px', color: '#C4A04A', letterSpacing: '0.28em', opacity: 0.55 }}
        >
          24.1477° N, 120.6736° E
        </p>
      </div>

      {/* Bottom content — flush to bottom, split left/right — parallax on the whole block */}
      <div className="absolute bottom-0 inset-x-0 z-20 px-8 md:px-14 xl:px-20 pb-12">
        <div className="max-w-screen-xl mx-auto flex items-end justify-between gap-6">

          {/* Left — with parallax */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: textY }}
          >
            <p className="font-sans text-[9px] text-[#C4A04A] tracking-[0.4em] uppercase mb-1">
              24.1477° N · 120.6736° E
            </p>
            <p className="font-sans text-[9px] text-[#C4A04A] tracking-[0.4em] uppercase mb-3">
              {language === 'zh' ? '台中 · 台灣' : 'Taichung · Taiwan'}
            </p>
            <h2
              className="font-heading font-light text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 3rem)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              {language === 'zh'
                ? <>台中最好的<br /><em>印度餐廳</em></>
                : <>The Best Indian<br /><em>Food in <span className="cursive-accent">Taichung</span></em></>}
            </h2>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                to="/menu"
                className="px-6 py-3 border border-white/35 text-white font-sans text-xs font-medium
                           tracking-[0.18em] uppercase hover:bg-white/10 transition-colors duration-300"
              >
                {language === 'zh' ? '查看菜單' : 'View Menu'}
              </Link>
            </div>
          </motion.div>


        </div>
      </div>

    </section>
  )
}
