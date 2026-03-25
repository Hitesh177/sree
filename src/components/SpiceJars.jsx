import { useState } from 'react'

const jars = [
  {
    file: 'clove.webp',
    nameEN: 'Clove',
    nameTEL: 'లవంగం',
    fact: 'Cloves contain eugenol — a natural anaesthetic used in Indian cooking to warm the body and deepen biryani\'s aroma.',
  },
  { file: 'cardamom.webp',  nameEN: 'Cardamom',   nameTEL: 'ఏలకులు',         fact: 'Called the Queen of Spices — cardamom\'s floral sweetness is the secret in every cup of chai and pot of biryani.' },
  { file: 'saffron.webp',   nameEN: 'Saffron',    nameTEL: 'కుంకుమపువ్వు',  fact: 'More precious than gold by weight. Just a pinch of saffron turns biryani rice a deep royal gold.' },
  { file: 'chili.webp',     nameEN: 'Chili',      nameTEL: 'మిర్చి',         fact: 'India\'s Guntur chili is one of the world\'s hottest — the backbone of mirchi ka salan.' },
  { file: 'cumin.webp',     nameEN: 'Cumin',      nameTEL: 'జీలకర్ర',        fact: 'Dry-roasted cumin gives Indian raita its signature smoky depth.' },
  { file: 'turmeric.webp',  nameEN: 'Turmeric',   nameTEL: 'పసుపు',          fact: 'Used in India for 4,000 years — turmeric\'s golden colour is sacred in both cooking and ceremony.' },
  { file: 'cinnamon.webp',      nameEN: 'Cinnamon',      nameTEL: 'దాల్చిన చెక్క', fact: 'A whole cinnamon stick dropped into hot oil is the very first step in making authentic dum biryani.' },
  { file: 'bay-leaf.webp',     nameEN: 'Bay Leaf',      nameTEL: 'బిర్యాని ఆకు',  fact: 'In Telugu kitchens bay leaf is called Biryani Aaku — the biryani leaf. A pot without it simply isn\'t right.' },
  { file: 'mustard-seeds.webp',nameEN: 'Mustard Seeds', nameTEL: 'ఆవాలు',          fact: 'When mustard seeds hit hot oil they pop like tiny fireworks — the aromatic foundation of Indian dal and raita.' },
]

export default function SpiceJars() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="flex items-end gap-8 flex-wrap">
      {jars.map((jar, i) => (
        <div
          key={i}
          className="relative flex flex-col items-center cursor-pointer"
          style={{ width: '120px', marginBottom: i % 2 === 0 ? '0px' : '16px' }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Fact tooltip on hover */}
          {hovered === i && (
            <div
              className="absolute bottom-[calc(100%+12px)] left-1/2 z-10 pointer-events-none"
              style={{
                transform: 'translateX(-50%)',
                width: '220px',
                background: '#0A0805',
                border: '1px solid #9B7A2A55',
                padding: '14px 16px',
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
                  border: '1px solid #9B7A2A55',
                }}
              />
              <p
                className="font-sans leading-relaxed"
                style={{ fontSize: '11px', color: '#C8C0B0' }}
              >
                <span style={{ color: '#C4A04A', fontWeight: 500 }}>{jar.nameEN}</span>
                <br /><br />
                {jar.fact}
              </p>
            </div>
          )}

          {/* Jar image — no background, scale on hover */}
          <img
            src={`/spice-jars/${jar.file}`}
            alt={jar.nameEN}
            style={{
              width: '120px',
              height: 'auto',
              objectFit: 'contain',
              transform: hovered === i ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              filter: hovered === i ? 'drop-shadow(0 12px 24px rgba(155,122,42,0.3))' : 'none',
              mixBlendMode: 'multiply',
            }}
          />
        </div>
      ))}
    </div>
  )
}
