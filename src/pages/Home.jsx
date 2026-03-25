import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import GoldDivider from '../components/GoldDivider'
import BiryaniScrollSequence from '../components/BiryaniScrollSequence'
import FAQSection from '../components/FAQSection'
import { BOOKING_URL, UBEREATS_PICKUP_URL, UBEREATS_DELIVERY_URL } from '../constants'

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const testimonials = [
  {
    name: 'Kiki',
    source: 'kikifunlife.com',
    textEN: 'The cuisine is truly authentic and delicious. Butter Chicken was my favourite curry of the day, and the whole family absolutely loved the naan. Already planning to come back and try more.',
    textZH: '料理非常道地且美味！奶油雞是當天最喜歡的咖哩，全家都超愛烤餅，下次還要再來試試其他料理。',
  },
  {
    name: '貪吃鬼熊熊',
    source: 'bearlovefood.com',
    textEN: 'A genuine carnival for the taste buds — every bite gives you the extraordinary sensation of being transported to India. The layered spice aromas are unforgettable. A must on Taichung\'s food map.',
    textZH: '一場味蕾的嘉年華！每口都有飛到印度的新奇體驗感，香料的層次讓人難忘。台中必訪的美食地圖。',
  },
  {
    name: '商妮',
    source: 'sunnylife.tw',
    textEN: 'The tandoori drumsticks were incredibly tender and juicy — sweet, spicy, and aromatic all at once. The masala dosa grows more fragrant with every bite. Genuinely over 100 authentic dishes.',
    textZH: '印度棒棒腿口感非常軟嫩多汁，酸酸甜甜香辣帶勁；瑪沙拉香料煎餅越咬越香，菜單真的超過百種！',
  },
  {
    name: 'Kiwi',
    source: 'ikiwi.tw',
    textEN: 'Large lamb pieces stewed beautifully tender, paired with curry spices to reveal the meat\'s natural sweetness. The naan\'s crispy-chewy texture is superb. Came away genuinely impressed.',
    textZH: '大塊羊肉燉得非常軟嫩，搭配咖哩香料整個吃得出羊肉的甜味。烤餅的香酥嚼勁真的很棒，吃過後挺喜歡！',
  },
]

function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-heading font-light text-art-gold/70" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}>
        {number}
      </span>
      <div className="w-8 h-px bg-art-border" />
      <span className="font-sans text-[10px] text-art-ink-2 tracking-[0.3em] uppercase">{label}</span>
    </div>
  )
}

