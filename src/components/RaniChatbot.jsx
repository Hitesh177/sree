import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuCategories } from '../data/menu'
import { BOOKING_URL, UBEREATS_PICKUP_URL, UBEREATS_DELIVERY_URL } from '../constants'

// ── Static content (bilingual) ────────────────────────────────────────────────
const HOURS = {
  en: ['Mon – Fri:  11:30 – 15:00  &  17:00 – 22:00', 'Sat – Sun:  11:30 – 22:30'],
  zh: ['週一 – 週五：11:30 – 15:00 & 17:00 – 22:00', '週六 – 週日：11:30 – 22:30'],
}

const FAQS = {
  en: [
    { q: 'Do you have vegetarian options?', a: 'Yes! We have a full vegetarian section — paneer dishes, dal curries, dosa, idli, veg biryani and more, all clearly marked on our menu.' },
    { q: 'Do I need to pre-order Dum Biryani?', a: 'Yes — the Hyderabad Dhum Biryani requires advance notice. Please mention it when reserving or call us a few hours ahead.' },
    { q: 'What payment methods do you accept?', a: 'We accept cash and most major credit cards. Note: American Express may have limitations.' },
    { q: 'Can I adjust the spice level?', a: 'Absolutely! Let our staff know your preference when ordering — most dishes can go mild to extra spicy.' },
    { q: 'Is there parking nearby?', a: 'Street parking is available on Gongyi North Street and surrounding roads in the West District.' },
    { q: 'Do I need a reservation?', a: 'Walk-ins are welcome, but reservations are strongly recommended on weekends and for groups of 5+.' },
  ],
  zh: [
    { q: '有素食選項嗎？', a: '有的！我們有完整的素食菜單，包括印度芝士料理、扁豆咖哩、薄餅、米糕、蔬菜香飯等，菜單上有清楚標示。' },
    { q: '需要提前預訂海德拉巴慢燉香飯嗎？', a: '是的，需要提前告知。請在訂位時說明，或提前幾小時致電我們。' },
    { q: '接受哪些付款方式？', a: '我們接受現金和主要信用卡。美國運通卡可能有限制。' },
    { q: '可以調整辣度嗎？', a: '當然可以！點餐時告知服務人員您的偏好，大多數菜餚可調整為不辣或加辣。' },
    { q: '附近有停車場嗎？', a: '公益北街及西區附近街道有路邊停車位可供使用。' },
    { q: '需要提前訂位嗎？', a: '不一定，但週末及5人以上團體強烈建議提前預約。' },
  ],
}

const CHEF_PICKS = menuCategories.flatMap(c => c.dishes).filter(d => d.chefRecommended)

const AMENITY_GROUPS = [
  {
    labelEN: 'Accessibility',
    labelZH: '無障礙設施',
    items: [
      { en: 'Wheelchair entrance', zh: '輪椅無障礙入口' },
      { en: 'Wheelchair seating', zh: '輪椅無障礙座位' },
      { en: 'Wheelchair toilet', zh: '輪椅無障礙廁所' },
      { en: 'Wheelchair car park', zh: '輪椅無障礙停車場' },
      { en: 'Hearing loop', zh: '助聽感應線圈' },
    ],
  },
  {
    labelEN: 'Dietary Options',
    labelZH: '飲食選項',
    items: [
      { en: 'Vegetarian', zh: '素食' },
      { en: 'Vegan', zh: '全素' },
      { en: 'Small plates', zh: '小份料理' },
      { en: 'Alcohol & Beer', zh: '酒類飲品' },
    ],
  },
  {
    labelEN: 'Atmosphere',
    labelZH: '用餐氛圍',
    items: [
      { en: 'Casual', zh: '休閒' },
      { en: 'Cosy', zh: '溫馨' },
      { en: 'Quiet', zh: '安靜' },
      { en: 'Trendy', zh: '時尚' },
    ],
  },
  {
    labelEN: 'Great For',
    labelZH: '適合族群',
    items: [
      { en: 'Families', zh: '親子家庭' },
      { en: 'Groups', zh: '團體聚餐' },
      { en: 'Solo dining', zh: '單人用餐' },
      { en: 'LGBTQ+ friendly', zh: 'LGBTQ+ 友善' },
      { en: 'Tourists', zh: '觀光旅客' },
    ],
  },
  {
    labelEN: 'Amenities',
    labelZH: '基本設施',
    items: [
      { en: 'Free Wi-Fi', zh: '免費 Wi-Fi' },
      { en: 'Toilet', zh: '洗手間' },
      { en: 'High chairs', zh: '兒童高腳椅' },
      { en: 'Paid parking', zh: '付費停車場' },
    ],
  },
  {
    labelEN: 'Payments',
    labelZH: '付款方式',
    items: [
      { en: 'Credit cards', zh: '信用卡' },
      { en: 'Debit cards', zh: '簽帳卡' },
    ],
  },
  {
    labelEN: 'Pets',
    labelZH: '寵物',
    items: [
      { en: 'Dogs allowed inside', zh: '室內可攜犬' },
    ],
  },
]

