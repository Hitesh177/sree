import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { BOOKING_URL } from '../constants'

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14 } },
}

// Blueprint grid CSS helper
const blueprintGrid = {
  backgroundImage:
    'linear-gradient(rgba(30, 74, 140, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 74, 140, 0.06) 1px, transparent 1px)',
  backgroundSize: '32px 32px',
}

// Blueprint annotation box
function BlueprintTag({ children }) {
  return (
    <span
      className="inline-block font-sans text-[9px] tracking-[0.3em] uppercase px-2 py-1"
      style={{ color: '#1E4A8C', border: '1px solid #1E4A8C55', letterSpacing: '0.28em' }}
    >
      {children}
    </span>
  )
}

// Blueprint corner marks on a container
function ArchPanel({ children, className = '', style = {} }) {
  return (
    <div className={`relative ${className}`} style={style}>
      <span className="absolute top-0 left-0 w-5 h-5 border-t border-l" style={{ borderColor: '#1E4A8C66' }} />
      <span className="absolute top-0 right-0 w-5 h-5 border-t border-r" style={{ borderColor: '#1E4A8C66' }} />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l" style={{ borderColor: '#1E4A8C66' }} />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r" style={{ borderColor: '#1E4A8C66' }} />
      {children}
    </div>
  )
}

// Cinzel is the page-specific display font — Roman architectural, engraved-stone feel
const cinzel = { fontFamily: "'Cinzel', serif" }

