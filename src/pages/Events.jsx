import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const mono = { fontFamily: "'Monograph', system-ui, sans-serif" }
const cinzel = { fontFamily: "'Cinzel', serif" }

// Kolam dot grid — South Indian floor art, abstracted
const kolamGrid = {
  backgroundImage: 'radial-gradient(circle, rgba(155,122,42,0.15) 1.2px, transparent 1.2px)',
  backgroundSize: '26px 26px',
}

const offerings = [
  {
    num: 'I',
    titleEN: 'Private Celebrations',
    titleZH: '私人慶典',
    descEN: 'Birthdays, anniversaries, family milestones. The private dining room seats up to 30 guests. Custom menu, full table service, occasion cake coordination on request.',
    descZH: '生日、週年紀念、家庭聚會。私人包廂最多可容納30位賓客。訂製菜單、全程服務，可另行安排慶生蛋糕。',
  },
  {
    num: 'II',
    titleEN: 'Corporate Gatherings',
    titleZH: '企業聚會',
    descEN: 'Team lunches, client dinners, product launches, year-end parties. We work directly with your organiser on menu selection, dietary requirements, and timing.',
    descZH: '員工聚餐、客戶晚宴、產品發表、尾牙活動。我們直接與您的活動負責人協調菜單、飲食需求與時程安排。',
  },
  {
    num: 'III',
    titleEN: 'Catering & Off-site',
    titleZH: '外燴服務',
    descEN: 'Full catering for venues across Taichung. We bring the kitchen to you — staff, equipment, full royal menu. Minimum 20 guests for off-site service.',
    descZH: '承接台中各場地的外燴服務。我們帶著廚房來找您——服務人員、設備與完整皇家菜單。場外服務最少20人起。',
  },
]