// ── Bilingual bot personality ─────────────────────────────────────────────────
const BOT_REPLIES = {
  en: {
    menu: "Excellent taste — you're already looking at the menu. Let me show you around:",
    reserve: "Smart move. Our tables fill up faster than our biryani does. Let's get you booked:",
    hours: "We're open when you're hungry. Which, presumably, is always:",
    recs: "The chef asked me to pass these along. She'd be quietly devastated if you didn't try at least one:",
    faq: "The questions people ask when they're nervous about ordering. All completely valid. Here we go:",
    order: "Stay home. Get curry. This is the way:",
    info: "Everything worth knowing before you walk in:",
  },
  zh: {
    menu: '本宮最愛的環節！請準備好被香料的世界征服：',
    reserve: '訂位是聰明之舉。本宮的座位比香飯還搶手，請儘快行動：',
    hours: '本宮隨時恭候，以下是確切的開放時間：',
    recs: '這些是主廚的心頭好。本宮保證，嘗過之後您會想把整道菜端走：',
    faq: '以下是最常被問到的問題——全都問得很好，本宮不怪您：',
    order: '足不出戶，咖哩到家。人生的最佳決策之一：',
    info: '進門前您需要知道的一切，本宮已為您整理好：',
  },
}

// ── Free-text chat routing & validation ──────────────────────────────────────
const KEYWORDS = {
  menu:    ['menu', 'food', 'eat', 'dish', 'dishes', 'what', 'cuisine', 'order', 'item', '菜單', '菜', '食物', '吃', '料理', '什麼'],
  reserve: ['reserve', 'book', 'table', 'reservation', 'seat', 'booking', 'dine', '訂位', '預訂', '座位', '訂桌', '預約'],
  hours:   ['hours', 'open', 'time', 'close', 'when', 'schedule', 'timing', 'today', '時間', '營業', '幾點', '開門', '關門'],
  recs:    ['recommend', 'best', 'popular', 'chef', 'pick', 'suggest', 'famous', 'top', 'special', '推薦', '主廚', '最好', '特色', '招牌'],
  order:   ['delivery', 'uber', 'takeaway', 'pickup', 'deliver', 'takeout', '外送', '外帶', '訂餐', '送餐', 'ubereats'],
  faq:     ['question', 'help', 'parking', 'vegetarian', 'vegan', 'spice', 'payment', 'pay', 'allerg', 'wifi', 'wi-fi', '問題', '素食', '辣', '付款', '停車', '過敏'],
  info:    ['accessibility', 'wheelchair', 'amenity', 'facilities', 'pet', 'dog', 'disabled', '無障礙', '設施', '寵物', '狗', '輪椅'],
}