const timelineNodes = [
  {
    year: '1600s',
    yearZH: '十七世紀',
    labelEN: 'The Nizam Courts',
    labelZH: '尼扎姆宮廷',
    descEN: 'In the royal kitchens of Hyderabad\'s Nizam courts, Persian and Mughal culinary traditions fused with local Telugu flavors — giving birth to dum biryani, haleem, and mirchi ka salan as high culinary art.',
    descZH: '在海德拉巴尼扎姆宮廷的皇家廚房裡，波斯和蒙兀兒烹飪傳統與泰盧固口味融合——將慢燉香飯、哈利姆和辣椒咖哩昇華為飲食藝術。',
    culturalEN: 'India: Hyderabad was one of South Asia\'s wealthiest princely states. Food was a royal art form — the Nizam\'s chefs elevated biryani into a monument of layered spice and slow time.',
    culturalZH: '印度：海德拉巴是南亞最富裕的土邦之一。食物是皇家藝術——尼扎姆的廚師將香飯昇華為層層香料與慢時光的飲食豐碑。',
    img: '/biryani-thali.webp',
    imgAlt: 'Hyderabadi biryani thali at Sree India Palace',
    side: 'left',
  },
  {
    year: '1947',
    yearZH: '1947年',
    labelEN: 'Recipes Take Refuge',
    labelZH: '食譜的守護',
    descEN: 'As political borders shifted across the subcontinent, Hyderabadi families carried their culinary heritage in memory alone — recipes never written, passed mouth to ear, preserved as an act of cultural identity.',
    descZH: '隨著次大陸政治邊界變化，海德拉巴家族僅憑記憶攜帶著烹飪遺產——從未書寫的食譜，口耳相傳，作為文化認同而保存。',
    culturalEN: 'India: The oral preservation of recipe traditions in Hyderabadi households became a form of cultural resistance — memory as the only archive that could not be taken.',
    culturalZH: '印度：海德拉巴家庭對食譜的口傳保存成為一種文化抵抗形式——記憶是唯一無法被奪走的檔案。',
    img: '/thali-cover.webp',
    imgAlt: 'Traditional Indian thali — Sree India Palace',
    side: 'right',
  },
  {
    year: '1986',
    yearZH: '1986年',
    labelEN: 'The Family Kitchen',
    labelZH: '家族廚房',
    descEN: 'In Old Hyderabad\'s winding lanes, our founder\'s kitchen was never silent. Spices ground at dawn. Dum sealed under dough by noon. These rhythms — unchanged for forty years — are the foundation of every dish served today.',
    descZH: '在海德拉巴舊城曲折的巷弄裡，我們創辦人的廚房從不安靜。黎明研磨香料。午前密封慢燉。這些四十年不變的節奏，是今日每道菜的根基。',
    culturalEN: 'India: The morning spice grind is a sacred ritual — coriander, cumin, cardamom, dried chilies ground fresh daily. Nothing pre-packed. Nothing from a jar.',
    culturalZH: '印度：早晨研磨香料是神聖儀式——芫荽、孜然、荳蔻、乾辣椒每日新鮮研磨。不預先包裝。不用罐裝。',
    img: '/biryani-cover.webp',
    imgAlt: 'Dum biryani — Sree India Palace kitchen',
    side: 'left',
  },
  {
    year: '2005',
    yearZH: '2005年',
    labelEN: 'Arriving in Taiwan',
    labelZH: '抵達台灣',
    descEN: 'Our founder arrived in Taiwan with a spice box, recipes held only in memory, and a conviction that Taichung — with its diverse palate and genuinely curious food culture — was ready for something it had never tasted.',
    descZH: '我們的創辦人帶著香料盒、僅存於記憶中的食譜，以及台中已準備好品嚐從未嚐過之物的信念抵達台灣。',
    culturalEN: 'Taiwan: Taichung had a flourishing international food scene — Japanese, Italian, Southeast Asian — but authentic Indian cuisine was entirely absent.',
    culturalZH: '台灣：台中擁有蓬勃的國際美食場景——日式、義式、東南亞——但正宗印度料理完全缺席。',
    img: '/taichung-skyline.jpg',
    imgAlt: 'Taichung city skyline',
    side: 'right',
  },
  {
    year: '2008–11',
    yearZH: '2008–11年',
    labelEN: 'The Underground Kitchen',
    labelZH: '地下廚房',
    descEN: 'For three years, dinners were served from a small Taichung apartment. No sign, no menu — just word of mouth. Taiwanese food lovers, Indian expats, and the curious gathered around a table that smelled of cardamom and charred chili.',
    descZH: '三年間，晚餐在台中一間小公寓提供。沒有招牌，沒有菜單——只有口耳相傳。台灣美食愛好者、在台印度人和好奇者聚集在飄著荳蔻和炭燒辣椒香氣的餐桌旁。',
    culturalEN: 'Taiwan: The spirit of informal dining — food spreading by whisper, community built around a shared table — mirrors the origins of many of Taichung\'s most beloved restaurants.',
    culturalZH: '台灣：非正式餐飲精神——美食靠耳語傳播，圍繞共同餐桌建立社群——呼應著台中許多深受喜愛餐廳的起源。',
    img: '/int-dining-booth.webp',
    imgAlt: 'Intimate dining at Sree India Palace',
    side: 'left',
  },
  {
    year: '2012',
    yearZH: '2012年',
    labelEN: 'Opening in Taichung',
    labelZH: '台中開幕',
    descEN: 'Sree India Palace opened in Taichung\'s West District — the city\'s first authentic Indian restaurant rooted in the Hyderabad tradition. The recipes were the same as 1986. They remain so today.',
    descZH: '斯里印度宮在台中西區開幕——台中第一家根植於海德拉巴傳統的正宗印度餐廳。食譜與1986年相同。至今仍然如此。',
    culturalEN: 'Taiwan: Taichung West District is home to the city\'s most adventurous dining — a neighborhood where international flavors have found genuinely loyal local audiences.',
    culturalZH: '台灣：台中西區是台中最具冒險精神的餐飲聚集地——國際風味在此找到了真正忠實的本地受眾。',
    img: '/int-entrance.webp',
    imgAlt: 'Sree India Palace entrance — Taichung',
    side: 'right',
  },
  {
    year: '2024',
    yearZH: '2024年',
    labelEN: 'A Decade Rooted',
    labelZH: '深根十年',
    descEN: 'Two cultures — Indian culinary heritage and Taiwanese hospitality — woven into every plate, every evening, in Taichung\'s West District.',
    descZH: '兩種文化——印度烹飪遺產與台灣熱情款待——交織在台中西區每個夜晚我們端上的每一道菜中。',
    culturalEN: 'India + Taiwan: A decade of Indian culinary tradition in Taichung. Where the spice routes of South Asia meet the warmth of Taiwan\'s table culture.',
    culturalZH: '印度＋台灣：印度烹飪傳統在台中的十年。南亞香料之路與台灣餐桌文化溫情的交匯之處。',
    img: '/int-dining-wide.webp',
    imgAlt: 'Sree India Palace dining room — a decade in Taichung',
    side: 'left',
  },
]

