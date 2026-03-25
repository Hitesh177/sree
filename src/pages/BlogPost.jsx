import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { blogPosts } from '../data/blog'

const mono = { fontFamily: "'Monograph', system-ui, sans-serif" }
const cinzel = { fontFamily: "'Cinzel', serif" }

function formatDate(dateStr, lang) {
  return new Date(dateStr).toLocaleDateString(
    lang === 'zh' ? 'zh-TW' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}

// Minimal markdown parser — keeps the editorial feel
function renderContent(rawContent) {
  return rawContent.trim().split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} style={{
          ...cinzel,
          fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
          fontWeight: 400,
          color: '#1A0E05',
          marginTop: '52px',
          marginBottom: '16px',
          lineHeight: 1.3,
        }}>
          {block.replace('## ', '')}
        </h2>
      )
    }

    if (block.startsWith('- ')) {
      const items = block.split('\n').filter(l => l.startsWith('- '))
      return (
        <ul key={i} style={{ margin: '20px 0', paddingLeft: 0, listStyle: 'none' }}>
          {items.map((item, j) => {
            const text = item.replace('- ', '')
            const parts = text.split('**')
            return (
              <li key={j} style={{ display: 'flex', gap: '12px', marginBottom: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#3A2D1E', lineHeight: 1.8, fontWeight: 300 }}>
                <span style={{ color: '#9B7A2A', flexShrink: 0, marginTop: '2px', fontSize: '10px' }}>◆</span>
                <span>
                  {parts.map((part, k) =>
                    k % 2 === 1
                      ? <strong key={k} style={{ color: '#1A0E05', fontWeight: 500 }}>{part}</strong>
                      : part
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )
    }

    if (block.startsWith('1. ') || /^\d+\./.test(block)) {
      const items = block.split('\n').filter(l => /^\d+\./.test(l))
      return (
        <ol key={i} style={{ margin: '20px 0', paddingLeft: 0, listStyle: 'none', counterReset: 'item' }}>
          {items.map((item, j) => (
            <li key={j} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <span style={{ ...cinzel, fontSize: '12px', color: '#9B7A2A', fontWeight: 500, flexShrink: 0, marginTop: '4px', minWidth: '18px' }}>
                {j + 1}.
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#3A2D1E', lineHeight: 1.8, fontWeight: 300 }}>
                {item.replace(/^\d+\.\s/, '')}
              </span>
            </li>
          ))}
        </ol>
      )
    }

    // Paragraph with bold support
    const parts = block.split('**')
    return (
      <p key={i} style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '15px',
        color: '#3A2D1E',
        lineHeight: 1.9,
        fontWeight: 300,
        margin: '0 0 20px',
      }}>
        {parts.map((part, j) =>
          j % 2 === 1
            ? <strong key={j} style={{ color: '#1A0E05', fontWeight: 500 }}>{part}</strong>
            : part
        )}
      </p>
    )
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const { language, toggleLanguage } = useLanguage()
  const zh = language === 'zh'
  const post = blogPosts.find(p => p.slug === slug)
  const [coverHovered, setCoverHovered] = useState(false)

  // Inject JSON-LD structured data for SEO
  useEffect(() => {
    if (!post) return
    const existing = document.getElementById('blog-jsonld')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = 'blog-jsonld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      publisher: {
        '@type': 'Restaurant',
        name: 'Sree India Palace',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'No. 45, Gongyi N St',
          addressLocality: 'West District, Taichung City',
          postalCode: '403',
          addressCountry: 'TW',
        },
      },
      datePublished: post.date,
      dateModified: post.date,
      keywords: post.tags.join(', '),
      inLanguage: 'en',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://sreeindiapalace.com/blog/${post.slug}`,
      },
    })
    document.head.appendChild(script)

    // Update document title and meta for SEO
    document.title = `${post.title} — Sree India Palace | Taichung Indian Food`
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', post.excerpt)

    return () => {
      const s = document.getElementById('blog-jsonld')
      if (s) s.remove()
      document.title = 'Sree India Palace — Authentic Indian Cuisine | Taichung, Taiwan'
    }
  }, [post, slug])

  if (!post) return <Navigate to="/blog" replace />

  const title = zh ? post.titleZH : post.title
  const content = zh ? post.contentZH : post.content
  const excerpt = zh ? post.excerptZH : post.excerpt

  const related = blogPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2)
  const moreStories = related.length >= 2 ? related : blogPosts.filter(p => p.slug !== slug).slice(0, 2)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: '#FAF5EC', paddingTop: '72px' }}
    >

      {/* ── MASTHEAD ── */}
      <div style={{ borderBottom: '1px solid #D4C5A655', padding: '22px 40px 16px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            to="/blog"
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', textDecoration: 'none', opacity: 0.7 }}
          >
            {zh ? '← 文章列表' : '← Journal'}
          </Link>
          <span style={{ color: '#D4C5A6', fontSize: '10px' }}>·</span>
          <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B7A2A', opacity: 0.8 }}>
            {zh ? post.categoryZH : post.category}
          </span>
        </div>
      </div>

      {/* ── ARTICLE HEADER ── */}
      <header style={{ padding: '60px 40px 48px', borderBottom: '1px solid #D4C5A655', background: '#FAF5EC' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#9B7A2A', marginBottom: '20px' }}>
            {zh ? post.categoryZH : post.category} · {formatDate(post.date, language)}
          </p>

          <h1 style={{ ...cinzel, fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 400, color: '#1A0E05', lineHeight: 1.15, marginBottom: '32px', maxWidth: '760px' }}>
            {title}
          </h1>

          <div className="cross-rule" style={{ color: '#9B7A2A', maxWidth: '240px', marginBottom: '28px' }}>
            <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em' }}>×</span>
          </div>

          {/* Lead/excerpt */}
          <p className="quote-left" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: '#3A2D1E', lineHeight: 1.85, fontStyle: 'italic', fontWeight: 300, maxWidth: '640px', borderLeftColor: '#9B7A2A55' }}>
            {excerpt}
          </p>

          {/* Byline */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.2em', color: '#5C4A32' }}>
                {post.author}
              </p>
              <span style={{ color: '#D4C5A6', fontSize: '10px' }}>·</span>
              <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.2em', color: '#9B8A6A', opacity: 0.7 }}>
                {zh ? post.readTimeZH : post.readTime}
              </p>
            </div>
            <button
              onClick={toggleLanguage}
              style={{ ...mono, fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B8A6A', background: 'none', border: '1px solid #D4C5A655', padding: '8px 16px', cursor: 'pointer' }}
            >
              {zh ? 'English Version' : '中文版本'}
            </button>
          </div>
        </div>
      </header>

      {/* ── COVER IMAGE ── */}
      {post.coverImage && (
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ position: 'relative', width: '100%', height: 'clamp(320px, 55vh, 620px)', overflow: 'hidden', cursor: 'zoom-in' }}
          onMouseEnter={() => setCoverHovered(true)}
          onMouseLeave={() => setCoverHovered(false)}
        >
          {/* Top/bottom fade — dissolves less on hover to reveal more image */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            transition: 'opacity 0.5s ease',
            opacity: coverHovered ? 0.35 : 1,
            background: 'linear-gradient(to bottom, #FAF5EC 0%, rgba(250,245,236,0.35) 18%, transparent 45%, transparent 70%, rgba(250,245,236,0.55) 88%, #FAF5EC 100%)',
          }} />
          {/* Left/right edge fades */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            transition: 'opacity 0.5s ease',
            opacity: coverHovered ? 0.3 : 1,
            background: 'linear-gradient(to right, #FAF5EC 0%, rgba(250,245,236,0.3) 8%, transparent 22%, transparent 78%, rgba(250,245,236,0.3) 92%, #FAF5EC 100%)',
          }} />
          <img
            src={post.coverImage}
            alt={post.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              mixBlendMode: 'multiply',
              filter: coverHovered
                ? 'sepia(0.05) contrast(0.95) brightness(1.1)'
                : 'sepia(0.12) contrast(0.9) brightness(1.06)',
              display: 'block',
              transform: coverHovered ? 'scale(1.045)' : 'scale(1)',
              transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease',
              transformOrigin: 'center center',
            }}
          />
        </motion.div>
      )}

      {/* ── ARTICLE BODY ── */}
      <article style={{ maxWidth: '860px', margin: '0 auto', padding: '52px 40px 80px' }}>
        <div style={{ maxWidth: '680px' }}>
          {renderContent(content)}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '52px', paddingTop: '28px', borderTop: '1px solid #D4C5A655' }}>
          {post.tags.map(tag => (
            <span
              key={tag}
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', textTransform: 'lowercase', color: '#9B8A6A', border: '1px solid #D4C5A655', padding: '5px 10px', opacity: 0.8 }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #D4C5A655' }}>
          <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', opacity: 0.7 }}>
            {zh ? '分享' : 'Share'}
          </span>
          {[
            {
              label: 'Facebook',
              href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`,
            },
            {
              label: 'LINE',
              href: `https://line.me/R/msg/text/?${encodeURIComponent(title + '\n' + (typeof window !== 'undefined' ? window.location.href : ''))}`,
            },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...mono, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8A6A', textDecoration: 'none', border: '1px solid #D4C5A655', padding: '8px 14px', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#9B7A2A'; e.currentTarget.style.borderColor = '#9B7A2A55' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#9B8A6A'; e.currentTarget.style.borderColor = '#D4C5A655' }}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* ── MORE STORIES ── */}
        <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '2px solid #1A0E05' }}>
          <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#9B7A2A', marginBottom: '32px' }}>
            {zh ? '更多故事' : 'More from the Journal'}
          </p>

          {moreStories.map((p, i) => (
            <Link
              key={p.id}
              to={`/blog/${p.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '0 28px',
                  padding: '24px 0',
                  borderBottom: i < moreStories.length - 1 ? '1px solid #D4C5A655' : 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div>
                  <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9B7A2A', marginBottom: '4px' }}>
                    {zh ? p.categoryZH : p.category}
                  </p>
                  <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.15em', color: '#9B8A6A', opacity: 0.65 }}>
                    {zh ? p.readTimeZH : p.readTime}
                  </p>
                </div>
                <h4 style={{ ...cinzel, fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', fontWeight: 400, color: '#1A0E05', lineHeight: 1.35 }}>
                  {zh ? p.titleZH : p.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>

        {/* Back link */}
        <div style={{ marginTop: '40px' }}>
          <Link
            to="/blog"
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', textDecoration: 'none', borderBottom: '1px solid #D4C5A655', paddingBottom: '2px' }}
          >
            {zh ? '← 返回文章列表' : '← Back to Journal'}
          </Link>
        </div>
      </article>

    </motion.div>
  )
}