export default function Home() {
  const { language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* ── HERO — biryani video ── */}
      <BiryaniScrollSequence />


      {/* ── 01 MENU CATEGORIES — text index ── */}
      <section className="py-24 px-8 md:px-14 xl:px-24">
        <div className="max-w-screen-xl mx-auto">

          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          >
            <div>
              <SectionLabel number="01" label={language === 'zh' ? '我們的菜單' : 'Our Menu'} />
              <h2
                className="font-heading font-light text-art-ink leading-tight tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)' }}
              >
                {language === 'zh' ? '皇家盛宴' : <>A Royal<br /><em>Feast Awaits</em></>}
              </h2>
            </div>
            <Link to="/menu" className="btn-outline shrink-0 self-start md:self-auto">
              {language === 'zh' ? '查看完整菜單' : 'View Full Menu'}
            </Link>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
          >
            <div className="border-t border-art-border/50">
              {[
                { name: 'Biryani & Rice',    nameZH: '香飯與米飯' },
                { name: 'Curries & Gravies', nameZH: '咖哩與醬汁' },
                { name: 'Tandoor',           nameZH: '坦都爐特色菜' },
                { name: 'Breads',            nameZH: '印度烤餅' },
                { name: 'Appetizers',        nameZH: '開胃菜' },
                { name: 'Desserts',          nameZH: '甜品' },
              ].map((cat, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Link
                    to="/menu"
                    className="group flex items-center gap-6 md:gap-10 py-6 md:py-7 border-b border-art-border/50 transition-colors duration-200 hover:bg-art-ink/[0.018]"
                  >
                    <span className="font-sans text-[9px] text-art-ink/25 tracking-[0.3em] flex-none w-6">
                      0{i + 1}
                    </span>
                    <h3
                      className="font-heading font-light text-art-ink flex-1 leading-none tracking-tight transition-colors duration-300 group-hover:text-[#9B7A2A]"
                      style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)' }}
                    >
                      {language === 'zh' ? cat.nameZH : cat.name}
                    </h3>
                    <span className="font-sans text-[9px] text-art-ink/20 tracking-[0.25em] uppercase flex-none transition-all duration-300 group-hover:text-[#9B7A2A]/60 group-hover:tracking-[0.38em]">
                      {language === 'zh' ? '查看' : 'View'}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>


      {/* ── 02 HERITAGE — Mughal mosaic full-bleed ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        {/* Mosaic background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/mughal-mosaic.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.04)',
          }}
        />
        {/* Dark gradient overlay — heavier at edges, lighter in centre to show mosaic */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(10,8,5,0.82) 0%, rgba(10,8,5,0.55) 50%, rgba(10,8,5,0.82) 100%)',
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="font-sans text-[10px] tracking-[0.35em] uppercase mb-6"
            style={{ color: '#C4A04A' }}
          >
            {language === 'zh' ? '02 · 皇室傳承' : '02 · Royal Heritage'}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-heading font-light leading-tight tracking-tight mb-8"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: '#F0E8D8' }}
          >
            {language === 'zh'
              ? <>四百年的<em>莫臥兒傳統</em></>
              : <>Four Centuries of<br /><em>Mughal Tradition</em></>}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-sans font-light leading-relaxed max-w-xl"
            style={{ fontSize: '16px', color: '#C8C0B0', opacity: 0.85 }}
          >
            {language === 'zh'
              ? '我們的印度料理誕生於莫臥兒宮廷的皇家廚房，融合了波斯、土耳其與泰盧固飲食文化的精髓。每一道菜都承載著四個世紀的記憶，從尼扎姆王朝的盛宴桌走進台中的餐桌。'
              : 'Born in the royal kitchens of the Mughal court, our Indian cuisine is a convergence of Persian, Turkish, and Telugu culinary traditions. Each dish carries four centuries of memory — from the feast tables of the Nizams to your table in Taichung.'}
          </motion.p>

          <motion.div variants={fadeUp} style={{ marginTop: '40px' }}>
            <Link to="/our-story" className="btn-gold">
              {language === 'zh' ? '了解我們的故事' : 'Discover Our Story'}
            </Link>
          </motion.div>
        </motion.div>
      </section>


      {/* ── 03 REVIEWS — real Google reviews ── */}
      <section className="py-28 px-8 md:px-14 xl:px-24" style={{ background: '#FAF5EC' }}>
        <div className="max-w-screen-xl mx-auto">

          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          >
            <div>
              {/* Section label */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-heading font-light" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)', color: '#9B7A2A', opacity: 0.7 }}>03</span>
                <div className="w-8 h-px" style={{ background: '#9B8A6A', opacity: 0.35 }} />
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: '#9B8A6A' }}>
                  {language === 'zh' ? '顧客評論' : 'Guest Reviews'}
                </span>
              </div>
              <h2
                className="font-heading font-light leading-tight tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', color: '#1A0E05' }}
              >
                {language === 'zh' ? <>真實的<em>顧客聲音</em></> : <>Real Words from<br /><em>Real Guests</em></>}
              </h2>
            </div>

            {/* Google Reviews badge */}
            <a
              href="https://www.google.com/maps/place/Sree+India+Palace/data=!4m2!3m1!1s0x0:0x3412c8fb700a411d"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 shrink-0 self-start md:self-auto"
              style={{
                background: '#FAF5EC',
                border: '1px solid #D4C5A6',
                padding: '14px 20px',
                textDecoration: 'none',
              }}
            >
              {/* Google G logo */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {'★★★★★'.split('').map((s, j) => (
                    <span key={j} style={{ fontSize: '12px', color: '#FBBC05' }}>{s}</span>
                  ))}
                </div>
                <span className="font-sans" style={{ fontSize: '10px', color: '#9B8A6A', letterSpacing: '0.1em' }}>
                  {language === 'zh' ? '在 Google 上查看' : 'See on Google'}
                </span>
              </div>
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ background: '#D4C5A655' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-10 lg:p-14 transition-colors duration-300 flex flex-col"
                style={{ background: i % 2 === 0 ? '#FAF5EC' : '#F3EBD8', position: 'relative', overflow: 'hidden' }}
              >
                {/* Indian floral frame — left edge */}
                <img
                  src="/review-frame.png"
                  aria-hidden="true"
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: 36, height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    mixBlendMode: 'multiply',
                    opacity: 0.45,
                    pointerEvents: 'none',
                  }}
                />
                {/* Indian floral frame — right edge (mirrored) */}
                <img
                  src="/review-frame.png"
                  aria-hidden="true"
                  style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 36, height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    mixBlendMode: 'multiply',
                    opacity: 0.45,
                    transform: 'scaleX(-1)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Top row: avatar initial + name + Google icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="flex items-center justify-center font-heading font-light shrink-0"
                    style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: '#9B7A2A18',
                      border: '1px solid #9B7A2A44',
                      color: '#9B7A2A',
                      fontSize: '1.1rem',
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-medium truncate" style={{ fontSize: '13px', color: '#1A0E05', letterSpacing: '0.04em' }}>
                      {t.name}
                    </p>
                    <p className="font-sans" style={{ fontSize: '11px', color: '#9B8A6A', letterSpacing: '0.06em' }}>
                      {t.source}
                    </p>
                  </div>
                  {/* Google G mark */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-40">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84z" fill="#EA4335"/>
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {'★★★★★'.split('').map((s, j) => (
                    <span key={j} style={{ fontSize: '14px', color: '#FBBC05' }}>{s}</span>
                  ))}
                </div>

                {/* Review text */}
                <p
                  className="font-heading italic leading-relaxed flex-1"
                  style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', color: '#2C1A0A' }}
                >
                  "{language === 'zh' ? t.textZH : t.textEN}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 04 GALLERY PREVIEW — full bleed ── */}
      {/* overflow:visible so the lamp can hang below this section */}
      <section className="relative h-[70vh] min-h-[500px]" style={{ overflow: 'visible' }}>

        {/* Background image + overlay — clipped to section bounds */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/gallery-hero.webp"
            alt="Sree India Palace dining room"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-art-dark/55" />
        </div>

        {/* Text + button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p
              className="font-sans text-[10px] tracking-[0.35em] uppercase mb-2"
              style={{ color: '#C4A04A' }}
            >
              {language === 'zh' ? '04 · 相簿' : '04 · Gallery'}
            </p>
            <h2
              className="font-heading font-light text-art-cream leading-tight tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
            >
              {language === 'zh' ? <>一覽<em>我們的世界</em></> : <>See Our<br /><em>World</em></>}
            </h2>
            <Link to="/gallery" className="btn-lotus">
              {language === 'zh' ? '探索相簿' : 'Explore Gallery'}
            </Link>
          </motion.div>
        </div>

        {/* Hanging lamp — top: 100% places the chain's top exactly at the gallery photo's bottom edge */}
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          pointerEvents: 'none',
        }}>
          <motion.div
            style={{ transformOrigin: 'top center', display: 'inline-block' }}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          >
            <img
              src="/lamp-clean.png"
              alt=""
              aria-hidden="true"
              style={{
                width: 'clamp(140px, 16vw, 220px)',
                height: 'auto',
                filter: 'drop-shadow(0 8px 40px rgba(196,160,74,0.5))',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA — Bidri dark with peacock teal ── */}
      <section style={{ background: '#0A0805', overflow: 'visible', paddingTop: 'clamp(300px, 38vw, 380px)', paddingBottom: '7rem' }}>

        <div className="px-8 md:px-14 xl:px-24">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <p
                className="font-sans text-[10px] tracking-[0.3em] uppercase mb-6"
                style={{ color: '#C4A04A' }}
              >
                {language === 'zh' ? '歡迎蒞臨' : 'Join Us'}
              </p>
              <h2
                className="font-heading font-light leading-tight tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', color: '#E0D8C8' }}
              >
                {language === 'zh'
                  ? <>今晚預訂您的<em>皇家體驗</em></>
                  : <>Reserve Your<br /><em>Royal Experience</em><br />Tonight</>}
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4 lg:items-end">
              <p
                className="font-sans font-light text-sm max-w-xs leading-relaxed lg:text-right"
                style={{ color: '#C8C0B0', opacity: 0.5 }}
              >
                {language === 'zh'
                  ? '台中西區，每天提供午餐和晚餐服務。建議週末預訂座位。'
                  : 'West District, Taichung. Lunch & dinner daily. Reservations recommended for weekends.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-lotus">
                  {language === 'zh' ? '立即預訂' : 'Reserve Now'}
                </a>
                <a
                  href={UBEREATS_DELIVERY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:opacity-80"
                  style={{ fontSize: '11px', background: '#06C167', color: '#000', padding: '14px 20px', borderRadius: 2 }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-3V6a4 4 0 00-8 0v1H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2zm-9-1a2 2 0 014 0v1h-4V6zm10 14H4V9h16v11z"/></svg>
                  {language === 'zh' ? 'Uber Eats 外送' : 'Order Delivery'}
                </a>
                <a
                  href={UBEREATS_PICKUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans font-medium tracking-[0.15em] uppercase transition-all duration-300"
                  style={{ fontSize: '11px', color: '#06C167', border: '1px solid #06C16755', padding: '14px 20px', borderRadius: 2 }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                  {language === 'zh' ? '自取' : 'Pickup'}
                </a>
                <a
                  href="https://wa.me/886910309268"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-sans font-medium tracking-[0.18em] uppercase transition-colors duration-300"
                  style={{
                    fontSize: '11px',
                    color: '#C4A04A',
                    border: '1px solid #9B7A2A55',
                    padding: '14px 24px',
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </section>

      <FAQSection />
    </motion.div>
  )
}