const FUNNY_FALLBACKS = {
  en: [
    "Bold move typing that into a curry chat. I only speak biryani — ask me about our menu, hours, or reservations!",
    "My royal education covered naan, not... whatever that was. Try asking about our food or bookings?",
    "I appreciate the curiosity. Truly. But I'm a specialist — specifically in making you hungry. Can I show you our menu?",
    "Fascinating question. Zero percent within my area of expertise, which is spectacular Indian food. Want to try again?",
    "I've consulted the spice cabinet. No answers there either. Why not ask me about the menu instead?",
  ],
  zh: [
    "本宮的智慧雖廣，但也僅限於咖哩與香飯的領域。換個問題試試？",
    "這個問題讓本宮陷入沉思……不過，台中最道地的印度料理才是正事！想看菜單還是訂位？",
    "本宮已盡力理解，但建議您問問菜單或訂位事宜，那才是本宮的強項！",
    "本宮掌管著整個廚房，但這個問題嘛……實在超出本宮的管轄範圍。試試問問我們的菜吧？",
  ],
}

const INPUT_ERRORS = {
  en: {
    empty:    "Saying nothing? Even our biryani has more substance than that.",
    tooShort: "I need at least a few letters to work with. Try a full word?",
    numeric:  "I speak curry, not calculus. Try asking something in plain English.",
    gibberish:"Creative. But my expertise is strictly limited to spectacular Indian food. Try a real question!",
  },
  zh: {
    empty:    "本宮在等您的問題呢！請輸入文字。",
    tooShort: "這也太短了，本宮看不懂。多說一點？",
    numeric:  "本宮精通咖哩，不精通數字。請用文字提問！",
    gibberish:"這個輸入讓本宮困惑了。不如問問我們的菜單或訂位？",
  },
}

let fallbackIndex = { en: 0, zh: 0 }

function validateInput(text) {
  const t = text.trim()
  if (!t) return 'empty'
  if (t.length < 2) return 'tooShort'
  if (/^\d+$/.test(t)) return 'numeric'
  const letters = t.replace(/[^a-zA-Z]/g, '')
  if (letters.length > 5 && !/[aeiou]/i.test(letters)) return 'gibberish'
  return null
}

function routeInput(text) {
  const lower = text.toLowerCase()
  for (const [action, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) return action
  }
  return null
}

// ── Sub-components ────────────────────────────────────────────────────────────
function Chip({ label, onClick, gold }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 13px',
        background: gold ? 'rgba(155,122,42,0.15)' : 'none',
        border: `1px solid ${gold ? '#C4A04A88' : '#9B7A2A55'}`,
        borderRadius: 20,
        color: gold ? '#C4A04A' : '#C8C0B0',
        fontSize: 11,
        cursor: 'pointer',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(155,122,42,0.25)'; e.currentTarget.style.borderColor = '#C4A04A' }}
      onMouseLeave={e => { e.currentTarget.style.background = gold ? 'rgba(155,122,42,0.15)' : 'none'; e.currentTarget.style.borderColor = gold ? '#C4A04A88' : '#9B7A2A55' }}
    >
      {label}
    </button>
  )
}