const eventTypes = [
  'Birthday Party', 'Anniversary', 'Corporate Lunch / Dinner',
  'Wedding Reception', 'Private Gathering', 'Catering Order', 'Other',
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export default function Events() {
  const { language } = useLanguage()
  const zh = language === 'zh'

  const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: '', eventDate: '', guestCount: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = zh ? '請填寫姓名' : 'Name is required'
    if (!form.email.trim()) e.email = zh ? '請填寫電子郵件' : 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = zh ? '電子郵件格式不正確' : 'Invalid email'
    if (!form.phone.trim()) e.phone = zh ? '請填寫電話' : 'Phone is required'
    if (!form.eventType) e.eventType = zh ? '請選擇活動類型' : 'Select an event type'
    if (!form.eventDate) e.eventDate = zh ? '請選擇日期' : 'Select a date'
    if (!form.guestCount) e.guestCount = zh ? '請填寫人數' : 'Guest count required'
    else if (Number(form.guestCount) < 1 || Number(form.guestCount) > 500) e.guestCount = '1 – 500'
    return e
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    const msg = encodeURIComponent(zh
      ? `*活動詢問 — 斯里印度宮*\n\n姓名：${form.name}\nEmail：${form.email}\n電話：${form.phone}\n活動類型：${form.eventType}\n活動日期：${form.eventDate}\n賓客人數：${form.guestCount}${form.message ? '\n\n備注：' + form.message : ''}`
      : `*Event Enquiry — Sree India Palace*\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nEvent: ${form.eventType}\nDate: ${form.eventDate}\nGuests: ${form.guestCount}${form.message ? '\n\nNotes: ' + form.message : ''}`
    )
    window.open(`https://wa.me/886910309268?text=${msg}`, '_blank')
    setSubmitted(true)
  }

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
          <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.42em', color: '#9B7A2A', textTransform: 'uppercase' }}>
            Sree India Palace · {zh ? '私人活動與外燴' : 'Private Events & Catering'}
          </p>
          <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.2em', color: '#9B8A6A', opacity: 0.5 }}>
            Taichung · Est. 2012
          </p>
        </div>
      </div>

      {/* ── TYPESET HERO ── */}
      <section
        style={{
          ...kolamGrid,
          background: '#FAF5EC',
          padding: '80px 40px 88px',
          borderBottom: '1px solid #D4C5A655',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#9B7A2A', marginBottom: '24px', opacity: 0.8 }}>
              {zh ? '私人活動 · 外燴服務 · 包廂預訂' : 'Private Events · Catering · Exclusive Hire'}
            </p>

            <h1 style={{ ...cinzel, fontSize: 'clamp(2.8rem, 6vw, 7rem)', fontWeight: 300, color: '#1A0E05', lineHeight: 1.0, marginBottom: '36px' }}>
              {zh
                ? <>皇家餐桌<br /><em style={{ fontStyle: 'italic', color: '#9B7A2A' }}>屬於您</em></>
                : <>The Palace Table<br /><em style={{ fontStyle: 'italic', color: '#9B7A2A' }}>is Yours</em></>}
            </h1>

            {/* Cross-rule */}
            <div className="cross-rule" style={{ color: '#9B7A2A', maxWidth: '360px', marginBottom: '28px' }}>
              <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em' }}>×</span>
            </div>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#5C4A32', lineHeight: 1.8, maxWidth: '520px', fontWeight: 300 }}>
              {zh
                ? '從私人慶典到企業聚會，斯里印度宮將正宗印度料理的皇家廚藝帶到您的每一個重要時刻。'
                : 'From intimate celebrations to corporate gatherings — our kitchen, our craft, and our hospitality are entirely at your disposal.'}
            </p>
          </motion.div>
        </div>
      </section>


      {/* ── OFFERINGS — typeset list, no boxes ── */}
      <section style={{ background: '#FAF5EC', borderBottom: '1px solid #D4C5A655' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {offerings.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.7, delay: i * 0.1 } } }}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '0 48px',
                padding: '52px 40px',
                borderBottom: i < offerings.length - 1 ? '1px solid #D4C5A655' : 'none',
              }}
            >
              {/* Left — Roman numeral */}
              <div style={{ paddingTop: '6px' }}>
                <span style={{
                  ...cinzel,
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  color: '#9B7A2A',
                  opacity: 0.85,
                  lineHeight: 1,
                  display: 'block',
                  userSelect: 'none',
                }}>
                  {item.num}
                </span>
                <p style={{ ...mono, fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B7A2A', marginTop: '8px' }}>
                  {item.num === 'I' ? (zh ? '慶典' : 'Celebration') : item.num === 'II' ? (zh ? '企業' : 'Corporate') : (zh ? '外燴' : 'Catering')}
                </p>
              </div>

              {/* Right — text */}
              <div>
                <h2 style={{ ...cinzel, fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 400, color: '#1A0E05', marginBottom: '16px', letterSpacing: '0.02em' }}>
                  {zh ? item.titleZH : item.titleEN}
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#5C4A32', lineHeight: 1.85, fontWeight: 300, maxWidth: '580px' }}>
                  {zh ? item.descZH : item.descEN}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ── PULL QUOTE ── */}
      <section style={{ position: 'relative', background: '#1A0E05', padding: '72px 40px', overflow: 'hidden' }}>
        {/* Lotus strip — tiled, blends as warm texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/ubereats-banner-lotus.png)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 60%',
            backgroundPosition: 'bottom center',
            opacity: 0.13,
            pointerEvents: 'none',
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          <p className="quote-left" style={{ ...cinzel, fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 300, fontStyle: 'italic', color: '#F0E6CC', lineHeight: 1.6, borderLeftColor: '#C4A04A55' }}>
            {zh
              ? '"每一道我們帶到餐廳外的菜，都承載著相同的食譜，相同的用心。"'
              : '"Every meal we serve outside these walls carries the same recipes, the same care, the same silence before the dough is sealed."'}
          </p>
          <p style={{ ...mono, fontSize: '11px', letterSpacing: '0.28em', color: '#C4A04A', opacity: 0.7, marginTop: '24px', paddingLeft: '1.25rem' }}>
            — {zh ? '斯里印度宮廚房' : 'Sree India Palace Kitchen · Hyderabad, 1986'}
          </p>
        </motion.div>
      </section>


      {/* ── EVENT INQUIRY FORM ── */}
      <section style={{ background: '#FAF5EC', padding: '80px 40px 100px', ...kolamGrid }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Form heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            style={{ marginBottom: '52px' }}
          >
            <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#9B7A2A', marginBottom: '20px' }}>
              {zh ? '活動詢問' : 'Event Enquiry'}
            </p>
            <h2 style={{ ...cinzel, fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', fontWeight: 300, color: '#1A0E05', lineHeight: 1.2, marginBottom: '16px' }}>
              {zh ? <>告訴我們<br /><em style={{ color: '#9B7A2A' }}>您的活動</em></> : <>Tell Us About<br /><em style={{ color: '#9B7A2A' }}>Your Occasion</em></>}
            </h2>
            <div className="cross-rule" style={{ color: '#9B7A2A', maxWidth: '280px' }}>
              <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em' }}>×</span>
            </div>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ padding: '56px 0', borderTop: '1px solid #D4C5A655', borderBottom: '1px solid #D4C5A655' }}
            >
              <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#9B7A2A', marginBottom: '20px' }}>
                {zh ? '已收到詢問' : 'Enquiry Received'}
              </p>
              <h3 style={{ ...cinzel, fontSize: 'clamp(1.6rem, 2.5vw, 2.8rem)', fontWeight: 300, color: '#1A0E05', marginBottom: '16px' }}>
                {zh ? '我們很快與您聯繫' : 'We\'ll Be in Touch'}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#5C4A32', lineHeight: 1.8, maxWidth: '440px', marginBottom: '36px' }}>
                {zh
                  ? '您的詢問已透過WhatsApp發送至我們的團隊。我們將在24小時內回覆。'
                  : 'Your enquiry has been sent to our team via WhatsApp. We will respond within 24 hours.'}
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',eventType:'',eventDate:'',guestCount:'',message:'' }) }}
                style={{ ...mono, fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B7A2A', background: 'transparent', border: '1px solid #9B7A2A44', padding: '12px 28px', cursor: 'pointer' }}
              >
                {zh ? '提交新詢問' : 'Submit Another Enquiry'}
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              noValidate
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <FormField label={zh ? '姓名 *' : 'Full Name *'} error={errors.name}>
                  <input className="bare-input" type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder={zh ? '您的姓名' : 'Your name'} />
                </FormField>
                <FormField label="Email *" error={errors.email}>
                  <input className="bare-input" type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com" />
                </FormField>
              </div>

              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <FormField label={zh ? '電話 *' : 'Phone *'} error={errors.phone}>
                  <input className="bare-input" type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+886 900 000 000" />
                </FormField>
                <FormField label={zh ? '活動類型 *' : 'Event Type *'} error={errors.eventType}>
                  <select
                    name="eventType" value={form.eventType} onChange={handleChange}
                    style={{
                      width: '100%', background: 'transparent', border: 'none',
                      borderBottom: `1px solid ${errors.eventType ? '#E53E3E' : '#C4B89055'}`,
                      padding: '10px 0', fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
                      color: form.eventType ? '#1A0E05' : '#9B8A6A', outline: 'none',
                      appearance: 'none', cursor: 'pointer',
                    }}
                  >
                    <option value="" style={{ color: '#9B8A6A' }}>{zh ? '選擇類型' : 'Select type'}</option>
                    {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FormField>
              </div>

              {/* Row 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <FormField label={zh ? '活動日期 *' : 'Event Date *'} error={errors.eventDate}>
                  <input className="bare-input" type="date" name="eventDate" value={form.eventDate} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]} />
                </FormField>
                <FormField label={zh ? '賓客人數 *' : 'Guest Count *'} error={errors.guestCount}>
                  <input className="bare-input" type="number" name="guestCount" value={form.guestCount} onChange={handleChange}
                    min="1" max="500" placeholder={zh ? '多少位賓客' : 'Number of guests'} />
                </FormField>
              </div>

              {/* Message */}
              <FormField label={zh ? '特殊需求與備注' : 'Special Requirements & Notes'}>
                <textarea
                  className="bare-input"
                  name="message" value={form.message} onChange={handleChange}
                  rows={4}
                  placeholder={zh ? '飲食限制、場地、慶典細節…' : 'Dietary requirements, venue details, occasion notes…'}
                  style={{ resize: 'none' }}
                />
              </FormField>

              {/* Submit */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', paddingTop: '8px' }}>
                <button
                  type="submit"
                  style={{
                    ...mono,
                    fontSize: '11px',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: '#FAF5EC',
                    background: '#9B7A2A',
                    border: 'none',
                    padding: '16px 36px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#7A5E1E'}
                  onMouseLeave={e => e.currentTarget.style.background = '#9B7A2A'}
                >
                  {zh ? '發送詢問' : 'Send Enquiry'}
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href="https://wa.me/886910309268"
                    target="_blank" rel="noopener noreferrer"
                    style={{ ...mono, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9B7A2A', textDecoration: 'none', opacity: 0.8 }}
                  >
                    WhatsApp
                  </a>
                  <span style={{ color: '#D4C5A6', fontSize: '10px' }}>·</span>
                  <a
                    href="mailto:events@sreeindiapalace.com"
                    style={{ ...mono, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9B8A6A', textDecoration: 'none', opacity: 0.8 }}
                  >
                    Email
                  </a>
                </div>
              </div>
            </motion.form>
          )}

          {/* Footnote */}
          <p style={{ ...mono, fontSize: '8px', color: '#9B8A6A', opacity: 0.5, letterSpacing: '0.1em', marginTop: '40px', lineHeight: 1.8 }}>
            * {zh ? '我們將在24小時內回覆您的詢問' : 'We respond to all enquiries within 24 hours'}<br />
            * {zh ? '外燴服務最少20人' : 'Off-site catering minimum 20 guests'}<br />
            * {zh ? '建議提前2週預訂' : 'We recommend enquiring at least 2 weeks in advance'}
          </p>
        </div>
      </section>

    </motion.div>
  )
}

function FormField({ label, error, children }) {
  return (
    <div>
      <label style={{ fontFamily: "'Monograph', system-ui, sans-serif", fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B8A6A', display: 'block', marginBottom: '8px' }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#C53030', marginTop: '4px', letterSpacing: '0.02em' }}>
          {error}
        </p>
      )}
    </div>
  )
}
