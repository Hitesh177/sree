import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { menuCategories } from '../data/menu'
import GoldDivider from '../components/GoldDivider'
import { UBEREATS_PICKUP_URL, UBEREATS_DELIVERY_URL } from '../constants'

const SpiceIndicator = ({ level }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3].map(i => (
      <span key={i} className={`text-xs ${i <= level ? 'text-red-400' : 'text-art-ink-3/20'}`}>●</span>
    ))}
  </div>
)

const VegBadge = ({ isVeg }) => {
  const { language } = useLanguage()
  return (
    <span className={`inline-flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase px-2 py-0.5 ${
      isVeg ? 'text-green-600 border border-green-600/30' : 'text-art-rust border border-art-rust/30'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-green-600' : 'bg-art-rust'}`} />
      {isVeg ? (language === 'zh' ? '素食' : 'Veg') : (language === 'zh' ? '葷食' : 'Non-Veg')}
    </span>
  )
}

// ── Kitchen Capture slides ────────────────────────────────────────────────
const kitchenSlides = [
  {
    name: 'Samosa',
    nameZH: '薩摩沙角',
    nameLocal: 'సమోసా',
    desc: 'Hand-crimped, spiced with our house masala blend, fried to order every morning. Watch the making — each fold a technique passed down across generations.',
    descZH: '手工折疊，以我們的招牌香料調味，每天早上現點現炸。觀看製作過程——每個折疊都是代代相傳的技藝。',
    tags: ['Hand-crimped pastry', 'Fresh-fried daily', 'House spice blend'],
    tagsZH: ['手工折疊麵皮', '每日現炸', '招牌香料配方'],
    type: 'video',
    videoSrc: '/samosa.mp4',
  },
  {
    name: 'Dum Biryani',
    nameZH: '慢燉香飯',
    nameLocal: 'దమ్ బిర్యాని',
    desc: 'Sealed in a dum pot, aged basmati layered with marinated mutton, kewra water, and saffron from Kashmir. Opened tableside — the first breath of steam is part of the experience.',
    descZH: '密封在燉鍋中，將醃製羊肉與陳年印度香米、露蘭花水及克什米爾藏紅花層疊。在您的桌邊開封——第一縷蒸汽的香氣是體驗的一部分。',
    tags: ['Kacchi dum method', 'Aged basmati', 'Saffron from Kashmir'],
    tagsZH: ['生肉慢燉方法', '陳年印度香米', '克什米爾藏紅花'],
    type: 'video',
    videoSrc: '/biryani-hero.mp4',
  },
  {
    name: 'Butter Chicken',
    nameZH: '奶油雞',
    nameLocal: 'బటర్ చికెన్',
    desc: 'Tandoor-roasted chicken folded into a slow-reduced tomato and cream gravy. Our most requested dish — rich, mild, and unmistakably Indian.',
    descZH: '坦都爐烤雞折入慢燉的番茄奶油醬汁。我們最受歡迎的菜肴——濃郁、溫和、道地印度風味。',
    tags: ['Tandoor-roasted', 'Slow-cooked gravy', 'Kashmiri chili'],
    tagsZH: ['坦都爐烤製', '慢燉醬汁', '克什米爾辣椒'],
    type: 'video',
    videoSrc: '/butter-chicken.mp4',
  },
  {
    name: 'Tandoori Chicken',
    nameZH: '坦都里雞',
    nameLocal: 'తందూరి చికెన్',
    desc: 'Half chicken marinated overnight in spiced yogurt and Kashmiri chili, cooked at 480°C in our clay tandoor imported from Delhi. The char on the outside, the succulence within.',
    descZH: '半隻雞在香料優格和克什米爾辣椒中醃製一夜，在從德里進口的 480°C 陶土坦都爐中烹製。外層的焦痕，內裡的鮮嫩多汁。',
    tags: ['480°C clay tandoor', 'Overnight marinade', 'Imported from Delhi'],
    tagsZH: ['480°C坦都爐', '一夜醃製', '從德里進口'],
    type: 'video',
    videoSrc: '/tandoori-chicken.mp4',
  },
  {
    name: 'Gulab Jamun',
    nameZH: '玫瑰球甜點',
    nameLocal: 'గులాబ్ జామున్',
    desc: 'Khoya milk solids deep-fried until golden, soaked in cardamom and rose water syrup. India\'s most beloved dessert — served warm, fragrant, and unhurried.',
    descZH: '印度奶固體深炸至金黃，浸泡在荳蔻和玫瑰水糖漿中。印度最受喜愛的甜點——溫熱供應，香氣濃郁，令人流連忘返。',
    tags: ['Khoya milk base', 'Rose water syrup', 'Served warm'],
    tagsZH: ['印度奶固體基底', '玫瑰水糖漿', '溫熱供應'],
    type: 'video',
    videoSrc: '/gulab-jamun.mp4',
  },
]