const craftItems = [
  {
    label: 'I',
    title: 'Fresh-Ground Spices',
    titleZH: '每日研磨香料',
    desc: 'Every morning our spice blends are ground fresh — coriander, cumin, cardamom, dried chilies. Nothing from a jar, nothing from a packet. The same ritual since 1986, unchanged.',
    descZH: '每天早晨我們新鮮研磨香料——芫荽、孜然、荳蔻、乾辣椒。不用罐裝，不用袋裝。自1986年以來的同樣儀式，從未改變。',
  },
  {
    label: 'II',
    title: 'Dum Technique',
    titleZH: '慢燉技術',
    desc: 'Hyderabadi dum biryani is sealed under dough and slow-cooked over low heat for two patient hours. The steam does all the work. There are no shortcuts worth taking.',
    descZH: '海德拉巴慢燉香飯在麵團下密封，以小火耐心慢煮兩小時。蒸汽完成所有工作。沒有值得走的捷徑。',
  },
  {
    label: 'III',
    title: 'Generational Recipes',
    titleZH: '世代相傳食譜',
    desc: "Our core recipes haven't changed since 1986. They were never written down — passed mouth to ear, hand over hand, generation after generation, across the family and across the ocean.",
    descZH: '我們的核心食譜自1986年以來從未改變。它們從未被寫下來——口耳相傳，手手相傳，跨越家族，跨越海洋，代代相傳。',
  },
]