function DishCard({ dish, zh }) {
  return (
    <div style={{
      background: '#141008',
      border: `1px solid ${dish.chefRecommended ? '#C4A04A33' : '#9B7A2A1A'}`,
      borderRadius: 8,
      padding: '10px 12px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.06em',
            padding: '1px 5px',
            borderRadius: 2,
            background: dish.isVeg ? 'rgba(76,175,80,0.15)' : 'rgba(200,60,60,0.12)',
            color: dish.isVeg ? '#5EAF62' : '#C86464',
            border: `1px solid ${dish.isVeg ? '#5EAF6233' : '#C8646433'}`,
            flexShrink: 0,
          }}>
            {dish.isVeg ? 'VEG' : 'NON-VEG'}
          </span>
          <span style={{ color: dish.chefRecommended ? '#C4A04A' : '#E0D8C8', fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>
            {zh ? dish.nameZH : dish.name}
            {dish.chefRecommended && (
              <span style={{ marginLeft: 5, fontSize: 9, color: '#C4A04A', letterSpacing: '0.1em', opacity: 0.9 }}>
                CHEF'S PICK
              </span>
            )}
          </span>
        </div>
        <span style={{ color: '#C4A04A', fontSize: 12, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>
          NT${dish.price}
        </span>
      </div>
      <p style={{ color: '#C8C0B0', fontSize: 11, margin: 0, lineHeight: 1.45, opacity: 0.75 }}>
        {zh ? dish.descriptionZH : dish.description}
        {dish.spiceLevel > 0 && (
          <span style={{ marginLeft: 6, display: 'inline-flex', gap: 2, verticalAlign: 'middle' }}>
            {Array.from({ length: dish.spiceLevel }).map((_, i) => (
              <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#C4603A', display: 'inline-block' }} />
            ))}
          </span>
        )}
      </p>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RaniChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState(null)
  const [screen, setScreen] = useState('lang')
  const [selectedCat, setSelectedCat] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [messages, setMessages] = useState([])
  const [hasOpened, setHasOpened] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const zh = lang === 'zh'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, screen])

  const addMsg = (type, content) =>
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), type, content }])

  const selectLang = (l) => {
    setLang(l)
    setScreen('main')
    setMessages([{
      id: 1, type: 'bot',
      content: l === 'en'
        ? "Namaste! I'm Rani — your royal guide to Sree India Palace. No crown required to dine here, but it helps. How can I help you?"
        : '您好！本宮是 Rani，斯里印度餐廳的御用嚮導。本宮的使命：讓每位客人吃得心滿意足，並暗暗計畫下次回訪。請問有什麼需要幫助的？',
    }])
  }

  const goMain = () => { setScreen('main'); setSelectedCat(null); setOpenFaq(null) }

  const handleAction = (id) => {
    const labels = {
      en: { menu: 'Explore the Menu', reserve: 'Reserve a Table', hours: 'Hours & Location', recs: "Chef's Picks", faq: 'FAQs', order: 'Order on Uber Eats', info: 'Accessibility & Info' },
      zh: { menu: '探索菜單', reserve: '預訂座位', hours: '營業時間與地址', recs: '主廚推薦', faq: '常見問題', order: 'Uber Eats 點餐', info: '設施與無障礙資訊' },
    }
    addMsg('user', labels[lang][id])
    setTimeout(() => { addMsg('bot', BOT_REPLIES[lang][id]); setScreen(id) }, 280)
  }

  const handleCatSelect = (cat) => {
    addMsg('user', zh ? cat.nameZH : cat.name)
    setTimeout(() => {
      addMsg('bot', zh
        ? `以下是我們的${cat.nameZH}，共 ${cat.dishes.length} 道菜：`
        : `Here are our ${cat.name} dishes — ${cat.dishes.length} to choose from:`)
      setSelectedCat(cat)
      setScreen('menu-items')
    }, 280)
  }

  const handleTextSubmit = (e) => {
    e?.preventDefault()
    const text = inputValue.trim()
    setInputError('')

    const err = validateInput(text)
    if (err) {
      setInputError(INPUT_ERRORS[lang || 'en'][err])
      return
    }

    addMsg('user', text)
    setInputValue('')

    const action = routeInput(text)
    setTimeout(() => {
      if (action) {
        addMsg('bot', BOT_REPLIES[lang][action])
        setScreen(action)
      } else {
        const pool = FUNNY_FALLBACKS[lang]
        const idx = fallbackIndex[lang] % pool.length
        fallbackIndex[lang]++
        addMsg('bot', pool[idx])
      }
    }, 300)
  }

  const ACTIONS = {
    en: [
      { id: 'menu',    label: 'Menu' },
      { id: 'reserve', label: 'Reserve' },
      { id: 'order',   label: 'Uber Eats' },
      { id: 'hours',   label: 'Hours' },
      { id: 'recs',    label: "Chef's Picks" },
      { id: 'faq',     label: 'FAQs' },
      { id: 'info',    label: 'Accessibility' },
    ],
    zh: [
      { id: 'menu',    label: '菜單' },
      { id: 'reserve', label: '訂位' },
      { id: 'order',   label: 'Uber Eats' },
      { id: 'hours',   label: '營業時間' },
      { id: 'recs',    label: '主廚推薦' },
      { id: 'faq',     label: '常見問題' },
      { id: 'info',    label: '設施資訊' },
    ],
  }

  return (
    <>
      {/* ── Trigger button ── */}
      <motion.button
        onClick={() => { setIsOpen(v => !v); setHasOpened(true) }}
        aria-label={isOpen ? 'Close Rani chatbot' : 'Chat with Rani, your guide to Sree India Palace'}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed', bottom: 32, right: 24, zIndex: 50,
          width: 56, height: 56, borderRadius: '50%',
          background: isOpen ? '#1C1008' : 'transparent',
          border: '2px solid #C4A04A',
          boxShadow: '0 4px 24px rgba(196,160,74,0.4)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', padding: 0,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="close" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#C4A04A" strokeWidth="2.5" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.img
              key="avatar"
              src="/rani-avatar.webp"
              alt="Rani"
              style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 18%', margin: '-2px' }}
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}
            />
          )}
        </AnimatePresence>
        {!hasOpened && (
          <motion.div
            style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid #C4A04A', pointerEvents: 'none' }}
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
          />
        )}
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            role="dialog"
            aria-label="Rani — Sree India Palace Assistant"
            aria-live="polite"
            style={{
              position: 'fixed',
              bottom: 100,
              right: 16,
              width: 'min(380px, calc(100vw - 32px))',
              height: 'min(580px, calc(100vh - 130px))',
              background: '#0E0805',
              border: '1px solid #9B7A2A55',
              borderTop: '2px solid #C4A04A',
              borderRadius: 6,
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
          >
            {/* Header */}
            <div style={{
              background: '#130C06',
              borderBottom: '1px solid #9B7A2A33',
              padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
            }}>
              <img
                src="/rani-avatar.webp"
                alt="Rani"
                style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 18%', flexShrink: 0, border: '1px solid #9B7A2A55' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#E0D8C8', fontSize: 13, fontWeight: 600, margin: 0, letterSpacing: '0.04em', fontFamily: "'Cinzel', serif" }}>Rani</p>
                <p style={{ color: '#9B7A2A', fontSize: 9, margin: 0, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.8 }}>
                  {zh ? '斯里印度宮 · 御用嚮導' : 'Sree India Palace · Your Guide'}
                </p>
              </div>
              {lang && (
                <button
                  onClick={() => { setLang(null); setScreen('lang'); setMessages([]); setInputValue(''); setInputError('') }}
                  style={{
                    background: 'none', border: '1px solid #9B7A2A44', borderRadius: 3,
                    color: '#9B7A2A', fontSize: 10, padding: '3px 8px', cursor: 'pointer',
                    letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'inherit',
                  }}
                >
                  {zh ? 'EN' : 'ZH'}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{ background: 'none', border: 'none', color: '#C8C0B0', opacity: 0.45, cursor: 'pointer', padding: 4, flexShrink: 0 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── LANGUAGE SELECT ── */}
            {screen === 'lang' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, gap: 24, background: '#0E0805' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: '#E0D8C8', fontSize: 18, margin: '0 0 6px', fontStyle: 'italic', letterSpacing: '0.02em', fontFamily: "'Cinzel', serif", fontWeight: 300 }}>
                    Sree India Palace
                  </p>
                  <p style={{ color: '#C8C0B0', fontSize: 11, opacity: 0.5, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 4px' }}>
                    Choose your language
                  </p>
                  <p style={{ color: '#C8C0B0', fontSize: 11, opacity: 0.5, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>
                    請選擇您的語言
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                  {[
                    { l: 'en', main: 'English', sub: 'Continue in English' },
                    { l: 'zh', main: '中文',    sub: '繼續使用中文' },
                  ].map(({ l, main, sub }) => (
                    <button
                      key={l}
                      onClick={() => selectLang(l)}
                      style={{
                        flex: 1, padding: '18px 12px',
                        background: '#141008', border: '1px solid #9B7A2A55',
                        borderRadius: 10, cursor: 'pointer',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                        transition: 'all 0.18s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#C4A04A'; e.currentTarget.style.background = '#1C1008' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#9B7A2A55'; e.currentTarget.style.background = '#141008' }}
                    >
                      <span style={{ color: '#C4A04A', fontSize: 22, fontWeight: 700 }}>{main}</span>
                      <span style={{ color: '#C8C0B0', fontSize: 10, opacity: 0.55 }}>{sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── CHAT AREA ── */}
            {screen !== 'lang' && (
              <>
                {/* Scrollable message + content area */}
                <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 6px', display: 'flex', flexDirection: 'column', gap: 10, background: '#0E0805' }}>

                  {/* Chat messages */}
                  {messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', gap: 8 }}
                    >
                      {msg.type === 'bot' && (
                        <img src="/rani-avatar.webp" alt="Rani"
                          style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 18%', flexShrink: 0, marginTop: 2, border: '1px solid #9B7A2A44' }}
                        />
                      )}
                      <div style={{
                        maxWidth: '76%', padding: '9px 12px', lineHeight: 1.5, fontSize: 13,
                        borderRadius: msg.type === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                        background: msg.type === 'user' ? 'rgba(155,122,42,0.2)' : '#1C1008',
                        border: `1px solid ${msg.type === 'user' ? '#9B7A2A55' : '#9B7A2A1A'}`,
                        color: '#E0D8C8',
                      }}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  {/* ── SCREEN CONTENT ── */}

                  {/* Menu categories */}
                  {screen === 'menu' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', flexWrap: 'wrap', gap: 7, paddingLeft: 32 }}>
                      {menuCategories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => handleCatSelect(cat)}
                          style={{
                            padding: '7px 11px', background: '#141008',
                            border: '1px solid #9B7A2A44', borderRadius: 7,
                            color: '#E0D8C8', fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = '#C4A04A'; e.currentTarget.style.color = '#C4A04A' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#9B7A2A44'; e.currentTarget.style.color = '#E0D8C8' }}
                        >
                          {zh ? cat.nameZH : cat.name}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* Menu items */}
                  {screen === 'menu-items' && selectedCat && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {selectedCat.dishes.map(dish => <DishCard key={dish.id} dish={dish} zh={zh} />)}
                    </motion.div>
                  )}

                  {/* Reservation */}
                  {screen === 'reserve' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 32 }}>
                      <a
                        href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'block', background: 'linear-gradient(135deg, #9B7A2A, #C4A04A)',
                          color: '#0A0805', textAlign: 'center', padding: '14px 16px',
                          borderRadius: 9, fontWeight: 700, fontSize: 13,
                          textDecoration: 'none', letterSpacing: '0.04em',
                        }}
                      >
                        {zh ? 'Book on Google →' : 'Book a Table on Google →'}
                      </a>
                      <div style={{ background: '#141008', border: '1px solid #9B7A2A22', borderRadius: 9, padding: '12px 14px' }}>
                        <p style={{ color: '#C4A04A', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', margin: '0 0 10px' }}>
                          {zh ? 'Or contact directly' : 'Or contact directly'}
                        </p>
                        <p style={{ color: '#E0D8C8', fontSize: 13, margin: '0 0 4px', fontWeight: 600 }}>+886 910 309 268</p>
                        <p style={{ color: '#C8C0B0', fontSize: 11, margin: '0 0 8px', opacity: 0.6 }}>info@sreeindiapalace.com</p>
                        <p style={{ color: '#C8C0B0', fontSize: 11, margin: 0, opacity: 0.55, fontStyle: 'italic' }}>
                          {zh ? 'Reservations recommended on weekends & for groups of 5+' : 'Reservations recommended on weekends & for groups of 5+'}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Hours */}
                  {screen === 'hours' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingLeft: 32 }}>
                      <div style={{ background: '#141008', border: '1px solid #9B7A2A22', borderRadius: 9, padding: '12px 14px' }}>
                        <p style={{ color: '#C4A04A', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', margin: '0 0 10px' }}>
                          {zh ? 'Opening Hours' : 'Opening Hours'}
                        </p>
                        {HOURS[lang].map((h, i) => (
                          <p key={i} style={{ color: '#E0D8C8', fontSize: 12, margin: i === 0 ? '0 0 6px' : 0, lineHeight: 1.5 }}>{h}</p>
                        ))}
                      </div>
                      <div style={{ background: '#141008', border: '1px solid #9B7A2A22', borderRadius: 9, padding: '12px 14px' }}>
                        <p style={{ color: '#C4A04A', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', margin: '0 0 8px' }}>
                          {zh ? 'Address' : 'Address'}
                        </p>
                        <p style={{ color: '#E0D8C8', fontSize: 12, margin: '0 0 10px', lineHeight: 1.5 }}>
                          {zh ? '台中市西區公益北街 45 號' : 'No. 45, Gongyi N St\nWest District, Taichung 403'}
                        </p>
                        <a
                          href="https://www.google.com/maps/place/Sree+India+Palace/data=!4m2!3m1!1s0x0:0x3412c8fb700a411d"
                          target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'inline-block', background: '#9B7A2A22',
                            border: '1px solid #9B7A2A44', borderRadius: 5,
                            color: '#C4A04A', fontSize: 11, padding: '6px 12px', textDecoration: 'none',
                          }}
                        >
                          {zh ? 'Open in Google Maps →' : 'Open in Google Maps →'}
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* Uber Eats order */}
                  {screen === 'order' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 32 }}>
                      <a href={UBEREATS_DELIVERY_URL} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                          background: '#06C167', color: '#000', padding: '14px 16px',
                          borderRadius: 9, fontWeight: 700, fontSize: 13, textDecoration: 'none', letterSpacing: '0.04em',
                        }}>
                        {zh ? 'Uber Eats Delivery →' : 'Order Delivery on Uber Eats →'}
                      </a>
                      <a href={UBEREATS_PICKUP_URL} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                          background: '#141008', color: '#06C167', border: '1px solid #06C16744',
                          padding: '14px 16px', borderRadius: 9, fontWeight: 600, fontSize: 13, textDecoration: 'none', letterSpacing: '0.04em',
                        }}>
                        {zh ? 'Pickup →' : 'Pickup →'}
                      </a>
                      <p style={{ color: '#C8C0B0', fontSize: 11, opacity: 0.5, textAlign: 'center', margin: 0 }}>
                        {zh ? '使用 Uber Eats 應用程式追蹤您的訂單' : 'Track your order in the Uber Eats app'}
                      </p>
                    </motion.div>
                  )}

                  {/* Chef's Picks */}
                  {screen === 'recs' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {CHEF_PICKS.map(dish => <DishCard key={dish.id} dish={dish} zh={zh} />)}
                    </motion.div>
                  )}

                  {/* Accessibility & Info */}
                  {screen === 'info' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {AMENITY_GROUPS.map((group) => (
                        <div key={group.labelEN} style={{ background: '#141008', border: '1px solid #9B7A2A1A', borderRadius: 8, padding: '10px 12px' }}>
                          <p style={{ color: '#C4A04A', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                            {zh ? group.labelZH : group.labelEN}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                            {group.items.map((item) => (
                              <span
                                key={item.en}
                                style={{
                                  fontSize: 10, color: '#C8C0B0', background: '#0A0805',
                                  border: '1px solid #9B7A2A33', borderRadius: 3, padding: '3px 8px', lineHeight: 1.5,
                                }}
                              >
                                {zh ? item.zh : item.en}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* FAQs */}
                  {screen === 'faq' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {FAQS[lang].map((f, i) => (
                        <div key={i} style={{
                          background: '#141008',
                          border: `1px solid ${openFaq === i ? '#C4A04A55' : '#9B7A2A1A'}`,
                          borderRadius: 8, overflow: 'hidden',
                        }}>
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            style={{
                              width: '100%', background: 'none', border: 'none',
                              padding: '10px 12px', cursor: 'pointer',
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              color: '#E0D8C8', fontSize: 12, textAlign: 'left', gap: 8,
                            }}
                          >
                            <span style={{ lineHeight: 1.4 }}>{f.q}</span>
                            <span style={{ color: '#C4A04A', fontSize: 16, flexShrink: 0, lineHeight: 1 }}>
                              {openFaq === i ? '−' : '+'}
                            </span>
                          </button>
                          <AnimatePresence>
                            {openFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div style={{ padding: '0 12px 12px', borderTop: '1px solid #9B7A2A1A', paddingTop: 10, color: '#C8C0B0', fontSize: 11, lineHeight: 1.65 }}>
                                  {f.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  <div style={{ height: 4 }} />
                </div>

                {/* ── Bottom bar: chips + text input ── */}
                <div style={{ borderTop: '1px solid #9B7A2A33', flexShrink: 0, background: '#0C0703' }}>

                  {/* Quick reply chips */}
                  <div style={{ padding: '8px 14px 6px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {screen === 'main' && lang && ACTIONS[lang].map(a => (
                      <Chip key={a.id} label={a.label} onClick={() => handleAction(a.id)} gold />
                    ))}
                    {screen === 'menu-items' && (
                      <>
                        <Chip label={zh ? 'Categories' : 'Categories'} onClick={() => { setScreen('menu'); setSelectedCat(null) }} />
                        <Chip label={zh ? 'Main Menu' : 'Main Menu'} onClick={goMain} />
                      </>
                    )}
                    {['menu', 'reserve', 'order', 'hours', 'recs', 'faq', 'info'].includes(screen) && (
                      <Chip label={zh ? 'Back' : 'Back'} onClick={goMain} />
                    )}
                  </div>

                  {/* Text input */}
                  <form onSubmit={handleTextSubmit} style={{ padding: '0 10px 10px', display: 'flex', gap: 7, alignItems: 'flex-end' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {inputError && (
                        <p style={{ color: '#C4603A', fontSize: 10, margin: 0, paddingLeft: 2, lineHeight: 1.4 }}>
                          {inputError}
                        </p>
                      )}
                      <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={e => { setInputValue(e.target.value); setInputError('') }}
                        placeholder={zh ? '輸入您的問題…' : 'Ask me anything…'}
                        style={{
                          background: '#141008',
                          border: `1px solid ${inputError ? '#C4603A55' : '#9B7A2A44'}`,
                          borderRadius: 20,
                          color: '#E0D8C8',
                          fontSize: 12,
                          padding: '9px 14px',
                          outline: 'none',
                          width: '100%',
                          fontFamily: 'inherit',
                          transition: 'all 0.15s',
                          cursor: 'text',
                        }}
                        onFocus={e => { e.target.style.borderColor = '#C4A04A'; setInputError('') }}
                        onBlur={e => e.target.style.borderColor = inputError ? '#C4603A55' : '#9B7A2A44'}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                        background: inputValue.trim() ? 'linear-gradient(135deg, #9B7A2A, #C4A04A)' : '#141008',
                        border: '1px solid #9B7A2A55',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke={inputValue.trim() ? '#1A0E05' : '#9B7A2A'} strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
