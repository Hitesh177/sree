import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import GeometricPattern from '../components/GeometricPattern'

// ── Data ─────────────────────────────────────────────────────────────────────

const bentoItems = [
  {
    id: 1, type: 'photo',
    src: '/biryani-cover.webp',
    alt: 'Hyderabadi Biryani', altZH: '海德拉巴香飯',
    label: 'The Biryani', labelZH: '招牌香飯',
    colSpan: 2, rowSpan: 2,
  },
  {
    id: 2, type: 'video',
    src: '/samosa.mp4',
    poster: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
    alt: 'Samosa', altZH: '薩摩沙',
    label: 'Samosa', labelZH: '薩摩沙角',
    colSpan: 1, rowSpan: 2,
  },
  {
    id: 3, type: 'photo',
    src: '/thali-cover.webp',
    alt: 'Indian Thali', altZH: '印度套餐',
    label: 'The Thali', labelZH: '印度套餐',
    colSpan: 1, rowSpan: 1,
  },
  {
    id: 4, type: 'photo',
    src: '/hyderabadi-vs-north.jpg',
    alt: 'Spice Selection', altZH: '香料精選',
    label: 'Spices of India', labelZH: '印度香料',
    colSpan: 1, rowSpan: 1,
  },
]

const videoReels = [
  {
    id: 1, src: '/biryani-hero.mp4',
    poster: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    title: 'Dum Biryani', titleZH: '慢燉香飯',
    desc: 'Sealed in the pot, cooked over slow fire', descZH: '封鍋慢火，一層一層疊香',
  },
  {
    id: 2, src: '/samosa.mp4',
    poster: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
    title: 'Fresh Samosa', titleZH: '現炸薩摩沙',
    desc: 'Fried to order, every single service', descZH: '每次服務，現點現炸',
  },
  {
    id: 3, src: '/menu-hero.mp4',
    poster: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    title: 'Our Kitchen', titleZH: '我們的廚房',
    desc: 'Where tradition meets fire', descZH: '傳統與烈火的交匯',
  },
]

const spiceCards = [
  { src: '/spice-jars/saffron.webp',  name: 'Saffron',       nameZH: '番紅花',     origin: 'Kashmir, India',   originZH: '印度喀什米爾', note: 'The most precious spice in our kitchen. Used in biryani and kheer.',      noteZH: '廚房最珍貴的香料，用於香飯與甜點。' },
  { src: '/spice-jars/cardamom.webp', name: 'Cardamom',      nameZH: '豆蔻',       origin: 'Kerala, India',    originZH: '印度喀拉拉',   note: 'Floral and aromatic. The heart of our masala chai.',                      noteZH: '花香芬芳，香料茶的靈魂。' },
  { src: '/spice-jars/turmeric.webp', name: 'Turmeric',      nameZH: '薑黃',       origin: 'Andhra Pradesh',   originZH: '安得拉邦',     note: 'Golden and earthy. Colors every curry we make.',                          noteZH: '金黃渾厚，為每道咖哩染色。' },
  { src: '/spice-jars/cumin.webp',    name: 'Cumin',         nameZH: '孜然',       origin: 'Rajasthan, India', originZH: '印度拉賈斯坦', note: 'Warm and nutty. The first spice to hit the oil.',                         noteZH: '溫熱堅果香，第一個入鍋的香料。' },
  { src: '/spice-jars/chili.webp',    name: 'Kashmiri Chili',nameZH: '喀什米爾辣椒', origin: 'Kashmir, India', originZH: '印度喀什米爾', note: 'Deep red colour, mild heat. Gives dishes their signature hue.',           noteZH: '深紅色澤，溫和辣度，賦予菜肴標誌性色調。' },
  { src: '/spice-jars/cinnamon.webp', name: 'Cinnamon',      nameZH: '肉桂',       origin: 'Sri Lanka',        originZH: '斯里蘭卡',     note: 'Warm sweetness layered into biryanis and slow-cooked curries.',           noteZH: '溫甜風味，融入香飯與慢燉咖哩之中。' },
]