export default function Menu() {
  const { language } = useLanguage()
  const zh = language === 'zh'
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id)
  const activeCat = menuCategories.find(c => c.id === activeCategory)
  const videoRef = useRef(null)
  const [kitchenSlide, setKitchenSlide] = useState(0)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* ── VIDEO HERO — left-anchored, below navbar ── */}
      <section
        className="flex items-stretch"
        style={{
          paddingTop: '72px',
          minHeight: '100vh',
          background: '#FAF5EC',
        }}
      >
        {/* Video pinned to left — mask fades right + bottom edges into bg */}
        <div
          className="flex-shrink-0 flex items-start relative"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, black 55%, transparent 92%), linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage: 'linear-gradient(to right, black 55%, transparent 92%), linear-gradient(to bottom, black 70%, transparent 100%)',
            maskComposite: 'intersect',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              display: 'block',
              height: 'calc(100vh - 72px)',
              width: 'auto',
              objectFit: 'contain',
              objectPosition: 'left top',
            }}
          >
            <source src="/menu-hero.mp4?v=3" type="video/mp4" />
          </video>
        </div>

        {/* Centre — headline text, vertically centred */}
        <div
          className="flex flex-1 flex-col justify-center items-center text-center px-10 xl:px-16"
          style={{ background: '#FAF5EC' }}
        >
          <p
            className="font-sans mb-4"
            style={{ fontSize: '11px', color: '#C4A04A', letterSpacing: '0.35em' }}
          >
            {language === 'zh' ? '我們的菜單' : 'Our Menu'}
          </p>
          <h1
            className="font-heading font-light leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 4vw, 6rem)', color: '#1A0E05' }}
          >
            {language === 'zh' ? <>我們的<br /><em>菜單</em></> : <>Our<br /><em>Menu</em></>}
          </h1>
          <div className="flex items-center gap-3 mt-8 mb-8">
            <div className="w-10 h-px" style={{ background: '#9B7A2A66' }} />
            <span className="w-1.5 h-1.5 rotate-45 block" style={{ background: '#9B7A2A' }} />
          </div>
          <p
            className="font-sans font-semibold"
            style={{ fontSize: '12px', color: '#5C4020', letterSpacing: '0.25em' }}
          >
            24.1477° N · 120.6736° E
          </p>
        </div>

      </section>


      {/* ── UBER EATS BANNER ── */}
      <div
        style={{
          position: 'relative',
          background: '#FAF5EC',
          borderTop: '1px solid #D4C5A6',
          borderBottom: '1px solid #D4C5A6',
          overflow: 'hidden',
          padding: '14px 24px',
        }}
      >
        {/* Spice icons row */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            overflow: 'hidden',
            opacity: 0.22,
            pointerEvents: 'none',
            fontSize: 20,
          }}
        >
          {['🌶️','🧄','🫚','🌿','🧅','🫛','🌰','🍃','🌶️','🧄','🫚','🌿','🧅','🫛','🌰','🍃','🌶️','🧄','🫚','🌿','🧅','🫛','🌰','🍃'].map((icon, i) => (
            <span key={i} style={{ flexShrink: 0 }}>{icon}</span>
          ))}
        </div>
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-3 relative" style={{ zIndex: 1 }}>
          <p
            className="font-sans"
            style={{ fontSize: '13px', color: '#3A2410', letterSpacing: '0.06em' }}
          >
            {language === 'zh' ? '現在也可以透過 Uber Eats 點餐' : 'Order now on Uber Eats — delivery or pickup'}
          </p>
          <div className="flex gap-3">
            <a href={UBEREATS_DELIVERY_URL} target="_blank" rel="noopener noreferrer"
              className="font-sans font-semibold uppercase tracking-[0.15em] transition-all hover:bg-[#9B7A2A]/10"
              style={{ fontSize: '11px', color: '#9B7A2A', border: '1px solid #9B7A2A88', padding: '6px 16px' }}>
              {language === 'zh' ? '外送' : 'Delivery'}
            </a>
            <a href={UBEREATS_PICKUP_URL} target="_blank" rel="noopener noreferrer"
              className="font-sans font-semibold uppercase tracking-[0.15em] transition-all hover:opacity-80"
              style={{ fontSize: '11px', color: '#FAF5EC', background: '#9B7A2A', padding: '6px 16px' }}>
              {language === 'zh' ? '自取' : 'Pickup'}
            </a>
          </div>
        </div>
      </div>

      {/* ── CATEGORY TABS — sticky below navbar, mobile only ── */}
      <section className="md:hidden sticky top-[72px] z-30 border-b border-art-border/60" style={{ background: '#FAF5EC' }}>
        <div className="px-6">
          <div className="flex overflow-x-auto no-scrollbar gap-0">
            {menuCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{ fontFamily: "'Monograph', system-ui, sans-serif", fontSize: '14px' }}
                className={`flex-shrink-0 tracking-[0.06em] px-5 py-4 transition-all duration-200 border-b-2 ${
                  activeCategory === cat.id
                    ? 'text-art-gold border-art-gold'
                    : 'text-art-ink border-transparent hover:text-art-gold'
                }`}
              >
                {language === 'zh' ? cat.nameZH : cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ── MENU CONTENT — sidebar on desktop ── */}
      <div style={{ background: '#FAF5EC' }}>
        <div className="max-w-screen-xl mx-auto flex">

          {/* ── VERTICAL SIDEBAR — desktop only ── */}
          <aside
            className="hidden md:flex flex-col shrink-0 sticky top-[72px] self-start overflow-y-auto border-r border-art-border/30"
            style={{ width: '210px', height: 'calc(100vh - 72px)' }}
          >
            <div className="py-10 pl-8 pr-4">
              <p
                className="font-sans mb-6"
                style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9B7A2A' }}
              >
                {language === 'zh' ? '菜單類別' : 'Categories'}
              </p>
              {menuCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left py-2.5 pl-3 mb-0.5 transition-all duration-200 border-l-2 ${
                    activeCategory === cat.id
                      ? 'text-art-gold border-art-gold bg-art-gold/[0.04]'
                      : 'text-art-ink/70 border-transparent hover:text-art-gold hover:border-art-gold/30'
                  }`}
                  style={{ fontFamily: "'Monograph', system-ui, sans-serif", fontSize: '13px', letterSpacing: '0.04em' }}
                >
                  {language === 'zh' ? cat.nameZH : cat.name}
                </button>
              ))}

              {/* Footnote */}
              <div className="mt-10 pt-8 border-t border-art-border/30">
                <p
                  className="font-sans leading-relaxed"
                  style={{ fontSize: '11px', color: '#7A6040', lineHeight: 1.8 }}
                >
                  * All prices in NT$<br />
                  * Menu subject to seasonal change<br />
                  * Hover dish to reveal price
                </p>
              </div>
            </div>
          </aside>

          {/* ── CONTENT AREA ── */}
          <section className="flex-1 min-w-0 py-16 px-8 md:px-12 xl:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                {/* Category Header */}
                <div className="mb-14">
                  <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-art-gold mb-3">
                    {language === 'zh' ? '類別' : 'Category'}
                  </p>
                  <h2
                    className="font-heading font-normal text-art-ink leading-tight"
                    style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
                  >
                    {language === 'zh' ? activeCat.nameZH : activeCat.name}
                  </h2>
                  <p className="font-sans text-sm text-art-ink-2 mt-3 max-w-xl leading-relaxed">
                    {language === 'zh' ? activeCat.descriptionZH : activeCat.description}
                  </p>
                  <div className="cross-rule mt-6 max-w-xs" style={{ color: '#9B7A2A' }}>
                    <span style={{ fontSize: '9px', letterSpacing: '0.2em' }}>×</span>
                  </div>
                </div>

                {/* Dishes — text-only, price reveals on hover */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {activeCat.dishes.map((dish, i) => (
                    <motion.div
                      key={dish.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start justify-between gap-6 py-7 border-b border-art-border/50 group"
                      style={{ paddingRight: i % 2 === 0 ? '40px' : '0', paddingLeft: i % 2 === 1 ? '40px' : '0' }}
                    >
                      <div className="flex-1 min-w-0">
                        {/* Name row */}
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="font-heading text-xl text-art-ink font-normal leading-snug">
                            {language === 'zh' ? dish.nameZH : dish.name}
                          </h3>
                          {dish.chefRecommended && (
                            <span
                              className="font-sans text-[10px] tracking-[0.2em] uppercase px-2 py-0.5"
                              style={{ color: '#9B7A2A', border: '1px solid #9B7A2A55' }}
                            >
                              Chef's Pick
                            </span>
                          )}
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-3 mb-2.5">
                          <VegBadge isVeg={dish.isVeg} />
                          {dish.spiceLevel > 0 && <SpiceIndicator level={dish.spiceLevel} />}
                        </div>

                        {/* Description */}
                        <p className="font-sans text-sm text-art-ink-2/85 leading-relaxed max-w-sm">
                          {language === 'zh' ? dish.descriptionZH : dish.description}
                        </p>
                      </div>

                      {/* Price — hidden by default, reveals on hover */}
                      <div className="flex-shrink-0 text-right pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {dish.variants ? (
                          <div className="space-y-1.5">
                            {dish.variants.map(v => (
                              <div key={v.name}>
                                <span className="font-sans text-[12px] text-art-ink-3/75 block">
                                  {language === 'zh' ? v.nameZH : v.name}
                                </span>
                                <span className="font-heading text-xl text-art-gold">NT${v.price}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="font-heading text-2xl text-art-gold">NT${dish.price}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </section>

        </div>
      </div>


      {/* ── KITCHEN CAPTURES CAROUSEL ── */}
      <div style={{ background: '#0A0805' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={kitchenSlide}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <div
              className="max-w-screen-xl mx-auto py-20 px-8 md:px-16 xl:px-24"
              style={{ display: 'flex', alignItems: 'center', gap: '64px', flexWrap: 'wrap' }}
            >

              {/* ── LEFT: text content ── */}
              <div style={{ flex: '1 1 320px', minWidth: '260px' }}>
                <p className="font-sans mb-6" style={{ fontSize: '11px', color: '#C4A04A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                  {zh ? '視覺記錄' : 'Visual Record · 視覺記錄'}
                </p>
                <h3
                  className="font-cinzel font-light"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: '#E8DCC8', letterSpacing: '0.04em', lineHeight: 1.15, marginBottom: '20px' }}
                >
                  {zh ? kitchenSlides[kitchenSlide].nameZH : kitchenSlides[kitchenSlide].name}<br />
                  <span style={{ color: '#C4A04A', fontSize: '0.6em', letterSpacing: '0.2em' }}>{kitchenSlides[kitchenSlide].nameLocal}</span>
                </h3>
                <p className="font-sans" style={{ fontSize: '15px', color: '#AFA090', lineHeight: 1.85, maxWidth: '360px', marginBottom: '32px' }}>
                  {zh ? kitchenSlides[kitchenSlide].descZH : kitchenSlides[kitchenSlide].desc}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
                  {(zh ? kitchenSlides[kitchenSlide].tagsZH : kitchenSlides[kitchenSlide].tags).map(tag => (
                    <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '4px', height: '4px', background: '#C4A04A', transform: 'rotate(45deg)', flexShrink: 0 }} />
                      <span className="font-sans" style={{ fontSize: '13px', color: '#D8D2C8', letterSpacing: '0.08em' }}>{tag}</span>
                    </div>
                  ))}
                </div>

                {/* ── Navigation ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  {/* Prev */}
                  <button
                    onClick={() => setKitchenSlide(s => Math.max(0, s - 1))}
                    disabled={kitchenSlide === 0}
                    style={{
                      background: 'none', border: '1px solid #C4A04A44', padding: '8px 14px',
                      color: kitchenSlide === 0 ? '#C4A04A22' : '#C4A04A',
                      cursor: kitchenSlide === 0 ? 'default' : 'pointer',
                      fontSize: '14px', letterSpacing: '0.12em', fontFamily: 'inherit',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { if (kitchenSlide > 0) e.currentTarget.style.borderColor = '#C4A04A' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#C4A04A44' }}
                  >
                    {zh ? '← 上一個' : '← Prev'}
                  </button>

                  {/* Dot indicators */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {kitchenSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setKitchenSlide(idx)}
                        style={{
                          width: idx === kitchenSlide ? '20px' : '5px',
                          height: '5px',
                          background: idx === kitchenSlide ? '#C4A04A' : '#C4A04A33',
                          border: 'none', padding: 0, cursor: 'pointer',
                          transition: 'width 0.3s ease, background 0.2s',
                          borderRadius: '1px',
                        }}
                      />
                    ))}
                  </div>

                  {/* Next */}
                  <button
                    onClick={() => setKitchenSlide(s => Math.min(kitchenSlides.length - 1, s + 1))}
                    disabled={kitchenSlide === kitchenSlides.length - 1}
                    style={{
                      background: 'none', border: '1px solid #C4A04A44', padding: '8px 14px',
                      color: kitchenSlide === kitchenSlides.length - 1 ? '#C4A04A22' : '#C4A04A',
                      cursor: kitchenSlide === kitchenSlides.length - 1 ? 'default' : 'pointer',
                      fontSize: '14px', letterSpacing: '0.12em', fontFamily: 'inherit',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { if (kitchenSlide < kitchenSlides.length - 1) e.currentTarget.style.borderColor = '#C4A04A' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#C4A04A44' }}
                  >
                    {zh ? '下一個 →' : 'Next →'}
                  </button>
                </div>

                <p className="font-sans mt-10" style={{ fontSize: '11px', color: '#9B8A6A', letterSpacing: '0.15em', opacity: 0.7 }}>
                  {zh ? '廚房實錄 · 斯里印度宮 · 台中' : 'Kitchen Capture · Sree India Palace · Taichung'}
                </p>
              </div>

              {/* ── RIGHT: video or gallery depending on slide type ── */}
              <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'flex-end' }}>

                {kitchenSlides[kitchenSlide].type === 'gallery' ? (
                  /* ── Gallery grid (slide 3 — Butter Chicken) ── */
                  <div style={{ width: 'clamp(260px, 30vw, 380px)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {(zh ? kitchenSlides[kitchenSlide].galleryZH : kitchenSlides[kitchenSlide].gallery).map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            position: 'relative',
                            aspectRatio: '1',
                            background: '#140D06',
                            border: '1px solid #C4A04A18',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '14px',
                          }}
                        >
                          {/* Corner ornament */}
                          <div style={{ position: 'absolute', top: '8px', left: '8px', width: '12px', height: '12px', borderTop: '1px solid #C4A04A44', borderLeft: '1px solid #C4A04A44' }} />
                          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '12px', height: '12px', borderTop: '1px solid #C4A04A44', borderRight: '1px solid #C4A04A44' }} />
                          {/* Video placeholder label */}
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.12 }}>
                            <div style={{ width: '28px', height: '28px', border: '1px solid #C4A04A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ width: 0, height: 0, borderLeft: '9px solid #C4A04A', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', marginLeft: '2px' }} />
                            </div>
                          </div>
                          {/* Text label */}
                          <p className="font-sans" style={{ fontSize: '9px', color: '#C4A04A', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2px', position: 'relative', zIndex: 1 }}>
                            {item.label}
                          </p>
                          <p className="font-sans" style={{ fontSize: '8px', color: '#9B8A6A', letterSpacing: '0.15em', position: 'relative', zIndex: 1, opacity: 0.7 }}>
                            {item.sublabel}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ── Portrait video box ── */
                  <div style={{ width: 'clamp(220px, 26vw, 340px)', position: 'relative' }}>
                    <div
                      style={{
                        position: 'relative',
                        paddingTop: 'calc(16 / 9 * 100%)',
                        overflow: 'hidden',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                        WebkitMaskComposite: 'source-in',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                        maskComposite: 'intersect',
                      }}
                    >
                      {kitchenSlides[kitchenSlide].videoSrc ? (
                        <video
                          key={kitchenSlides[kitchenSlide].videoSrc}
                          autoPlay muted loop playsInline
                          style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            filter: 'sepia(20%) saturate(1.2) brightness(0.85)',
                            transition: 'filter 0.7s ease',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.filter = 'sepia(0%) saturate(1.3) brightness(1)' }}
                          onMouseLeave={e => { e.currentTarget.style.filter = 'sepia(20%) saturate(1.2) brightness(0.85)' }}
                        >
                          <source src={kitchenSlides[kitchenSlide].videoSrc} type="video/mp4" />
                        </video>
                      ) : (
                        /* Placeholder — video to be added */
                        <div
                          style={{
                            position: 'absolute', inset: 0,
                            background: '#100B05',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: '16px',
                          }}
                        >
                          <div style={{ width: '48px', height: '48px', border: '1px solid #C4A04A33', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 0, height: 0, borderLeft: '16px solid #C4A04A33', borderTop: '9px solid transparent', borderBottom: '9px solid transparent', marginLeft: '4px' }} />
                          </div>
                          <p className="font-sans" style={{ fontSize: '8px', color: '#C4A04A', letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.35, textAlign: 'center' }}>
                            {zh ? '影片' : 'Video'}<br />{zh ? '即將上線' : 'Coming Soon'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>


      {/* ── MARQUEE TICKER ── */}
      <div style={{ background: '#9B7A2A', overflow: 'hidden', padding: '22px 0' }}>
        <style>{`
          @keyframes ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            white-space: nowrap;
            animation: ticker 40s linear infinite;
          }
          .ticker-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="ticker-track">
          {[...Array(4)].map((_, pass) => (
            <span key={pass} style={{ display: 'inline-flex', alignItems: 'center' }}>
              {[
                'Hyderabadi Dum Biryani',
                'Palak Paneer',
                'Chicken Tikka',
                'Lamb Seekh Kebab',
                'Masala Dosa',
                'Rogan Josh',
                'Kadai Prawns',
                'Gulab Jamun',
                'Mango Lassi',
                'Sree\'s Special',
                'Gosht Biryani',
                'Dal Tadka',
                'Paneer Tikka',
                'Malai Tikka',
              ].map((item, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0' }}>
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      color: i % 3 === 0 ? '#FFFFFF' : '#0A0805',
                      textTransform: 'uppercase',
                      padding: '0 36px',
                    }}
                  >
                    {item}
                  </span>
                  <span style={{ color: '#FFFFFF', fontSize: '7px', opacity: 0.7 }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

    </motion.div>
  )
}
