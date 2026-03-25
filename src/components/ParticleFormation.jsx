import { useState, useEffect, lazy, Suspense } from 'react'

// Lazy-load the heavy Three.js canvas so it never blocks initial page render
const ParticleCanvas = lazy(() => import('./ParticleCanvas'))

export default function ParticleFormation({ height = '100vh' }) {
  const [posData, setPosData] = useState(null)
  const [colData, setColData] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch('/particle-pos.json').then(r => r.json()),
      fetch('/particle-col.json').then(r => r.json()),
    ]).then(([pos, col]) => {
      setPosData(pos)
      setColData(col)
    }).catch(() => {})
  }, [])

  return (
    <div style={{ width: '100%', height, background: '#0A0805', position: 'relative' }}>
      {posData && colData && (
        <Suspense fallback={null}>
          <ParticleCanvas posData={posData} colData={colData} />
        </Suspense>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 pointer-events-none">
        <p
          className="font-sans text-center"
          style={{ fontSize: '9px', color: '#C4A04A', letterSpacing: '0.35em', opacity: 0.6, marginBottom: '12px' }}
        >
          THE ESSENCE OF HYDERABAD
        </p>
        <p
          className="font-heading font-light text-center"
          style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.5rem)', color: '#F0E6CC', opacity: 0.85 }}
        >
          <em>30,000 grains of spice.</em>
        </p>
      </div>
    </div>
  )
}
