import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const jars = [
  { file: 'clove.webp',        nameEN: 'Clove',         nameZH: '丁香',   nameTEL: 'లవంగం',         factEN: 'Cloves contain eugenol — a natural anaesthetic used in Indian cooking to warm the body and deepen biryani\'s aroma.', factZH: '丁香含有丁香酚——一種天然麻醉劑，用於印度料理中暖身，並加深香飯的香氣。', number: '01' },
  { file: 'cardamom.webp',     nameEN: 'Cardamom',      nameZH: '小荳蔻', nameTEL: 'ఏలకులు',         factEN: 'Called the Queen of Spices — cardamom\'s floral sweetness is the secret in every cup of chai and pot of biryani.', factZH: '被稱為香料女王——小荳蔻的花香甜味，是每杯印度奶茶和每鍋印度香飯的秘密。', number: '02' },
  { file: 'saffron.webp',      nameEN: 'Saffron',       nameZH: '番紅花', nameTEL: 'కుంకుమపువ్వు',  factEN: 'More precious than gold by weight. Just a pinch of saffron turns biryani rice a deep royal gold.', factZH: '按重量計比黃金更珍貴。只需一小撮番紅花，就能將印度香飯米飯染成深邃的皇家金色。', number: '03' },
  { file: 'chili.webp',        nameEN: 'Red Chilli',    nameZH: '紅辣椒', nameTEL: 'మిర్చి',         factEN: 'India\'s Guntur chili is one of the world\'s hottest — the backbone of mirchi ka salan.', factZH: '印度貢德爾辣椒是世界上最辣的辣椒之一——是辣椒沙拉的靈魂。', number: '04' },
  { file: 'cumin.webp',        nameEN: 'Cumin',         nameZH: '孜然',   nameTEL: 'జీలకర్ర',        factEN: 'Dry-roasted cumin gives Indian raita its signature smoky depth.', factZH: '乾炒孜然賦予印度優格醬其標誌性的煙燻深度。', number: '05' },
  { file: 'turmeric.webp',     nameEN: 'Turmeric',      nameZH: '薑黃',   nameTEL: 'పసుపు',          factEN: 'Used in India for 4,000 years — turmeric\'s golden colour is sacred in both cooking and ceremony.', factZH: '在印度使用了4,000年——薑黃的金色在烹飪和儀式中都是神聖的。', number: '06' },
  { file: 'cinnamon.webp',     nameEN: 'Cinnamon',      nameZH: '肉桂',   nameTEL: 'దాల్చిన చెక్క', factEN: 'A whole cinnamon stick dropped into hot oil is the very first step in making authentic dum biryani.', factZH: '將整根肉桂棒放入熱油中，是製作正宗印度香飯的第一步。', number: '07' },
  { file: 'bay-leaf.webp',     nameEN: 'Bay Leaf',      nameZH: '月桂葉', nameTEL: 'బిర్యాని ఆకు',  factEN: 'In Telugu kitchens bay leaf is called Biryani Aaku — the biryani leaf. A pot without it simply isn\'t right.', factZH: '在泰盧固廚房中，月桂葉被稱為Biryani Aaku——印度香飯葉。沒有它的鍋，就是不對。', number: '08' },
  { file: 'mustard-seeds.webp',nameEN: 'Mustard Seeds', nameZH: '芥末籽', nameTEL: 'ఆవాలు',          factEN: 'When mustard seeds hit hot oil they pop like tiny fireworks — this tempering is the aromatic foundation of Indian dal and raita.', factZH: '當芥末籽遇到熱油時，像小煙火一樣爆裂——這種爆香是印度扁豆湯和優格醬的香氣基礎。', number: '09' },
]

const cinzel = { fontFamily: "'Cinzel', serif" }
const mono = { fontFamily: "'Monograph', system-ui, sans-serif" }

