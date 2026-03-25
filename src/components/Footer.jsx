import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { BOOKING_URL, UBEREATS_PICKUP_URL, UBEREATS_DELIVERY_URL } from '../constants'

export default function Footer() {
  const { language } = useLanguage()
  const zh = language === 'zh'
  const year = new Date().getFullYear()

  // Warm dark espresso — noticeably lighter than the near-black #0A0805
  const BG   = '#1C1008'
  const TEXT  = '#D4C8B4'   // warm cream, full opacity — easy to read
  const MUTED = '#8C7D6A'   // subdued warm brown for secondary info
  const GOLD  = '#C4A04A'
  const BORDER = '#FFFFFF14'

  return (
    <footer style={{ background: BG, color: TEXT, position: 'relative', overflow: 'hidden' }}>
      {/* Background illustration — Radha Krishna, low opacity */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/footer-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      />
      {/* Dark overlay to keep text readable */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(28,16,8,0.38) 0%, rgba(28,16,8,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16" style={{ position: 'relative' }}>

        {/* Top: Brand + tagline */}
        <div className="mb-16 pb-16" style={{ borderBottom: `1px solid ${BORDER}` }}>

          <Link to="/" className="inline-block mb-6">
            <img
              src="/logo.png"
              alt="Sree India Palace"
              style={{ height: 'clamp(64px, 8vw, 96px)', width: 'auto' }}
            />
          </Link>

          <p className="font-sans text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: MUTED }}>
            {zh ? '台中 · 台灣' : 'Taichung · Taiwan'}
          </p>
          <h2
            className="font-heading font-light leading-none mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: TEXT }}
          >
            {zh ? '斯里印度宮' : 'Sree India Palace'}
          </h2>
          <p className="font-sans text-base max-w-md leading-relaxed" style={{ color: MUTED, fontWeight: 400 }}>
            {zh
              ? <>根植於海德拉巴的皇家廚房。<br />每道菜都是一份記憶，每頓飯都是一場慶典。</>
              : <>Rooted in the royal kitchens of Hyderabad.<br />Every dish a memory, every meal a celebration.</>
            }
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* NAP */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: GOLD }}>{zh ? '尋找我們' : 'Find Us'}</p>
            <div className="space-y-4 font-sans text-[15px] leading-relaxed" style={{ color: MUTED, fontWeight: 400 }}>
              <p>{zh ? <>公益北街45號<br />台中市西區<br />403，台灣</> : <>No. 45, Gongyi N St<br />West District, Taichung City<br />403, Taiwan</>}</p>
              <a href="tel:+886910309268" className="block transition-colors" style={{ color: TEXT }}
                 onMouseEnter={e => e.currentTarget.style.color = GOLD}
                 onMouseLeave={e => e.currentTarget.style.color = TEXT}>
                +886 910 309 268
              </a>
              <a href="mailto:info@sreeindiapalace.com" className="block transition-colors break-all" style={{ color: TEXT }}
                 onMouseEnter={e => e.currentTarget.style.color = GOLD}
                 onMouseLeave={e => e.currentTarget.style.color = TEXT}>
                info@sreeindiapalace.com
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: GOLD }}>{zh ? '營業時間' : 'Hours'}</p>
            <div className="space-y-2.5 font-sans text-[15px]" style={{ color: MUTED, fontWeight: 400 }}>
              <div className="flex justify-between gap-4">
                <span>{zh ? '週一 – 週四' : 'Mon – Thu'}</span>
                <span style={{ color: TEXT }}>11:30 – 22:00</span>
              </div>
              <div className="flex justify-between gap-4 pt-1">
                <span>{zh ? '週五 – 週六' : 'Fri – Sat'}</span>
                <span style={{ color: TEXT }}>11:00 – 22:30</span>
              </div>
              <div className="flex justify-between gap-4 pt-1">
                <span>{zh ? '週日' : 'Sunday'}</span>
                <span style={{ color: TEXT }}>11:00 – 22:00</span>
              </div>
              <p className="text-[13px] pt-3 italic font-sans" style={{ color: GOLD, opacity: 0.65 }}>
                {zh ? '建議週末提前預訂' : 'Reservations recommended for weekends'}
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: GOLD }}>{zh ? '導覽' : 'Navigate'}</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { to: '/menu',      label: 'Menu',      labelZH: '菜單' },
                { to: '/gallery',   label: 'Gallery',   labelZH: '相簿' },
                { to: '/our-story', label: 'Our Story', labelZH: '我們的故事' },
                { to: '/events',    label: 'Events',    labelZH: '活動' },
                { to: '/blog',      label: 'Blog',      labelZH: '部落格' },
                { to: '/contact',   label: 'Contact',   labelZH: '聯繫我們' },
              ].map(({ to, label, labelZH }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-sans text-[15px] transition-colors"
                  style={{ color: TEXT, fontWeight: 400 }}
                  onMouseEnter={e => e.currentTarget.style.color = GOLD}
                  onMouseLeave={e => e.currentTarget.style.color = TEXT}
                >
                  {zh ? labelZH : label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social + CTA */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: GOLD }}>{zh ? '聯繫' : 'Connect'}</p>
            <div className="flex gap-3 mb-8">
              {[
                { label: 'Facebook', href: 'https://www.facebook.com/SreeIndiaPalaceIndianRestaurant', path: 'M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z' },
                { label: 'Instagram', href: 'https://www.instagram.com/sreeindiapalace_taiwan', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'WhatsApp', href: 'https://wa.me/886910309268', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' },
              ].map(({ label, href, path }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                   className="w-9 h-9 flex items-center justify-center transition-colors"
                   style={{ border: `1px solid ${BORDER}`, color: MUTED }}
                   onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = GOLD + '80'; }}
                   onMouseLeave={e => { e.currentTarget.style.color = MUTED; e.currentTarget.style.borderColor = BORDER; }}>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d={path}/></svg>
                </a>
              ))}
            </div>

            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold text-[10px] px-6 py-3 block text-center">
              {zh ? '預訂餐位' : 'Reserve a Table'}
            </a>
            <div className="flex gap-2 mt-3">
              <a href={UBEREATS_DELIVERY_URL} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 font-sans text-[9px] tracking-[0.12em] uppercase py-2.5 transition-colors duration-200"
                style={{ background: '#06C167', color: '#000', borderRadius: 3, fontWeight: 600 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-3V6a4 4 0 00-8 0v1H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2zm-9-1a2 2 0 014 0v1h-4V6zm10 14H4V9h16v11z"/></svg>
                {zh ? '外送' : 'Delivery'}
              </a>
              <a href={UBEREATS_PICKUP_URL} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 font-sans text-[9px] tracking-[0.12em] uppercase py-2.5 transition-colors duration-200"
                style={{ background: '#2A1A08', color: '#06C167', border: '1px solid #06C16740', borderRadius: 3, fontWeight: 600 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                {zh ? '自取' : 'Pickup'}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3 font-sans text-[13px] tracking-wide"
             style={{ borderTop: `1px solid ${BORDER}`, color: MUTED, fontWeight: 400 }}>
          <p>{zh ? `© ${year} 斯里印度宮版權所有。` : `© ${year} Sree India Palace. All rights reserved.`}</p>
          <p>{zh ? <>公益北街45號，台中市西區 ·{' '}</> : <>No. 45, Gongyi N St, West District, Taichung ·{' '}</>}
            <a href="https://sreeindiapalace.com"
               style={{ color: MUTED }}
               onMouseEnter={e => e.currentTarget.style.color = GOLD}
               onMouseLeave={e => e.currentTarget.style.color = MUTED}>
              sreeindiapalace.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
