import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { blogPosts } from '../data/blog'

const mono = { fontFamily: "'Monograph', system-ui, sans-serif" }
const cinzel = { fontFamily: "'Cinzel', serif" }

const kolamGrid = {
  backgroundImage: 'radial-gradient(circle, rgba(155,122,42,0.12) 1.2px, transparent 1.2px)',
  backgroundSize: '26px 26px',
}

const allCategories = ['All', ...new Set(blogPosts.map(p => p.category))]
const allCategoriesZH = ['全部', ...new Set(blogPosts.map(p => p.categoryZH))]

function formatDate(dateStr, lang) {
  return new Date(dateStr).toLocaleDateString(
    lang === 'zh' ? 'zh-TW' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}

export default function Blog() {
  const { language } = useLanguage()
  const zh = language === 'zh'
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = zh ? allCategoriesZH : allCategories

  const filtered = blogPosts.filter(post => {
    const matchCategory = activeCategory === 'All' || activeCategory === '全部'
      || post.category === activeCategory || post.categoryZH === activeCategory
    const title = zh ? post.titleZH : post.title
    const matchSearch = !search || title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: '#FAF5EC', paddingTop: '72px' }}
    >

      {/* ── MASTHEAD ── */}
      <div style={{ borderBottom: '2px solid #1A0E05', padding: '28px 40px 18px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <p style={{ ...mono, fontSize: '12px', letterSpacing: '0.3em', color: '#9B7A2A', textTransform: 'uppercase' }}>
            Sree India Palace · {zh ? '故事與知識' : 'Journal & Stories'}
          </p>
          <p style={{ ...mono, fontSize: '12px', letterSpacing: '0.15em', color: '#9B8A6A' }}>
            {blogPosts.length} {zh ? '篇文章' : 'articles'} · Taichung
          </p>
        </div>
      </div>

      {/* ── HERO — split: text left, full Charminar right ── */}
      <section style={{
        position: 'relative',
        background: '#FAF5EC',
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '82vh',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212,197,166,0.35)',
      }}>

        {/* Left: kolamGrid + text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          style={{
            ...kolamGrid,
            flex: '1 1 52%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,60px)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <p style={{ ...mono, fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9B7A2A', marginBottom: '20px' }}>
            {zh ? '飲食文化 · 台灣指南 · 幕後故事' : 'Food Culture · Taiwan Guide · Behind the Scenes'}
          </p>
          <h1 style={{ ...cinzel, fontSize: 'clamp(2.8rem, 5.5vw, 6.5rem)', fontWeight: 300, color: '#1A0E05', lineHeight: 1.0, marginBottom: '24px' }}>
            {zh ? <>故事<br /><em style={{ color: '#9B7A2A' }}>與香料</em></> : <>Stories<br /><em style={{ color: '#9B7A2A' }}>&amp; Spices</em></>}
          </h1>
          <div style={{ width: '48px', height: '1px', background: '#C4A04A', marginBottom: '24px', opacity: 0.5 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(14px,1.4vw,16px)', color: '#5C4A32', lineHeight: 1.8, maxWidth: '460px', fontWeight: 400 }}>
            {zh
              ? '探索印度飲食文化、台灣印度料理指南，以及斯里印度宮廚房的幕後故事。'
              : 'Indian food culture, guides to Indian cuisine in Taiwan, and kitchen stories from Sree India Palace in Taichung.'}
          </p>
          <p style={{ ...mono, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8A6A', opacity: 0.8, marginTop: '32px' }}>
            {zh ? '海德拉巴 · 查爾米納爾' : 'Charminar · Hyderabad'}
          </p>
        </motion.div>

        {/* Right: full Charminar illustration — entire image visible, blended */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
          style={{
            flex: '0 0 48%',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Soft left-edge fade so Charminar melts into the cream text column */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #FAF5EC 0%, rgba(250,245,236,0.45) 18%, transparent 45%)',
            zIndex: 1,
            pointerEvents: 'none',
          }} />
          <img
            src="/charminar.png"
            alt="Charminar, Hyderabad — birthplace of our cuisine"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center bottom',
              filter: 'sepia(0.2) contrast(0.93)',
              mixBlendMode: 'multiply',
              display: 'block',
            }}
          />
        </motion.div>

      </section>

      {/* ── FILTER BAR — sticky ── */}
      <div
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 30,
          background: '#FAF5EC',
          borderBottom: '1px solid #D4C5A655',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '0', flexShrink: 0 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...mono,
                  fontSize: '9px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  padding: '16px 18px',
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${(activeCategory === cat || (cat === '全部' && activeCategory === 'All') || (cat === 'All' && activeCategory === '全部')) ? '#9B7A2A' : 'transparent'}`,
                  color: (activeCategory === cat) ? '#9B7A2A' : '#9B8A6A',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={zh ? '搜尋文章…' : 'Search…'}
              style={{
                ...mono,
                fontSize: '10px',
                letterSpacing: '0.1em',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #C4B89055',
                padding: '6px 0 6px',
                color: '#1A0E05',
                outline: 'none',
                width: '140px',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── POSTS ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>

        {filtered.length === 0 && (
          <p style={{ ...mono, fontSize: '11px', color: '#9B8A6A', letterSpacing: '0.2em', textAlign: 'center', padding: '80px 0' }}>
            {zh ? '找不到相關文章' : 'No articles found'}
          </p>
        )}

        {/* ── FEATURED FIRST POST ── */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link to={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div
                style={{
                  borderBottom: '1px solid #D4C5A655',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'stretch',
                  minHeight: '380px',
                  overflow: 'hidden',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(155,122,42,0.025)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Text column */}
                <div style={{ flex: '1 1 55%', padding: '60px 40px 52px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                    <span style={{ ...mono, fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9B7A2A' }}>
                      {zh ? featured.categoryZH : featured.category}
                    </span>
                    <span style={{ ...mono, fontSize: '11px', letterSpacing: '0.15em', color: '#9B8A6A' }}>
                      {formatDate(featured.date, language)}
                    </span>
                    <span style={{ ...mono, fontSize: '11px', letterSpacing: '0.15em', color: '#9B8A6A' }}>
                      {zh ? featured.readTimeZH : featured.readTime}
                    </span>
                  </div>

                  <h2 style={{ ...cinzel, fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 400, color: '#1A0E05', lineHeight: 1.2, marginBottom: '20px', maxWidth: '580px' }}>
                    {zh ? featured.titleZH : featured.title}
                  </h2>

                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#5C4A32', lineHeight: 1.8, maxWidth: '520px', fontWeight: 400, marginBottom: '24px' }}>
                    {zh ? featured.excerptZH : featured.excerpt}
                  </p>

                  <span style={{ ...mono, fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B7A2A', borderBottom: '1px solid #9B7A2A55', paddingBottom: '2px', alignSelf: 'flex-start' }}>
                    {zh ? '閱讀全文 →' : 'Read Article →'}
                  </span>
                </div>

                {/* Cover image thumbnail — only if coverImage exists */}
                {featured.coverImage && (
                  <div style={{ flex: '0 0 36%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '32px 0 32px 24px' }}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '320px', height: '210px', overflow: 'hidden', borderRadius: '3px' }}>
                      {/* Left + right edge fades */}
                      <div style={{
                        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                        background: 'linear-gradient(to right, rgba(250,245,236,0.7) 0%, transparent 28%, transparent 72%, rgba(250,245,236,0.7) 100%)',
                      }} />
                      {/* Top + bottom fades — bottom is strong to cover watermark */}
                      <div style={{
                        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                        background: 'linear-gradient(to bottom, rgba(250,245,236,0.5) 0%, transparent 22%, transparent 52%, #FAF5EC 100%)',
                      }} />
                      <img
                        src={featured.coverImage}
                        alt={featured.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 28%',
                          mixBlendMode: 'multiply',
                          filter: 'sepia(0.15) contrast(0.92) brightness(1.04)',
                          display: 'block',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        )}

        {/* ── REMAINING POSTS — typeset rows ── */}
        {rest.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.07 }}
          >
            <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: post.coverImage ? '52px 160px 1fr 112px' : '52px 160px 1fr',
                  gap: '0 32px',
                  alignItems: 'center',
                  padding: '28px 0',
                  borderBottom: '1px solid #D4C5A655',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(155,122,42,0.025)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Number */}
                <span style={{ ...cinzel, fontSize: '1.4rem', color: '#9B7A2A', opacity: 0.85, paddingTop: '4px', userSelect: 'none', fontWeight: 700, alignSelf: 'start' }}>
                  {String(i + 2).padStart(2, '0')}
                </span>

                {/* Category + Date */}
                <div style={{ paddingTop: '4px', alignSelf: 'start' }}>
                  <p style={{ ...mono, fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B7A2A', marginBottom: '6px' }}>
                    {zh ? post.categoryZH : post.category}
                  </p>
                  <p style={{ ...mono, fontSize: '11px', letterSpacing: '0.1em', color: '#9B8A6A', lineHeight: 1.7 }}>
                    {formatDate(post.date, language)}<br />
                    {zh ? post.readTimeZH : post.readTime}
                  </p>
                </div>

                {/* Title + excerpt */}
                <div style={{ alignSelf: 'start' }}>
                  <h3 style={{ ...cinzel, fontSize: 'clamp(1.1rem, 1.8vw, 1.55rem)', fontWeight: 400, color: '#1A0E05', lineHeight: 1.3, marginBottom: '10px' }}>
                    {zh ? post.titleZH : post.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#5C4A32', lineHeight: 1.8, fontWeight: 400, maxWidth: '580px' }}>
                    {zh ? post.excerptZH : post.excerpt}
                  </p>
                </div>

                {/* Square thumbnail */}
                {post.coverImage && (
                  <div style={{ position: 'relative', width: '92px', height: '92px', overflow: 'hidden', borderRadius: '2px', flexShrink: 0 }}>
                    <div style={{
                      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                      background: 'linear-gradient(135deg, rgba(250,245,236,0.45) 0%, transparent 40%, transparent 60%, rgba(250,245,236,0.45) 100%)',
                    }} />
                    <div style={{
                      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                      background: 'linear-gradient(to bottom, rgba(250,245,236,0.35) 0%, transparent 30%, transparent 70%, rgba(250,245,236,0.55) 100%)',
                    }} />
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: post.thumbPosition || 'center 30%',
                        mixBlendMode: 'multiply',
                        filter: 'sepia(0.18) contrast(0.9) brightness(1.05)',
                        display: 'block',
                        transition: 'transform 0.35s ease',
                      }}
                    />
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Footer footnote */}
        {filtered.length > 0 && (
          <p style={{ ...mono, fontSize: '12px', color: '#9B8A6A', opacity: 0.8, letterSpacing: '0.08em', padding: '36px 0 48px' }}>
            * {zh ? '所有文章由斯里印度宮廚房與團隊撰寫' : 'All articles written by the Sree India Palace kitchen and team'} ·
            台中市西區公益北街45號 · Taichung, Taiwan
          </p>
        )}

      </div>
    </motion.div>
  )
}
