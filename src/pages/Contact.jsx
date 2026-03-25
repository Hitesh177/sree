import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const mono = { fontFamily: "'Monograph', system-ui, sans-serif" }
const cinzel = { fontFamily: "'Cinzel', serif" }

const HOURS_GROUPED = [
  {
    daysEN: 'Mon – Thu',
    daysZH: '週一 — 週四',
    lunch: '11:30 – 15:00',
    dinner: '17:00 – 22:00',
  },
  {
    daysEN: 'Fri – Sat',
    daysZH: '週五 — 週六',
    lunch: '11:00 – 15:30',
    dinner: '17:00 – 22:30',
  },
  {
    daysEN: 'Sunday',
    daysZH: '週日',
    lunch: '11:00 – 15:30',
    dinner: '17:00 – 22:00',
  },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const HOURS = [
  { lunch: '11:30 – 15:00', dinner: '17:00 – 22:00' },
  { lunch: '11:30 – 15:00', dinner: '17:00 – 22:00' },
  { lunch: '11:30 – 15:00', dinner: '17:00 – 22:00' },
  { lunch: '11:30 – 15:00', dinner: '17:00 – 22:00' },
  { lunch: '11:30 – 15:00', dinner: '17:00 – 22:30' },
  { lunch: '11:00 – 15:30', dinner: '17:00 – 22:30' },
  { lunch: '11:00 – 15:30', dinner: '17:00 – 22:00' },
]

export default function Contact() {
  const { language } = useLanguage()
  const zh = language === 'zh'
  const todayIndex = (new Date().getDay() + 6) % 7

  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '', notes: '' })
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleWhatsApp = () => {
    const msg = zh
      ? `您好，斯里印度宮！我想預訂座位。\n\n姓名：${form.name || '(未填寫)'}\n電話：${form.phone || '(未填寫)'}\n日期與時間：${form.date || '(未填寫)'}\n人數：${form.guests || '(未填寫)'}${form.notes ? '\n備註：' + form.notes : ''}`
      : `Hello Sree India Palace! I'd like to make a reservation.\n\nName: ${form.name || '(not provided)'}\nPhone: ${form.phone || '(not provided)'}\nDate & Time: ${form.date || '(not provided)'}\nGuests: ${form.guests || '(not provided)'}${form.notes ? '\nNotes: ' + form.notes : ''}`
    window.open(`https://wa.me/886910309268?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: '#FAF5EC', minHeight: '100vh', paddingTop: '72px' }}
    >

      {/* ── NEWSPAPER MASTHEAD ── */}
      <div style={{ borderBottom: '2px solid #1A0E05', padding: '28px 40px 18px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px' }}>
          <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.42em', color: '#9B7A2A', textTransform: 'uppercase' }}>
            Sree India Palace · {zh ? '台中西區 · 聯絡 & 預訂' : 'West District, Taichung · Contact & Reserve'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.2em', color: '#9B8A6A', opacity: 0.55 }}>
              24.1477° N, 120.6736° E
            </p>
            <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.2em', color: '#9B8A6A', opacity: 0.4 }}>
              Est. 2012
            </p>
          </div>
        </div>
      </div>

      {/* ── MAIN SPLIT ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* ── LEFT COLUMN — typeset info ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ padding: '56px 48px 64px', borderRight: '1px solid #D4C5A655' }}
        >
          {/* Section eyebrow */}
          <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#9B7A2A', marginBottom: '20px' }}>
            {zh ? '位置 · 時間' : 'Location · Hours'}
          </p>

          {/* Headline */}
          <h1 style={{ ...cinzel, fontSize: 'clamp(2rem, 3.5vw, 4rem)', fontWeight: 300, color: '#1A0E05', lineHeight: 1.1, marginBottom: '32px' }}>
            {zh ? <>找到我們<br /><em>在台中</em></> : <>Find Us<br /><em>in Taichung</em></>}
          </h1>

          {/* Cross-rule */}
          <div className="cross-rule" style={{ color: '#9B7A2A', marginBottom: '32px' }}>
            <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em' }}>×</span>
          </div>

          {/* Address block */}
          <div style={{ marginBottom: '36px' }}>
            <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', marginBottom: '12px' }}>
              {zh ? '地址' : 'Address'}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#1A0E05', lineHeight: 1.75 }}>
              No. 45, Gongyi N St<br />
              West District, Taichung City, 403<br />
              Taiwan (R.O.C.)
            </p>
            {zh && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#9B8A6A', marginTop: '6px' }}>
                台中市西區公益北街45號
              </p>
            )}
          </div>

          {/* Phone & Email */}
          <div style={{ marginBottom: '40px', display: 'flex', gap: '32px' }}>
            <div>
              <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', marginBottom: '6px' }}>
                {zh ? '電話' : 'Phone'}
              </p>
              <a href="tel:+886910309268" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#1A0E05', textDecoration: 'none' }}>
                +886 910 309 268
              </a>
            </div>
            <div>
              <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', marginBottom: '6px' }}>
                Email
              </p>
              <a href="mailto:info@sreeindiapalace.com" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#1A0E05', textDecoration: 'none' }}>
                info@sreeindiapalace.com
              </a>
            </div>
          </div>

          {/* Cross-rule */}
          <div className="cross-rule" style={{ color: '#9B7A2A', marginBottom: '32px' }}>
            <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em' }}>×</span>
          </div>

          {/* Hours — typeset editorial */}
          <div>
            <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', marginBottom: '20px' }}>
              {zh ? '營業時間' : 'Opening Hours'}
            </p>
            {HOURS_GROUPED.map((group, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <p style={{ ...cinzel, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A0E05', marginBottom: '6px', fontWeight: 500 }}>
                  {zh ? group.daysZH : group.daysEN}
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div>
                    <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: '#9B8A6A', opacity: 0.65, marginBottom: '2px' }}>
                      {zh ? '午餐' : 'Lunch'}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#5C4A32' }}>
                      {group.lunch}
                    </p>
                  </div>
                  <div>
                    <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: '#9B8A6A', opacity: 0.65, marginBottom: '2px' }}>
                      {zh ? '晚餐' : 'Dinner'}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#5C4A32' }}>
                      {group.dinner}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <p style={{ ...mono, fontSize: '8px', color: '#9B8A6A', opacity: 0.5, letterSpacing: '0.1em', marginTop: '32px', lineHeight: 1.8 }}>
            * {zh ? '建議週末提前預訂' : 'Reservations recommended on weekends'}<br />
            * {zh ? '外帶請提前30分鐘致電' : 'Takeaway orders: call 30 min ahead'}
          </p>
        </motion.div>

        {/* ── RIGHT COLUMN — bare form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ padding: '56px 48px 64px' }}
        >
          {/* Section eyebrow */}
          <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#9B7A2A', marginBottom: '20px' }}>
            {zh ? '預訂座位' : 'Make a Reservation'}
          </p>

          {/* Heading */}
          <h2 style={{ ...cinzel, fontSize: 'clamp(1.8rem, 2.8vw, 3.2rem)', fontWeight: 300, color: '#1A0E05', lineHeight: 1.15, marginBottom: '32px' }}>
            {zh ? <>今晚預訂<br /><em>您的餐桌</em></> : <>Reserve Your<br /><em>Table Tonight</em></>}
          </h2>

          {/* Cross-rule */}
          <div className="cross-rule" style={{ color: '#9B7A2A', marginBottom: '36px' }}>
            <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em' }}>×</span>
          </div>

          {/* Bare form */}
          <form action="" onSubmit={(e) => { e.preventDefault(); handleWhatsApp(); }} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            <div>
              <label style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', display: 'block', marginBottom: '8px' }}>
                {zh ? '姓名' : 'Full Name'}
              </label>
              <input
                className="bare-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={zh ? '您的姓名' : 'Your name'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', display: 'block', marginBottom: '8px' }}>
                  {zh ? '電話' : 'Phone'}
                </label>
                <input
                  className="bare-input"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={zh ? '聯絡電話' : '+886 ...'}
                />
              </div>
              <div>
                <label style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', display: 'block', marginBottom: '8px' }}>
                  {zh ? '人數' : 'Guests'}
                </label>
                <input
                  className="bare-input"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  placeholder={zh ? '幾位' : '2 guests'}
                />
              </div>
            </div>

            <div>
              <label style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', display: 'block', marginBottom: '8px' }}>
                {zh ? '日期與時間' : 'Date & Time'}
              </label>
              <input
                className="bare-input"
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder={zh ? '例如：週六 19:00' : 'e.g. Saturday 7:00 PM'}
              />
            </div>

            <div>
              <label style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', display: 'block', marginBottom: '8px' }}>
                {zh ? '特別要求' : 'Special Requests'}
              </label>
              <textarea
                className="bare-input"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder={zh ? '飲食限制、過敏、特殊場合…' : 'Dietary needs, allergies, occasions…'}
                style={{ resize: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                type="submit"
                style={{
                  ...mono,
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#1A0E05',
                  background: '#25D366',
                  border: 'none',
                  padding: '16px 32px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <svg style={{ width: '14px', height: '14px', flexShrink: 0 }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {zh ? '用WhatsApp預訂' : 'Book via WhatsApp'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="cross-rule" style={{ color: '#9B7A2A', margin: '40px 0 28px' }}>
            <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', color: '#9B8A6A', opacity: 0.6 }}>
              {zh ? '或直接聯繫' : 'or contact directly'}
            </span>
          </div>

          {/* Quick contact — editorial style */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a
              href="tel:+886910309268"
              style={{
                ...mono,
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#1A0E05',
                border: '1px solid #1A0E0530',
                padding: '12px 20px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg style={{ width: '13px', height: '13px', flexShrink: 0 }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.12.35.03.74-.24 1.02l-2.2 2.2z"/>
              </svg>
              {zh ? '致電' : 'Call'}
            </a>
            <a
              href="https://wa.me/886910309268"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...mono,
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#9B7A2A',
                border: '1px solid #9B7A2A44',
                padding: '12px 20px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg style={{ width: '13px', height: '13px', flexShrink: 0 }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="https://www.opentable.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...mono,
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#9B7A2A',
                border: '1px solid #9B7A2A44',
                padding: '12px 20px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              OpenTable
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── MAP — full width ── */}
      <div style={{ borderTop: '1px solid #D4C5A655', position: 'relative', height: '300px', overflow: 'hidden' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.1234567890123!2d120.67123456789012!3d24.14765432109876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346916a1a7a7a7a7%3A0x7a7a7a7a7a7a7a7a!2sNo.%2045%2C%20Gongyi%20N%20St%2C%20West%20District%2C%20Taichung%20City!5e0!3m2!1sen!2stw!4v1234567890123"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, filter: 'grayscale(1) contrast(1.15) opacity(0.75)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Sree India Palace Location"
        />
        {/* Map overlay label */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: '#FAF5EC',
            padding: '10px 16px',
            pointerEvents: 'none',
          }}
        >
          <p style={{ ...cinzel, fontSize: '11px', letterSpacing: '0.2em', color: '#1A0E05', fontWeight: 500 }}>
            Sree India Palace
          </p>
          <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: '#9B8A6A', marginTop: '3px' }}>
            No. 45, Gongyi N St · Taichung
          </p>
        </div>
      </div>

      {/* ── AMENITIES & INFO — full width ── */}
      <div style={{ borderTop: '2px solid #1A0E05', background: '#FAF5EC' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 40px 64px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #D4C5A655' }}>
            <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.42em', color: '#9B7A2A', textTransform: 'uppercase' }}>
              {zh ? '設施 · 資訊' : 'Amenities · Info'}
            </p>
            <h2 style={{ ...cinzel, fontSize: 'clamp(1.4rem, 2.5vw, 2.5rem)', fontWeight: 300, color: '#1A0E05', lineHeight: 1 }}>
              {zh ? <>餐廳<em>設施與特色</em></> : <>Restaurant<em> Features & Facilities</em></>}
            </h2>
          </div>

          {/* Grid of amenity groups */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '36px' }}>

            {[
              {
                icon: 'https://img.icons8.com/fluency/20/wheelchair.png',
                labelEN: 'Accessibility',
                labelZH: '無障礙設施',
                items: [
                  { en: 'Wheelchair-accessible entrance', zh: '輪椅無障礙入口' },
                  { en: 'Wheelchair-accessible seating', zh: '輪椅無障礙座位' },
                  { en: 'Wheelchair-accessible toilet', zh: '輪椅無障礙廁所' },
                  { en: 'Wheelchair-accessible car park', zh: '輪椅無障礙停車場' },
                  { en: 'Assistive hearing loop', zh: '助聽感應線圈' },
                ],
              },
              {
                icon: 'https://img.icons8.com/fluency/20/restaurant.png',
                labelEN: 'Service Options',
                labelZH: '服務方式',
                items: [
                  { en: 'Dine-in', zh: '內用' },
                  { en: 'Takeaway', zh: '外帶' },
                  { en: 'Delivery', zh: '外送' },
                  { en: 'Counter service', zh: '櫃台服務' },
                  { en: 'Table service', zh: '桌邊服務' },
                  { en: 'Catering', zh: '外燴服務' },
                ],
              },
              {
                icon: 'https://img.icons8.com/fluency/20/salad.png',
                labelEN: 'Offerings',
                labelZH: '特色供應',
                items: [
                  { en: 'Vegetarian options', zh: '素食選項' },
                  { en: 'Vegan options', zh: '全素選項' },
                  { en: 'Small plates', zh: '小份料理' },
                  { en: 'Alcohol & Beer', zh: '酒類飲品' },
                  { en: 'Great dessert', zh: '精選甜品' },
                  { en: 'Great tea selection', zh: '優質茶飲' },
                ],
              },
              {
                icon: 'https://img.icons8.com/fluency/20/stars.png',
                labelEN: 'Atmosphere',
                labelZH: '用餐氛圍',
                items: [
                  { en: 'Casual', zh: '輕鬆休閒' },
                  { en: 'Cosy', zh: '溫馨舒適' },
                  { en: 'Quiet', zh: '安靜環境' },
                  { en: 'Trendy', zh: '時尚前衛' },
                ],
              },
              {
                icon: 'https://img.icons8.com/fluency/20/conference.png',
                labelEN: 'Crowd',
                labelZH: '適合族群',
                items: [
                  { en: 'Family friendly', zh: '親子友善' },
                  { en: 'Groups', zh: '團體聚餐' },
                  { en: 'LGBTQ+ friendly', zh: 'LGBTQ+ 友善' },
                  { en: 'Tourists', zh: '觀光旅客' },
                  { en: 'Solo dining', zh: '單人用餐' },
                  { en: 'Transgender safe space', zh: '跨性別友善空間' },
                ],
              },
              {
                icon: 'https://img.icons8.com/fluency/20/home.png',
                labelEN: 'Amenities',
                labelZH: '基本設施',
                items: [
                  { en: 'Wi-Fi', zh: '免費 Wi-Fi' },
                  { en: 'Toilet', zh: '洗手間' },
                  { en: 'High chairs', zh: '兒童高腳椅' },
                  { en: 'Seating', zh: '充足座位' },
                  { en: 'Paid parking lot', zh: '付費停車場' },
                ],
              },
              {
                icon: 'https://img.icons8.com/fluency/20/bank-card-front-side.png',
                labelEN: 'Payments & Planning',
                labelZH: '付款與訂位',
                items: [
                  { en: 'Credit cards accepted', zh: '接受信用卡' },
                  { en: 'Debit cards accepted', zh: '接受簽帳卡' },
                  { en: 'Accepts reservations', zh: '接受訂位' },
                  { en: 'Reservations recommended', zh: '建議提前訂位' },
                  { en: 'Lunch & dinner reservations', zh: '午晚餐皆可訂位' },
                ],
              },
              {
                icon: 'https://img.icons8.com/fluency/20/dog.png',
                labelEN: 'Pets',
                labelZH: '寵物政策',
                items: [
                  { en: 'Dogs allowed', zh: '允許攜犬' },
                  { en: 'Dogs allowed inside', zh: '室內可攜犬' },
                ],
              },
            ].map((group) => (
              <div key={group.labelEN}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <img src={group.icon} width="18" height="18" alt="" style={{ flexShrink: 0, display: 'block' }} />
                  <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B7A2A' }}>
                    {zh ? group.labelZH : group.labelEN}
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {group.items.map((item) => (
                    <span
                      key={item.en}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '11px',
                        color: '#5C4A32',
                        background: '#EDE4D3',
                        border: '1px solid #D4C5A6',
                        borderRadius: '2px',
                        padding: '4px 10px',
                        letterSpacing: '0.02em',
                        lineHeight: 1.4,
                      }}
                    >
                      {zh ? item.zh : item.en}
                    </span>
                  ))}
                </div>
              </div>
            ))}

          </div>

          {/* Footer note */}
          <p style={{ ...mono, fontSize: '8px', color: '#9B8A6A', opacity: 0.5, letterSpacing: '0.15em', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #D4C5A640' }}>
            * {zh ? '以上資訊來源自 Google Maps 商家頁面，如有疑問請致電確認。' : 'Information sourced from Google Maps business listing. Call to confirm details.'}
          </p>
        </div>
      </div>

    </motion.div>
  )
}