export default function Spices() {
  const [hovered, setHovered] = useState(null)
  const { language } = useLanguage()
  const zh = language === 'zh'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: '#FAF5EC', minHeight: '100vh', paddingTop: '72px' }}
    >

      {/* ── HERO HEADER ── */}
      <div
        style={{
          borderBottom: '1px solid #D4C5A655',
          padding: '72px 40px 56px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Blueprint grid watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,112,109,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,112,109,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />

        {/* Eyebrow */}
        <p
          style={{
            ...mono,
            fontSize: '11px',
            letterSpacing: '0.3em',
            color: '#9B7A2A',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          {zh ? '印度廚房' : 'Indian Kitchen'}
        </p>

        {/* Main title */}
        <h1
          style={{
            ...cinzel,
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 600,
            color: '#1A0E05',
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '0.02em',
          }}
        >
          {zh ? '香料櫃' : 'The Spice Cabinet'}
        </h1>

        {/* Sub */}
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '16px',
            color: '#5C4A32',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          {zh ? '九種香料。數個世紀的印度傳統。將滑鼠移至每個罐子，探索其中的故事。' : 'Nine spices. Centuries of Indian tradition. Hover each jar to uncover the story within.'}
        </p>

        {/* Teal rule */}
        <div
          style={{
            width: '40px',
            height: '2px',
            background: '#9B7A2A',
            margin: '32px auto 0',
          }}
        />
      </div>

      {/* ── FEATURE SECTION — "What makes it unique?" ── */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '72px 40px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '56px',
          alignItems: 'center',
        }}
      >
        {/* Image with hand-drawn ingredient annotations */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderRadius: '2px', position: 'relative' }}
        >
          <img
            src="/spice-feature-nobg.png"
            alt="What makes Indian spices unique"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          {/* SVG annotation layer — hand-drawn arrows + labels */}
          <svg
            viewBox="0 0 480 600"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              pointerEvents: 'none',
              overflow: 'visible',
            }}
            aria-hidden="true"
          >
            <defs>
              {/* Hand-drawn arrowhead marker */}
              <marker id="spice-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M 0,1 C 2,2 5,3.5 7,4 C 5,4.5 2,6 0,7 C 2,5.5 2,4.5 0,1 Z"
                      fill="#9B7A2A" opacity="0.9"/>
              </marker>
              {/* Soft drop shadow for text legibility */}
              <filter id="txt-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#FAF5EC" floodOpacity="0.95"/>
              </filter>
            </defs>

            {/* ── URAD DAL — white seeds, top of bowl ── */}
            <g opacity="0.92">
              <path d="M 74,146 C 108,148 155,158 186,167 C 196,170 202,173 204,175"
                    stroke="#9B7A2A" strokeWidth="1.4" fill="none" strokeLinecap="round"
                    markerEnd="url(#spice-arrow)"/>
              <text filter="url(#txt-shadow)" x="70" y="142" fontFamily="monospace" fontSize="9"
                    fill="#9B7A2A" letterSpacing="1.8" textAnchor="end" fontWeight="600">
                {zh ? '烏拉德豆' : 'URAD DAL'}
              </text>
            </g>

            {/* ── GARLIC — white cloves, right of bowl ── */}
            <g opacity="0.92">
              <path d="M 406,174 C 392,176 374,182 357,188 C 348,191 340,192 336,192"
                    stroke="#9B7A2A" strokeWidth="1.4" fill="none" strokeLinecap="round"
                    markerEnd="url(#spice-arrow)"/>
              <text filter="url(#txt-shadow)" x="410" y="177" fontFamily="monospace" fontSize="9"
                    fill="#9B7A2A" letterSpacing="1.8" textAnchor="start" fontWeight="600">
                {zh ? '大蒜' : 'GARLIC'}
              </text>
            </g>

            {/* ── GINGER — pale slices, right of bowl ── */}
            <g opacity="0.92">
              <path d="M 406,218 C 389,218 369,216 350,216 C 338,216 328,215 321,215"
                    stroke="#9B7A2A" strokeWidth="1.4" fill="none" strokeLinecap="round"
                    markerEnd="url(#spice-arrow)"/>
              <text filter="url(#txt-shadow)" x="410" y="221" fontFamily="monospace" fontSize="9"
                    fill="#9B7A2A" letterSpacing="1.8" textAnchor="start" fontWeight="600">
                {zh ? '薑' : 'GINGER'}
              </text>
            </g>

            {/* ── MUSTARD SEEDS — tiny black seeds, bowl center ── */}
            <g opacity="0.92">
              <path d="M 74,268 C 110,268 155,266 190,266 C 208,266 221,267 230,268"
                    stroke="#9B7A2A" strokeWidth="1.4" fill="none" strokeLinecap="round"
                    markerEnd="url(#spice-arrow)"/>
              <text filter="url(#txt-shadow)" x="70" y="271" fontFamily="monospace" fontSize="9"
                    fill="#9B7A2A" letterSpacing="1.8" textAnchor="end" fontWeight="600">
                {zh ? '芥末籽' : 'MUSTARD'}
              </text>
            </g>

            {/* ── CURRY LEAVES — long leaves, lower left ── */}
            <g opacity="0.92">
              <path d="M 74,358 C 100,355 128,351 152,350 C 163,349 172,349 178,350"
                    stroke="#9B7A2A" strokeWidth="1.4" fill="none" strokeLinecap="round"
                    markerEnd="url(#spice-arrow)"/>
              <text filter="url(#txt-shadow)" x="70" y="361" fontFamily="monospace" fontSize="9"
                    fill="#9B7A2A" letterSpacing="1.8" textAnchor="end" fontWeight="600">
                {zh ? '咖哩葉' : 'CURRY LEAVES'}
              </text>
            </g>

            {/* ── DRIED CHILIES — long red peppers, bottom ── */}
            <g opacity="0.92">
              <path d="M 74,456 C 90,453 108,450 122,449 C 131,448 139,448 144,449"
                    stroke="#9B7A2A" strokeWidth="1.4" fill="none" strokeLinecap="round"
                    markerEnd="url(#spice-arrow)"/>
              <text filter="url(#txt-shadow)" x="70" y="459" fontFamily="monospace" fontSize="9"
                    fill="#9B7A2A" letterSpacing="1.8" textAnchor="end" fontWeight="600">
                {zh ? '乾辣椒' : 'DRIED CHILIES'}
              </text>
            </g>

          </svg>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ ...mono, fontSize: '10px', color: '#9B7A2A', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '20px' }}>
            {zh ? '烹飪哲學' : 'The Philosophy of Flavour'}
          </p>
          <h2 style={{ ...cinzel, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 600, color: '#1A0E05', lineHeight: 1.2, marginBottom: '24px' }}>
            {zh ? '是什麼讓它與眾不同？' : 'What makes it unique?'}
          </h2>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: '15px', color: '#5C4A32', lineHeight: 1.8, marginBottom: '20px' }}>
            {zh
              ? '印度料理的靈魂在於爆香技法——將芥末籽、咖哩葉、烏拉德豆和乾辣椒依序下入熱油，每一種食材在精確的時刻釋放其香氣，層層疊加，創造出無法複製的深邃風味。'
              : 'The soul of Indian cuisine lies in the tempering — mustard seeds, curry leaves, urad dal and dried chilies dropped into hot oil in a precise sequence. Each ingredient releases its fragrance at exactly the right moment, building layers of flavour that cannot be rushed or replicated.'}
          </p>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: '15px', color: '#5C4A32', lineHeight: 1.8 }}>
            {zh
              ? '薑的辛辣、大蒜的濃郁、番紅花的金色——這些不僅是調料，而是數百年宮廷廚房的活生生記憶，每一道菜都承載著莫臥兒王朝的歷史。'
              : 'Ginger\'s heat, garlic\'s depth, saffron\'s gold — these are not merely ingredients but living memories of centuries of royal kitchens, carried into every dish we serve.'}
          </p>

          {/* Ingredient tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '32px' }}>
            {(zh
              ? ['芥末籽', '咖哩葉', '乾辣椒', '大蒜', '薑', '烏拉德豆']
              : ['Mustard Seeds', 'Curry Leaves', 'Dried Chilies', 'Garlic', 'Ginger', 'Urad Dal']
            ).map(tag => (
              <span
                key={tag}
                style={{
                  ...mono,
                  fontSize: '10px',
                  color: '#9B7A2A',
                  border: '1px solid #9B7A2A44',
                  padding: '5px 12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── SPICE GRID ── */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '80px 40px 100px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '48px 32px',
            justifyItems: 'center',
          }}
        >
          {jars.map((jar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                width: '160px',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tooltip */}
              {hovered === i && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 16px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '240px',
                    background: '#0A0805',
                    border: '1px solid #9B7A2A44',
                    padding: '16px 18px',
                    zIndex: 20,
                    pointerEvents: 'none',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
                  }}
                >
                  {/* Arrow */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '10px',
                      height: '6px',
                      background: '#0A0805',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }}
                  />
                  <p style={{ ...mono, fontSize: '10px', color: '#9B7A2A', letterSpacing: '0.15em', marginBottom: '6px' }}>
                    {jar.number}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: '11px', color: '#C8C0B0', lineHeight: 1.6 }}>
                    <span style={{ color: '#C4A04A', fontWeight: 500 }}>{zh ? jar.nameZH : jar.nameEN}</span>
                    <br /><br />
                    {zh ? jar.factZH : jar.factEN}
                  </p>
                </div>
              )}

              {/* Jar image */}
              <img
                src={`/spice-jars/${jar.file}`}
                alt={jar.nameEN}
                onError={(e) => { e.currentTarget.style.opacity = '0.15' }}
                style={{
                  width: '140px',
                  height: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  transform: hovered === i ? 'scale(1.08) translateY(-6px)' : 'scale(1)',
                  transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  filter: hovered === i
                    ? 'drop-shadow(0 16px 32px rgba(155,122,42,0.35))'
                    : 'drop-shadow(0 4px 8px rgba(0,0,0,0.08))',
                }}
              />

              {/* Name label */}
              <div style={{ marginTop: '14px', textAlign: 'center' }}>
                <p
                  style={{
                    ...mono,
                    fontSize: '12px',
                    color: hovered === i ? '#1A0E05' : '#5C4A32',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}
                >
                  {zh ? jar.nameZH : jar.nameEN}
                </p>
              </div>

              {/* Number badge */}
              <p
                style={{
                  ...mono,
                  fontSize: '10px',
                  color: '#D4C5A6',
                  letterSpacing: '0.15em',
                  marginTop: '6px',
                }}
              >
                {jar.number}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '80px',
            borderTop: '1px solid #D4C5A655',
            paddingTop: '40px',
          }}
        >
          <p
            style={{
              ...mono,
              fontSize: '11px',
              color: '#9B8A6A',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {zh ? '每種香料均直接從印度採購 · 現場新鮮研磨' : 'Each spice sourced directly from India · Freshly ground in-house'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