export default function OurStory() {
  const { language } = useLanguage()
  const [activeNode, setActiveNode] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-18"
      style={{ background: '#F5EDD8' }}
    >

      {/* ── MONUMENT HERO ── */}
      <section
        className="relative min-h-screen overflow-hidden"
        style={{ background: '#F0E6CC', ...blueprintGrid }}
      >
        {/* Blueprint cross-hairs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: 'rgba(30,74,140,0.07)' }} />
          <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'rgba(30,74,140,0.07)' }} />
        </div>

        {/* Split layout: text left, image right */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* LEFT — text, vertically centred, pushed below navbar */}
          <div className="flex flex-col justify-center px-10 md:px-16 xl:px-24 pt-28 pb-20 lg:pt-36">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="font-sans text-[9px] tracking-[0.4em] uppercase mb-6"
                style={{ color: '#1E4A8C', opacity: 0.6 }}
              >
                {language === 'zh' ? '我們的故事' : 'Our Story'}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="font-cinzel font-light leading-tight tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 6.5rem)', color: '#1A0E05' }}
              >
                {language === 'zh'
                  ? <>從海德拉巴<br /><em>到台中</em></>
                  : <>From Hyderabad<br />to <span className="cursive-accent" style={{ fontSize: '0.88em', color: '#9B7A2A' }}>Taichung</span></>}
              </motion.h1>
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 mt-8"
              >
                <div className="w-16 h-px" style={{ background: '#1E4A8C44' }} />
                <span className="w-1.5 h-1.5 rotate-45 block" style={{ background: '#9B7A2A' }} />
              </motion.div>
            </motion.div>

            {/* Bottom dimension lines */}
            <div className="absolute bottom-10 left-10 md:left-16 flex items-center gap-4 pointer-events-none">
              <div className="w-px h-3" style={{ background: '#1E4A8C40' }} />
              <div className="w-20 h-px" style={{ background: '#1E4A8C40' }} />
              <span className="font-sans" style={{ fontSize: '8px', color: '#1E4A8C', opacity: 0.45, letterSpacing: '0.25em' }}>
                SCALE 1 : ∞
              </span>
            </div>
          </div>

          {/* RIGHT — temple image, flush right, starting below navbar */}
          <motion.div
            className="relative flex items-end justify-end overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Taichung tag top-right */}
            <div className="absolute top-24 right-8 pointer-events-none">
              <BlueprintTag>Taichung, Taiwan</BlueprintTag>
            </div>

            <img
              src="/temple-blueprint.png"
              alt="South Indian Temple architectural drawing"
              className="w-full object-contain object-bottom"
              style={{
                maxWidth: '560px',
                paddingTop: '88px',
                paddingRight: '0px',
                filter: 'drop-shadow(-8px 0 40px rgba(30,74,140,0.15))',
                alignSelf: 'flex-end',
              }}
            />
          </motion.div>

        </div>
      </section>


      {/* ── INTERACTIVE TIMELINE ── */}
      <section
        className="py-28 px-8 md:px-16 xl:px-28 relative overflow-hidden"
        style={{ background: '#F0E6CC', ...blueprintGrid }}
      >
        {/* Faint large year watermark */}
        <div className="absolute right-0 top-1/2 pointer-events-none select-none hidden xl:block" style={{ transform: 'translateY(-50%)' }}>
          <span className="font-cinzel font-light" style={{ fontSize: '18rem', color: '#1E4A8C', opacity: 0.025, lineHeight: 1 }}>
            1986
          </span>
        </div>

        <div className="max-w-screen-xl mx-auto">

          {/* Section header */}
          <motion.div
            className="mb-20 max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <BlueprintTag>
                {language === 'zh' ? '歷史年表' : 'Chronicle · 1600s → 2024'}
              </BlueprintTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-cinzel font-light leading-tight mt-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', color: '#1A0E05' }}
            >
              {language === 'zh'
                ? <>四百年的滋味<br /><em>兩個家園，一張餐桌</em></>
                : <>Four Centuries of Flavour<br /><em>Two Homelands, One Table</em></>}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-sans leading-relaxed mt-6"
              style={{ fontSize: '0.95rem', color: '#5C4A30', lineHeight: '1.9' }}
            >
              {language === 'zh'
                ? '將游標懸停在每個節點上，探索印度皇家廚房如何跨越海洋，在台灣扎根。'
                : 'Hover each node to explore how an Indian royal kitchen crossed an ocean and found its second home in Taiwan.'}
            </motion.p>
          </motion.div>

          {/* Timeline body */}
          <div className="relative">

            {/* Vertical spine — desktop */}
            <div
              className="hidden lg:block absolute top-0 bottom-0 pointer-events-none"
              style={{ left: '50%', width: '1px', background: 'rgba(30,74,140,0.12)', transform: 'translateX(-50%)' }}
            />

            {timelineNodes.map((node, i) => (
              <motion.div
                key={i}
                className={`relative mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0 ${node.side === 'right' ? 'lg:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Center spine dot — desktop */}
                <div
                  className="hidden lg:block absolute top-6 pointer-events-none"
                  style={{
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    width: '10px',
                    height: '10px',
                    background: activeNode === i ? '#9B7A2A' : '#1E4A8C',
                    opacity: activeNode === i ? 1 : 0.35,
                    transition: 'background 0.3s, opacity 0.3s',
                  }}
                />

                {/* ── TEXT SIDE ── */}
                <div
                  className={`lg:w-[calc(50%-24px)] ${node.side === 'right' ? 'lg:pl-14' : 'lg:pr-14'} cursor-default`}
                  onMouseEnter={() => setActiveNode(i)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  {/* Mobile: year pill */}
                  <div className="flex items-center gap-3 mb-3 lg:mb-4">
                    <span
                      className="font-cinzel inline-block"
                      style={{ fontSize: '0.78rem', color: '#1E4A8C', letterSpacing: '0.25em', opacity: 0.9 }}
                    >
                      {language === 'zh' ? node.yearZH : node.year}
                    </span>
                    <div className="flex-1 h-px lg:hidden" style={{ background: 'rgba(30,74,140,0.12)' }} />
                  </div>

                  <h3
                    className="font-cinzel font-light leading-snug mb-3 transition-colors duration-300"
                    style={{
                      fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
                      color: activeNode === i ? '#1A0E05' : '#2A1A0A',
                    }}
                  >
                    {language === 'zh' ? node.labelZH : node.labelEN}
                  </h3>

                  <p
                    className="font-sans leading-relaxed"
                    style={{ fontSize: '0.93rem', color: '#5C4A30', lineHeight: '1.9' }}
                  >
                    {language === 'zh' ? node.descZH : node.descEN}
                  </p>

                  {/* Cultural note — hover reveal */}
                  <AnimatePresence>
                    {activeNode === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.28 }}
                        className="mt-5 quote-left"
                        style={{ borderLeftColor: '#9B7A2A55' }}
                      >
                        <p
                          className="font-sans italic"
                          style={{ fontSize: '0.88rem', color: '#9B7A2A', lineHeight: '1.85' }}
                        >
                          {language === 'zh' ? node.culturalZH : node.culturalEN}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mobile image — always visible */}
                  <div className="lg:hidden mt-5">
                    <ArchPanel style={{ padding: '8px' }}>
                      <img
                        src={node.img}
                        alt={node.imgAlt}
                        className="w-full object-cover"
                        style={{ height: '200px', filter: 'sepia(12%) saturate(1.05)' }}
                        loading="lazy"
                      />
                      <div className="pt-2 flex justify-between">
                        <span className="font-sans" style={{ fontSize: '7px', color: '#1E4A8C', letterSpacing: '0.2em', opacity: 0.5 }}>
                          FIG. {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-sans" style={{ fontSize: '7px', color: '#1E4A8C', letterSpacing: '0.15em', opacity: 0.4 }}>
                          {node.year}
                        </span>
                      </div>
                    </ArchPanel>
                  </div>
                </div>

                {/* ── IMAGE SIDE — desktop hover reveal ── */}
                <div className="hidden lg:block lg:w-[calc(50%-24px)]">
                  <AnimatePresence mode="wait">
                    {activeNode === i ? (
                      <motion.div
                        key="img"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className={node.side === 'right' ? 'pr-14' : 'pl-14'}
                      >
                        <ArchPanel style={{ padding: '10px' }}>
                          <img
                            src={node.img}
                            alt={node.imgAlt}
                            className="w-full object-cover"
                            style={{ height: '300px', filter: 'sepia(12%) saturate(1.05)' }}
                            loading="lazy"
                          />
                          <div className="pt-2.5 flex items-center justify-between">
                            <span className="font-sans" style={{ fontSize: '8px', color: '#1E4A8C', letterSpacing: '0.25em', opacity: 0.5 }}>
                              FIG. {String(i + 1).padStart(2, '0')} — {(language === 'zh' ? node.labelZH : node.labelEN).toUpperCase()}
                            </span>
                            <span className="font-sans" style={{ fontSize: '8px', color: '#1E4A8C', letterSpacing: '0.15em', opacity: 0.4 }}>
                              {node.year}
                            </span>
                          </div>
                        </ArchPanel>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center ${node.side === 'right' ? 'justify-start pr-14' : 'justify-end pl-14'}`}
                        style={{ height: '320px' }}
                      >
                        <span
                          className="font-cinzel font-light select-none"
                          style={{ fontSize: '7rem', color: '#1E4A8C', opacity: 0.05, lineHeight: 1 }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            ))}
          </div>

          {/* Timeline footer rule */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(30,74,140,0.12)' }} />
            <span className="w-2 h-2 rotate-45 block" style={{ background: '#9B7A2A', opacity: 0.4 }} />
            <div className="flex-1 h-px" style={{ background: 'rgba(30,74,140,0.12)' }} />
          </div>
        </div>
      </section>


      {/* ── CULTURAL BRIDGE — dark blueprint blue ── */}
      <section
        className="py-28 px-8 md:px-16 xl:px-28"
        style={{ background: '#1B3A6B', ...blueprintGrid }}
      >
        <div className="max-w-screen-xl mx-auto">

          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <BlueprintTag style={{ color: '#8AB0D8', borderColor: '#8AB0D844' }}>
                {language === 'zh' ? '文化橋梁' : 'Cultural Bridge · India × Taiwan'}
              </BlueprintTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-cinzel font-light leading-tight mt-6"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', color: '#F0E6CC' }}
            >
              {language === 'zh'
                ? <>兩種文化<br /><em>一張餐桌</em></>
                : <>Where Two Cultures<br /><em>Share a Table</em></>}
            </motion.h2>
          </motion.div>

          {/* Diptych */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* India column */}
            <motion.div
              className="p-10 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: 'rgba(240,230,204,0.08)' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="font-cinzel font-light" style={{ fontSize: '0.65rem', color: '#C4A04A', letterSpacing: '0.35em' }}>
                  {language === 'zh' ? '印度 · 海德拉巴' : 'INDIA · HYDERABAD'}
                </span>
                <div className="flex-1 h-px" style={{ background: '#C4A04A22' }} />
              </div>
              <h3 className="font-cinzel font-light mb-6" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', color: '#F0E6CC' }}>
                {language === 'zh' ? '尼扎姆遺產' : 'The Nizam Legacy'}
              </h3>
              <div className="space-y-5">
                {(language === 'zh' ? [
                  '400年以上的宮廷烹飪傳統，結合波斯、蒙兀兒和泰盧固影響',
                  '海德拉巴慢燉香飯被列為印度最複雜的地區料理之一',
                  '口傳食譜傳統：從未書寫，只在家族成員之間傳遞',
                  '每日香料研磨儀式——在印度家庭廚房中已延續數個世紀',
                  '哈利姆、米爾基卡薩蘭和古爾達尼——每道菜都有其獨特的場合',
                ] : [
                  '400+ years of royal court cuisine blending Persian, Mughal, and Telugu influences',
                  'Hyderabadi dum biryani is recognized as one of India\'s most complex regional dishes',
                  'Oral recipe tradition: never written, passed only between family members',
                  'Daily spice-grinding ritual — unchanged in Indian home kitchens for centuries',
                  'Haleem, mirchi ka salan, and qubani ka meetha — each dish with its own occasion',
                ]).map((fact, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <span className="font-sans shrink-0 mt-1" style={{ fontSize: '11px', color: '#C4A04A', letterSpacing: '0.15em' }}>
                      {String(j + 1).padStart(2, '0')}
                    </span>
                    <p className="font-sans leading-relaxed" style={{ fontSize: '0.92rem', color: '#C8DCF0', lineHeight: '1.85' }}>
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Taiwan column */}
            <motion.div
              className="p-10 md:p-12 lg:p-14"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="font-cinzel font-light" style={{ fontSize: '0.65rem', color: '#C4A04A', letterSpacing: '0.35em' }}>
                  {language === 'zh' ? '台灣 · 台中' : 'TAIWAN · TAICHUNG'}
                </span>
                <div className="flex-1 h-px" style={{ background: '#C4A04A22' }} />
              </div>
              <h3 className="font-cinzel font-light mb-6" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', color: '#F0E6CC' }}>
                {language === 'zh' ? '台灣的款待之道' : 'The Taiwanese Welcome'}
              </h3>
              <div className="space-y-5">
                {(language === 'zh' ? [
                  '台灣以其多元飲食文化著稱——來自世界各地的料理在此找到忠實觀眾',
                  '台中西區是創新餐飲的溫床，當地人對異國口味持開放態度',
                  '台灣的夜市文化——圍繞食物建立的社群——與我們地下廚房的起源不謀而合',
                  '台灣食客對食材和烹飪工藝的高標準要求，促使我們始終堅持正宗',
                  '忠實顧客的回饋反映了台灣人對誠實烹飪的深刻欣賞',
                ] : [
                  'Taiwan is celebrated for its diverse food culture — cuisines from across the world find loyal audiences here',
                  'Taichung West District is a hub for innovative dining, where locals embrace unfamiliar flavors with genuine curiosity',
                  'Taiwan\'s night market culture — community built around food — mirrors the spirit of our underground kitchen origins',
                  'Taiwanese diners\' high standards for ingredients and craft have pushed us to remain uncompromisingly authentic',
                  'Loyal guest feedback reflects Taiwan\'s deep appreciation for honest, labor-intensive cooking',
                ]).map((fact, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <span className="font-sans shrink-0 mt-1" style={{ fontSize: '11px', color: '#C4A04A', letterSpacing: '0.15em' }}>
                      {String(j + 1).padStart(2, '0')}
                    </span>
                    <p className="font-sans leading-relaxed" style={{ fontSize: '0.92rem', color: '#C8DCF0', lineHeight: '1.85' }}>
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Divider */}
          <div className="mt-16 flex items-center gap-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(240,230,204,0.08)' }} />
            <span className="font-cinzel font-light" style={{ fontSize: '0.65rem', color: '#C4A04A', letterSpacing: '0.4em', opacity: 0.6 }}>
              {language === 'zh' ? '台中西區 · 24.1477° N 120.6736° E' : 'WEST DISTRICT · 24.1477° N 120.6736° E'}
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(240,230,204,0.08)' }} />
          </div>

        </div>
      </section>


      {/* ── THE CRAFT — parchment, editorial list ── */}
      <section
        className="py-28 px-8 md:px-16 xl:px-28"
        style={{ background: '#EDE5CF', ...blueprintGrid }}
      >
        <div className="max-w-screen-xl mx-auto">

          <motion.div
            className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <div>
              <motion.div variants={fadeUp}>
                <BlueprintTag>
                  {language === 'zh' ? '我們的哲學' : 'How We Cook · Technical Notes'}
                </BlueprintTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-cinzel font-light leading-tight mt-6"
                style={{ fontSize: 'clamp(2rem, 3.8vw, 3.8rem)', color: '#1A0E05' }}
              >
                {language === 'zh'
                  ? <>不走捷徑<br /><em>從不妥協</em></>
                  : <>No Shortcuts<br /><em>No Compromise</em></>}
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="font-sans leading-relaxed"
              style={{ fontSize: '0.95rem', color: '#5C4A30', lineHeight: '1.9' }}
            >
              {language === 'zh'
                ? '自1986年以來，我們的廚房哲學從未動搖：使用最好的食材，遵循正確的技術，永不走捷徑。這三條原則，定義了台中斯里印度宮的每一道菜。'
                : 'Since 1986, our kitchen philosophy has never wavered: use the best ingredients, follow the right techniques, and never take a shortcut. These three principles define every dish that leaves our kitchen in Taichung\'s West District.'}
            </motion.p>
          </motion.div>

          {/* Craft items — editorial list */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="space-y-0"
          >
            {craftItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="grid grid-cols-[48px_1fr] lg:grid-cols-[80px_1fr] gap-8 py-10 border-t"
                style={{ borderColor: 'rgba(30,74,140,0.1)' }}
              >
                {/* Roman numeral */}
                <div className="pt-1">
                  <span
                    className="font-cinzel font-bold select-none"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#9B7A2A', opacity: 0.9 }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">
                  <h3
                    className="font-cinzel font-light leading-snug"
                    style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', color: '#1A0E05' }}
                  >
                    {language === 'zh' ? item.titleZH : item.title}
                  </h3>
                  <p
                    className="font-sans leading-relaxed"
                    style={{ fontSize: '0.93rem', color: '#5C4A30', lineHeight: '1.9' }}
                  >
                    {language === 'zh' ? item.descZH : item.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Final border */}
            <div className="border-t" style={{ borderColor: 'rgba(30,74,140,0.1)' }} />
          </motion.div>

          {/* Blueprint stat row */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {[
              { num: '10+', labelEN: 'Years in Taichung', labelZH: '在台年數' },
              { num: '90+', labelEN: 'Menu Dishes',       labelZH: '菜單菜肴' },
              { num: '2',   labelEN: 'Cultures, One Table', labelZH: '兩種文化，一張餐桌' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <ArchPanel style={{ padding: '20px 16px', textAlign: 'center' }}>
                  <div
                    className="font-cinzel font-light"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#1B3A6B' }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="font-sans mt-2"
                    style={{ fontSize: '8px', color: '#5C4A30', letterSpacing: '0.22em', opacity: 0.6, textTransform: 'uppercase' }}
                  >
                    {language === 'zh' ? s.labelZH : s.labelEN}
                  </div>
                </ArchPanel>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>


      {/* ── PULLQUOTE — parchment with temple watermark ── */}
      <section
        className="relative py-32 px-8 overflow-hidden"
        style={{ background: '#F0E6CC' }}
      >
        {/* Temple image as faded watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src="/temple-blueprint.png"
            alt=""
            aria-hidden="true"
            className="w-full max-w-2xl object-contain"
            style={{ opacity: 0.06, filter: 'saturate(0)' }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="font-cinzel block leading-none mb-3 select-none"
              style={{ fontSize: '6rem', color: '#1B3A6B', opacity: 0.12 }}
            >
              "
            </motion.span>
            <motion.p
              variants={fadeUp}
              className="font-cinzel italic leading-relaxed"
              style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.8rem)', color: '#1A0E05' }}
            >
              {language === 'zh'
                ? '"每道菜都是一段記憶。每一口都是一次回家。"'
                : '"Every dish is a memory. Every bite, a homecoming."'}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-4 mt-8"
            >
              <div className="w-12 h-px" style={{ background: '#1B3A6B44' }} />
              <span
                className="font-sans"
                style={{ fontSize: '9px', color: '#1B3A6B', letterSpacing: '0.3em', opacity: 0.55 }}
              >
                {language === 'zh' ? '創辦人 · 海德拉巴' : 'Founder · Hyderabad, 1986'}
              </span>
              <div className="w-12 h-px" style={{ background: '#1B3A6B44' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ── CTA — dark Bidri ── */}
      <section
        className="py-24 px-8 md:px-16 xl:px-28"
        style={{ background: '#0A0805' }}
      >
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span
                className="font-sans block text-[9px] tracking-[0.35em] uppercase mb-6"
                style={{ color: '#1E4A8C', opacity: 0.7 }}
              >
                {language === 'zh' ? '歡迎蒞臨' : 'Visit the Palace'}
              </span>
              <h2
                className="font-cinzel font-light leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: '#E0D8C8' }}
              >
                {language === 'zh'
                  ? <>今晚來體驗<br /><em>皇家風味</em></>
                  : <>Come Experience<br /><em>the Royal Table</em></>}
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col gap-4 lg:items-end">
              <p
                className="font-sans text-sm leading-relaxed max-w-xs lg:text-right"
                style={{ color: '#C8C0B0', opacity: 0.85 }}
              >
                {language === 'zh'
                  ? '台中西區，每天提供午餐和晚餐。建議週末預訂。'
                  : 'West District, Taichung. Lunch & dinner daily. Reservations recommended on weekends.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu" className="btn-gold">
                  {language === 'zh' ? '瀏覽菜單' : 'View Menu'}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