const masonryPhotos = [
  // ── Batch 1 (1–4) ──────────────────────────────────────────────────────────
  { id:  1, src: '/palak-paneer.webp',          alt: 'Palak Paneer',       altZH: '菠菜起司咖哩',      desc: 'Spinach & paneer',          descZH: '嫩起司與菠菜',      cat: 'main'    },
  { id:  2, src: '/biryani-thali.webp',         alt: 'Dum Biryani',        altZH: '慢燉香飯',          desc: 'Saffron · aged basmati',    descZH: '藏紅花與陳年香米',  cat: 'main'    },
  { id:  3, src: '/kheer.webp',                 alt: 'Kheer',              altZH: '印度米布丁',        desc: 'Rose water · saffron',      descZH: '玫瑰水 · 藏紅花',   cat: 'sweet'   },
  { id:  4, src: '/paneer-tikka.webp',          alt: 'Paneer Tikka',       altZH: '坦都烤起司',        desc: 'Tandoor-charred paneer',    descZH: '炭火坦都爐烤製',    cat: 'starter' },
  // ── Batch 2 (5–14) ─────────────────────────────────────────────────────────
  { id:  5, src: '/paneer-tikka-leaf.webp',     alt: 'Paneer Tikka',       altZH: '香蕉葉烤起司',      desc: 'Banana leaf · tandoor',     descZH: '香蕉葉 · 坦都爐',  cat: 'starter' },
  { id:  6, src: '/malai-tikka.webp',           alt: 'Malai Tikka',        altZH: '奶油烤串',          desc: 'Cream · cardamom',          descZH: '奶油 · 豆蔻',      cat: 'starter' },
  { id:  7, src: '/chicken-tikka.webp',         alt: 'Chicken Tikka',      altZH: '雞肉烤串',          desc: 'Overnight marinade',        descZH: '一夜醃製',          cat: 'starter' },
  { id:  8, src: '/navratan-korma.webp',        alt: 'Navratan Korma',     altZH: '九寶咖哩',          desc: 'Nine gems · cream gravy',   descZH: '九種蔬菜 · 奶油醬', cat: 'main'    },
  { id:  9, src: '/tandoori-chicken-full.webp', alt: 'Tandoori Chicken',   altZH: '坦都里全雞',        desc: '480°C clay tandoor',        descZH: '480°C 陶土爐',      cat: 'main'    },
  { id: 10, src: '/jeera-naan.webp',            alt: 'Jeera Naan',         altZH: '孜然烤餅',          desc: 'Cumin · fresh herbs',       descZH: '孜然 · 新鮮香草',   cat: 'bread'   },
  { id: 11, src: '/mirchi-bajji.webp',          alt: 'Mirchi Bajji',       altZH: '炸辣椒',            desc: 'Stuffed · deep fried',      descZH: '釀餡 · 酥炸',       cat: 'starter' },
  { id: 12, src: '/dosa-vada.webp',             alt: 'Dosa & Medu Vada',   altZH: '印度薄餅與炸甜甜圈', desc: 'South Indian classics',    descZH: '南印度經典',        cat: 'bread'   },
  { id: 13, src: '/dahi-puri.webp',             alt: 'Dahi Puri',          altZH: '優格香餅',          desc: 'Yogurt · mint chutney',     descZH: '優格 · 薄荷醬',     cat: 'starter' },
  { id: 14, src: '/seekh-kebab.webp',           alt: 'Seekh Kebab',        altZH: '羊肉烤串',          desc: 'Minced lamb · chargrilled', descZH: '碎羊肉 · 炭烤',     cat: 'main'    },
  // ── Batch 3 (15–23) ────────────────────────────────────────────────────────
  { id: 15, src: '/butter-chicken-makhani.webp',alt: 'Butter Chicken',     altZH: '奶油雞',            desc: 'Tomato · cream · makhani',  descZH: '番茄 · 奶油醬',     cat: 'main'    },
  { id: 16, src: '/chicken-65.webp',            alt: 'Chicken 65',         altZH: '65號炸雞',          desc: 'Crispy · spiced',           descZH: '酥脆 · 香辣',       cat: 'starter' },
  { id: 17, src: '/kadai-chicken.webp',         alt: 'Kadai Chicken',      altZH: '鐵鍋雞',            desc: 'Wok-tossed · bell peppers', descZH: '鐵鍋翻炒 · 甜椒',   cat: 'main'    },
  { id: 18, src: '/dal-tadka.webp',             alt: 'Dal Tadka',          altZH: '香料扁豆',          desc: 'Yellow lentils · tempered', descZH: '黃扁豆 · 香料煸炒', cat: 'main'    },
  { id: 19, src: '/aloo-gobi.webp',             alt: 'Aloo Gobi',          altZH: '馬鈴薯花椰菜',      desc: 'Potato · cauliflower',      descZH: '馬鈴薯 · 花椰菜',   cat: 'main'    },
  { id: 20, src: '/chicken-banana-leaf.webp',   alt: 'Chicken 65',         altZH: '香蕉葉炸雞',        desc: 'Banana leaf · deep fried',  descZH: '香蕉葉 · 酥炸',     cat: 'starter' },
  { id: 21, src: '/fish-tikka.webp',            alt: 'Fish Tikka',         altZH: '魚肉烤串',          desc: 'Marinated · tandoor',       descZH: '醃製 · 坦都爐',     cat: 'starter' },
  { id: 22, src: '/rogan-josh.webp',            alt: 'Rogan Josh',         altZH: '羅干喬什咖哩',      desc: 'Slow-cooked lamb',          descZH: '慢燉羊肉',          cat: 'main'    },
  { id: 23, src: '/paneer-makhani.webp',        alt: 'Paneer Makhani',     altZH: '奶油起司',          desc: 'Cottage cheese · makhani',  descZH: '起司 · 奶油醬',     cat: 'main'    },
]

const FILTER_TABS = [
  { key: 'all',     en: 'All',      zh: '全部' },
  { key: 'starter', en: 'Starters', zh: '前菜' },
  { key: 'main',    en: 'Mains',    zh: '主菜' },
  { key: 'bread',   en: 'Breads',   zh: '麵包' },
  { key: 'sweet',   en: 'Sweets',   zh: '甜點' },
]

// ── GalleryHero ───────────────────────────────────────────────────────────────

function GalleryHero({ zh }) {
  const imgRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  // Subtle parallax: image shifts slightly with cursor
  const offsetX = hovered ? (mousePos.x - 0.5) * -18 : 0
  const offsetY = hovered ? (mousePos.y - 0.5) * -12 : 0

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '100vh', minHeight: 560 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Image — scales up on hover + parallax shift */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${hovered ? 1.06 : 1.01}) translate(${offsetX}px, ${offsetY}px)`,
          transition: hovered
            ? 'transform 0.15s cubic-bezier(0.25,0.46,0.45,0.94)'
            : 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
          willChange: 'transform',
        }}
      >
        <img
          ref={imgRef}
          src="/gallery-hero-dosa.webp"
          alt="Dosa and Vada — Sree India Palace"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 45%' }}
        />
      </div>

      {/* Multi-layer overlay — preserves the dark slate tones, darkens edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%),
            linear-gradient(to bottom, rgba(15,8,2,0.5) 0%, rgba(15,8,2,0.15) 40%, rgba(15,8,2,0.15) 60%, rgba(15,8,2,0.75) 100%)
          `,
        }}
      />

      {/* Warm amber vignette — echoes the golden tones in the food */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(180,110,20,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Text content — centered, text colours pulled from image palette */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.p
          className="font-sans uppercase tracking-[0.45em]"
          style={{ fontSize: '10px', color: 'rgba(210,165,75,0.8)', marginBottom: 20, letterSpacing: '0.45em' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {zh ? '相簿' : 'Gallery'}
        </motion.p>

        <motion.h1
          className="font-heading font-light leading-tight"
          style={{
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            color: '#F5EDD8',            /* warm cream — matches the dosa colour */
            textShadow: '0 2px 40px rgba(0,0,0,0.6), 0 0 80px rgba(180,110,20,0.25)',
            letterSpacing: '-0.01em',
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          {zh ? (
            <>視覺<em style={{ fontStyle: 'italic', color: '#D4A84B' }}>盛宴</em></>
          ) : (
            <>A Feast<br /><em style={{ fontStyle: 'italic', color: '#D4A84B' }}>for the Eyes</em></>
          )}
        </motion.h1>

        {/* Thin gold rule */}
        <motion.div
          style={{ width: 48, height: 1, background: 'rgba(210,165,75,0.5)', marginTop: 28 }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        <motion.p
          className="font-sans font-light"
          style={{ fontSize: '15px', color: 'rgba(245,237,216,0.90)', marginTop: 20, letterSpacing: '0.05em', maxWidth: 380 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {zh
            ? '南印度風味，台中呈現——每一幀都是一個故事'
            : 'South Indian flavours, served in Taichung — every frame tells a story'}
        </motion.p>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: 'linear-gradient(to bottom, transparent, #FAF5EC)' }}
      />

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(210,165,75,0.5)' }}>
          {zh ? '向下滑動' : 'Scroll'}
        </span>
        <motion.div
          style={{ width: 1, height: 32, background: 'rgba(210,165,75,0.35)', transformOrigin: 'top' }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 0.7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 1.6 }}
        />
      </motion.div>
    </section>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function VideoCard({ reel, zh, onExpand }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  function togglePlay(e) {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden group cursor-pointer flex-shrink-0"
      style={{ width: 'clamp(260px, 30vw, 380px)', aspectRatio: '9/14', background: '#0D0703' }}
      onClick={onExpand}
    >
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        loop
        playsInline
        muted
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ opacity: playing ? 1 : 0.85 }}
        onEnded={() => setPlaying(false)}
      />

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* play / pause button */}
      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center z-10"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        <motion.div
          animate={{ scale: playing ? 0.85 : 1, opacity: playing ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-14 h-14 rounded-full border border-[#C4A04A]/70 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#C4A04A">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#C4A04A" style={{ marginLeft: 3 }}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </motion.div>
      </button>

      {/* bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <p className="font-sans text-[9px] tracking-[0.3em] text-[#C4A04A]/70 uppercase mb-1">
          {zh ? '影片' : 'Video'}
        </p>
        <h3 className="font-heading font-light text-white text-xl leading-tight">
          {zh ? reel.titleZH : reel.title}
        </h3>
        <p className="font-sans text-white/85 text-sm mt-1 leading-relaxed">
          {zh ? reel.descZH : reel.desc}
        </p>
      </div>

      {/* expand icon */}
      <button
        onClick={onExpand}
        className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 4 }}
        aria-label="Expand"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A04A" strokeWidth="2">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </button>
    </motion.div>
  )
}

function SpiceCard({ spice, zh }) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden group cursor-default"
      style={{ width: 180, height: 240, background: '#0D0703' }}
    >
      <img
        src={spice.src}
        alt={zh ? spice.nameZH : spice.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ filter: 'brightness(0.75)' }}
      />
      {/* Reveal overlay — slides up on hover */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 transition-all duration-500"
        style={{ background: 'linear-gradient(to top, rgba(10,5,2,0.95) 0%, rgba(10,5,2,0.6) 60%, transparent 100%)', height: '55%' }}
      >
        <p className="font-sans text-[11px] tracking-[0.2em] text-[#C4A04A]/90 uppercase mb-1 translate-y-0">
          {zh ? spice.originZH : spice.origin}
        </p>
        <h4 className="font-heading text-white text-base leading-tight">
          {zh ? spice.nameZH : spice.name}
        </h4>
      </div>
      {/* Full info — visible only on hover */}
      <div
        className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-400"
        style={{ background: 'linear-gradient(to top, rgba(10,5,2,0.97) 0%, rgba(10,5,2,0.85) 50%, rgba(10,5,2,0.3) 100%)', transform: 'translateY(0)' }}
      >
        <p className="font-sans text-[11px] tracking-[0.2em] text-[#C4A04A]/90 uppercase mb-1.5">
          {zh ? spice.originZH : spice.origin}
        </p>
        <h4 className="font-heading text-white text-lg leading-tight mb-2">
          {zh ? spice.nameZH : spice.name}
        </h4>
        <p className="font-sans text-white/85 text-sm leading-relaxed">
          {zh ? spice.noteZH : spice.note}
        </p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Gallery() {
  const { language } = useLanguage()
  const zh = language === 'zh'
  const [lightbox, setLightbox] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [expandedVideo, setExpandedVideo] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredPhotos = activeFilter === 'all' ? masonryPhotos : masonryPhotos.filter(p => p.cat === activeFilter)
  const allLightboxPhotos = filteredPhotos

  function openLightbox(photo) {
    const idx = allLightboxPhotos.findIndex(p => p.id === photo.id)
    setLightboxIndex(idx >= 0 ? idx : 0)
    setLightbox(photo)
  }

  function navLightbox(dir) {
    const next = (lightboxIndex + dir + allLightboxPhotos.length) % allLightboxPhotos.length
    setLightboxIndex(next)
    setLightbox(allLightboxPhotos[next])
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >

      {/* ── Hero ── */}
      <GalleryHero zh={zh} />

      {/* ── Section 1: Bento Featured ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: '#FAF5EC' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="font-sans text-[9px] tracking-[0.35em] text-[#9B7A2A] uppercase mb-2">
              {zh ? '精選瞬間' : 'Featured Moments'}
            </p>
            <h2 className="font-heading font-light text-[#1A0E05] text-3xl md:text-4xl">
              {zh ? '鏡頭背後的故事' : 'Stories Behind the Lens'}
            </h2>
          </div>

          {/* Coming Soon placeholder */}
          <div style={{
            height: '340px',
            background: '#F0E8D8',
            border: '1px dashed #C4B890',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9B7A2A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
            </svg>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', letterSpacing: '0.22em', color: '#9B7A2A', textTransform: 'uppercase' }}>
              {zh ? '即將推出' : 'Coming Soon'}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#9B8A6A', letterSpacing: '0.05em' }}>
              {zh ? '精選照片即將上線' : 'Featured photos coming soon'}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Video Reels ── */}
      <section className="py-16 overflow-hidden" style={{ background: '#0D0703' }}>
        <div className="px-4 md:px-8 mb-10 max-w-7xl mx-auto">
          <p className="font-sans text-[9px] tracking-[0.35em] text-[#9B7A2A] uppercase mb-2">
            {zh ? '廚房影片' : 'Kitchen Reels'}
          </p>
          <h2 className="font-heading font-light text-white text-3xl md:text-4xl">
            {zh ? '看我們如何烹製' : 'Watch Us Cook'}
          </h2>
        </div>

        {/* Coming Soon placeholder */}
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <div style={{
            height: '300px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px dashed rgba(196,160,74,0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C4A04A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
            </svg>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', letterSpacing: '0.22em', color: '#C4A04A', textTransform: 'uppercase' }}>
              {zh ? '即將推出' : 'Coming Soon'}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#8C7D6A', letterSpacing: '0.05em' }}>
              {zh ? '廚房影片即將上線' : 'Kitchen videos coming soon'}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4: Inside the Palace ── */}
      <section className="py-20" style={{ background: '#0E0805' }}>
        {/* Header */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans uppercase"
            style={{ color: '#C4A04A', fontSize: '9px', letterSpacing: '0.38em', marginBottom: 10 }}
          >
            {zh ? '皇宮內部' : 'The Space'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-heading font-light"
            style={{ color: '#F5EDD8', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
          >
            {zh ? '走進斯里印度宮' : 'Inside the Palace'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-sans"
            style={{ color: '#8C7D6A', fontSize: '0.875rem', marginTop: 10, maxWidth: 480 }}
          >
            {zh ? '33 個座位。一個願景。以賓客之禮迎接，以家人之情送別。' : '33 seats. One vision. Come as a guest, leave as family.'}
          </motion.p>
        </div>

        {/* Two large hero images */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { src: '/int-dining-blue.webp',  label: zh ? '入座之後' : 'At Your Table',      sub: zh ? '藍色絲絨椅 · 金色吊燈' : 'Blue velvet · gold lanterns' },
            { src: '/int-dining-hall.webp',  label: zh ? '夜晚時光' : 'An Evening Out',     sub: zh ? '磚牆 · 摩洛哥燈' : 'Exposed brick · Moroccan lamps' },
          ].map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative overflow-hidden group cursor-pointer"
              style={{ aspectRatio: '4/3' }}
              onClick={() => openLightbox({ id: `int-hero-${i}`, src: item.src, alt: item.label, altZH: item.label })}
            >
              <img src={item.src} alt={item.label} className="w-full h-full object-cover"
                style={{ transition: 'transform 0.8s ease', filter: 'brightness(0.88)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'brightness(1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.88)' }}
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(8,4,2,0.82) 0%, rgba(8,4,2,0.1) 55%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-sans" style={{ color: '#C4A04A', fontSize: '8px', letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: 5 }}>{item.sub}</p>
                <h3 className="font-heading font-light text-white" style={{ fontSize: '1.25rem' }}>{item.label}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Horizontal scroll strip — remaining 8 interiors */}
        <div
          style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
          className="flex gap-4 px-6 md:px-12"
        >
          {[
            { src: '/int-reception.webp',     label: zh ? '初到之時' : 'As You Arrive',    sub: zh ? '蓮花浮雕 · 水晶吊燈' : 'Floral screen · crystal chandelier' },
            { src: '/int-entrance.webp',      label: zh ? '踏入的瞬間' : 'First Impressions', sub: zh ? '黃銅細節 · 溫暖燈光' : 'Brass accents · warm light' },
            { src: '/int-bar.webp',           label: zh ? '餐前時光' : 'Before Dinner',    sub: zh ? '背光酒架 · 銅質調酒器具' : 'Backlit shelves · copper barware' },
            { src: '/int-dining-lanterns.webp',label: zh ? '燈籠燈光' : 'Lantern Light',  sub: zh ? '波斯吊燈 · 棋盤地板' : 'Persian lanterns · checkered floor' },
            { src: '/int-dining-booth.webp',  label: zh ? '靜謐一隅' : 'A Quiet Corner',   sub: zh ? '簇絨皮革 · 私密用餐' : 'Tufted leather · intimate dining' },
            { src: '/int-dining-panels.webp', label: zh ? '花牆一景' : 'The Floral Wall',  sub: zh ? '切割花朵圖案 · 磚牆' : 'Cut-flower panels · brick walls' },
            { src: '/int-bar-map.webp',       label: zh ? '印度地圖牆' : 'The India Wall', sub: zh ? '印度地圖壁畫 · 市場燈' : 'India map mural · market lights' },
            { src: '/int-dining-wide.webp',   label: zh ? '整個餐廳' : 'The Full Space',   sub: zh ? '完整宴會視野' : 'Full dining panorama' },
          ].map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.4) }}
              className="relative overflow-hidden group cursor-pointer flex-shrink-0"
              style={{ width: 240, height: 320 }}
              onClick={() => openLightbox({ id: `int-strip-${i}`, src: item.src, alt: item.label, altZH: item.label })}
            >
              <img src={item.src} alt={item.label} className="w-full h-full object-cover"
                style={{ transition: 'transform 0.7s ease, filter 0.4s ease', filter: 'brightness(0.8)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.filter = 'brightness(1.05)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.8)' }}
              />
              {/* vignette */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(8,4,2,0.9) 0%, transparent 55%)' }} />
              {/* hover shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(196,160,74,0.08) 0%, transparent 60%)' }} />
              {/* gold top border on hover */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: '#C4A04A' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-350">
                <p className="font-sans" style={{ color: '#C4A04A', fontSize: '7px', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 4 }}>{item.sub}</p>
                <h3 className="font-heading font-light text-white" style={{ fontSize: '0.875rem' }}>{item.label}</h3>
              </div>
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-4" />
        </div>
      </section>

      {/* ── Section 5: Photo Mosaic ── */}
      <section className="py-16 px-4 md:px-8" style={{ background: '#F0E8D8' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-sans text-[9px] tracking-[0.35em] text-[#9B7A2A] uppercase mb-2">
                {zh ? '我們的鏡頭' : 'Through Our Lens'}
              </p>
              <h2 className="font-heading font-light text-[#1A0E05] text-3xl md:text-4xl">
                {zh ? '每一幀，都是味道' : 'Every Frame, a Flavour'}
              </h2>
            </div>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className="relative font-sans text-[10px] tracking-[0.18em] uppercase px-4 py-2 transition-all duration-250"
                  style={{
                    color: activeFilter === tab.key ? '#1A0E05' : '#9B7A2A',
                    background: activeFilter === tab.key ? '#C4A04A' : 'transparent',
                    border: `1px solid ${activeFilter === tab.key ? '#C4A04A' : '#C4A04A55'}`,
                    letterSpacing: '0.18em',
                  }}
                >
                  {zh ? tab.zh : tab.en}
                  {tab.key !== 'all' && (
                    <span className="ml-1.5 opacity-60" style={{ fontSize: '8px' }}>
                      {masonryPhotos.filter(p => p.cat === tab.key).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CSS columns masonry — animated on filter change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
          <div
            className="masonry-grid"
            style={{ columnCount: 3, columnGap: '12px' }}
          >
            {filteredPhotos.map((photo, i) => (
              /* outer break-inside wrapper — must be display:inline-block to avoid column overlap */
              <div
                key={photo.id}
                style={{ breakInside: 'avoid', pageBreakInside: 'avoid', display: 'inline-block', width: '100%', marginBottom: 12 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.5) }}
                  className="relative overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(photo)}
                >
                  <img
                    src={photo.src}
                    alt={zh ? photo.altZH : photo.alt}
                    className="w-full block"
                    style={{ filter: 'brightness(0.92)', transition: 'transform 0.7s ease, filter 0.5s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.05) saturate(1.12)'; e.currentTarget.style.transform = 'scale(1.04)' }}
                    onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(0.92)'; e.currentTarget.style.transform = 'scale(1)' }}
                  />
                  {/* persistent base vignette */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 52%)' }} />
                  {/* hover dark overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(10,5,2,0.9) 0%, rgba(10,5,2,0.28) 55%, transparent 100%)' }} />
                  {/* gold line */}
                  <div
                    className="absolute left-4 h-px w-0 group-hover:w-7 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ bottom: '58px', background: '#C4A04A', transitionDelay: '0.08s' }}
                  />
                  {/* text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                    <p className="font-sans text-[#C4A04A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 3, transitionDelay: '0.05s' }}>
                      {zh ? (photo.descZH || '') : (photo.desc || '')}
                    </p>
                    <h3 className="font-heading font-light text-white leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ fontSize: '1rem', transitionDelay: '0.1s' }}>
                      {zh ? photo.altZH : photo.alt}
                    </h3>
                  </div>
                  {/* expand icon */}
                  <div className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(0,0,0,0.6)', borderRadius: 3, backdropFilter: 'blur(4px)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C4A04A" strokeWidth="2.5">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Mobile: 2 columns */}
          <style>{`
            @media (max-width: 640px) {
              .masonry-grid { column-count: 2 !important; }
            }
            @media (max-width: 400px) {
              .masonry-grid { column-count: 1 !important; }
            }
          `}</style>
            </motion.div>
          </AnimatePresence>

          {/* empty state */}
          {filteredPhotos.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-sans text-[#9B7A2A]/50 text-sm tracking-widest uppercase">
                {zh ? '暫無圖片' : 'No photos in this category'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Section 5: Instagram CTA ── */}
      <section
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: '#1A0E05' }}
      >
        <div className="relative z-10">
          <p className="font-sans text-[9px] tracking-[0.35em] text-[#9B7A2A] uppercase mb-4">
            {zh ? '追蹤我們' : 'Follow Us'}
          </p>
          <h2 className="font-heading font-light text-white text-4xl md:text-5xl mb-4">
            {zh ? '@斯里印度宮' : '@SreeIndiaPalace'}
          </h2>
          <p className="font-sans text-white/40 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            {zh ? '在Instagram分享您的用餐體驗，加入我們的故事' : 'Share your dining experience and be part of our story'}
          </p>
          <a
            href="https://www.instagram.com/sreeindiapalace_taiwan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 border border-[#9B7A2A]/60 text-[#C4A04A] hover:bg-[#9B7A2A]/20 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            {zh ? '在Instagram追蹤我們' : 'Follow on Instagram'}
          </a>
        </div>
      </section>

      {/* ── Photo Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(10,5,2,0.96)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl mx-4"
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={zh ? lightbox.altZH : lightbox.alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="flex items-center justify-between mt-4 px-1">
                <span className="font-sans text-white/50 text-xs tracking-wider">
                  {zh ? lightbox.altZH : lightbox.alt}
                </span>
                <span className="font-sans text-white/30 text-xs">
                  {lightboxIndex + 1} / {allLightboxPhotos.length}
                </span>
              </div>
            </motion.div>

            {/* Nav arrows */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 hover:border-[#C4A04A]/60 transition-colors duration-200"
              onClick={e => { e.stopPropagation(); navLightbox(-1) }}
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4A04A" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 hover:border-[#C4A04A]/60 transition-colors duration-200"
              onClick={e => { e.stopPropagation(); navLightbox(1) }}
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4A04A" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-[#C4A04A]/60 transition-colors duration-200"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A04A" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Video Lightbox (fullscreen) ── */}
      <AnimatePresence>
        {expandedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(5,2,0,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedVideo(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl mx-4"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
            >
              <video
                key={expandedVideo.id}
                src={expandedVideo.src}
                poster={expandedVideo.poster}
                autoPlay
                loop
                playsInline
                controls
                className="w-full"
                style={{ maxHeight: '80vh', background: '#000' }}
              />
              <div className="mt-4 px-1">
                <h3 className="font-heading font-light text-white text-2xl">
                  {zh ? expandedVideo.titleZH : expandedVideo.title}
                </h3>
                <p className="font-sans text-white/50 text-sm mt-1">
                  {zh ? expandedVideo.descZH : expandedVideo.desc}
                </p>
              </div>
            </motion.div>
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-[#C4A04A]/60 transition-colors duration-200"
              onClick={() => setExpandedVideo(null)}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A04A" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}

// ── BentoCell ─────────────────────────────────────────────────────────────────

function BentoCell({ item, zh, index, cellClass }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  function togglePlay(e) {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }

  return (
    <motion.div
      className={`relative overflow-hidden group cursor-pointer ${cellClass || ''}`}
      style={{ background: '#0D0703', minHeight: 0 }}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {item.type === 'video' ? (
        <>
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            loop playsInline muted
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: playing ? 1 : 0.85 }}
          />
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-10"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            <div className="w-12 h-12 rounded-full border border-[#C4A04A]/70 flex items-center justify-center transition-opacity duration-300"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
              {playing
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="#C4A04A"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="#C4A04A" style={{ marginLeft: 2 }}><polygon points="5,3 19,12 5,21"/></svg>
              }
            </div>
          </button>
        </>
      ) : (
        <img
          src={item.src}
          alt={zh ? item.altZH : item.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* gradient + label */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
        <h3 className="font-heading font-light text-white leading-tight"
          style={{ fontSize: item.colSpan === 2 ? '1.4rem' : '1rem' }}>
          {zh ? item.labelZH : item.label}
        </h3>
      </div>
    </motion.div>
  )
}
