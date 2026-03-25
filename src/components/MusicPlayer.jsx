import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const MUSIC_URL =
  'https://archive.org/download/classical-music-flute/Classical%20Music-Flute/01-Swarajathi%20Bairavi.mp3'

// Real rose petal photos (transparent PNG, saved locally in /public/)
const PETAL_SRCS = [
  '/rose-petals-1.png',
  '/rose-petals-2.png',
  '/rose-petals-3.png',
  '/rose-petals-4.png',
]

// Sizes to draw each petal at (px) – randomised within range per particle
const PETAL_SIZE_MIN = 48
const PETAL_SIZE_MAX = 90

export default function MusicPlayer() {
  const { language } = useLanguage()
  const zh = language === 'zh'

  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)

  const audioRef      = useRef(null)
  const canvasRef     = useRef(null)
  const animRef       = useRef(null)
  const petalsRef     = useRef([])        // active petal particles
  const imagesRef     = useRef([])        // preloaded Image objects
  const imgsReadyRef  = useRef(false)
  const spawnTimerRef = useRef(0)         // track last spawn timestamp
  const stoppingRef   = useRef(false)    // draining state (music off but petals still falling)

  // ── Preload petal images once ──────────────────────────────────────────────
  useEffect(() => {
    const imgs = PETAL_SRCS.map(src => {
      const img = new Image()
      img.src = src
      return img
    })
    imagesRef.current = imgs
    Promise.all(
      imgs.map(
        img =>
          new Promise(resolve => {
            if (img.complete && img.naturalWidth) resolve()
            else {
              img.onload  = resolve
              img.onerror = resolve
            }
          })
      )
    ).then(() => {
      imgsReadyRef.current = true
    })
  }, [])

  // ── Resize canvas to always fill the viewport ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ── Particle factory ───────────────────────────────────────────────────────
  const spawnPetal = useCallback(() => {
    const idx  = Math.floor(Math.random() * PETAL_SRCS.length)
    const size = PETAL_SIZE_MIN + Math.random() * (PETAL_SIZE_MAX - PETAL_SIZE_MIN)
    return {
      idx,
      x:         Math.random() * window.innerWidth,
      y:         -(size + 20),
      size,
      rot:       Math.random() * Math.PI * 2,
      rotSpeed:  (Math.random() - 0.5) * 0.04,
      speedY:    0.8 + Math.random() * 2.2,
      driftX:    (Math.random() - 0.5) * 0.6,
      sway:      Math.random() * Math.PI * 2,
      swaySpeed: 0.018 + Math.random() * 0.025,
      swayAmt:   0.6 + Math.random() * 1.8,
      opacity:   0.55 + Math.random() * 0.45,
    }
  }, [])

  // ── Animation loop ─────────────────────────────────────────────────────────
  const startLoop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    stoppingRef.current = false

    const loop = ts => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn new petals only while music is playing (not draining)
      if (!stoppingRef.current && ts - spawnTimerRef.current > 350 + Math.random() * 550) {
        petalsRef.current.push(spawnPetal())
        spawnTimerRef.current = ts
      }

      // Update positions
      petalsRef.current.forEach(p => {
        p.sway += p.swaySpeed
        p.x    += Math.sin(p.sway) * p.swayAmt + p.driftX
        p.y    += p.speedY
        p.rot  += p.rotSpeed
      })

      // Remove petals that have fallen off screen
      petalsRef.current = petalsRef.current.filter(
        p => p.y < canvas.height + 120
      )

      // Draw each petal
      petalsRef.current.forEach(p => {
        const img = imagesRef.current[p.idx]
        if (!img || !img.naturalWidth) return

        const aspect = img.naturalWidth / img.naturalHeight
        const w = p.size * aspect
        const h = p.size

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.drawImage(img, -w / 2, -h / 2, w, h)
        ctx.restore()
      })

      // Continue loop while there are petals OR music is still playing
      if (!stoppingRef.current || petalsRef.current.length > 0) {
        animRef.current = requestAnimationFrame(loop)
      } else {
        // All done — clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        animRef.current = null
      }
    }

    animRef.current = requestAnimationFrame(loop)
  }, [spawnPetal])

  const stopLoop = useCallback(() => {
    stoppingRef.current = true
    // Loop will keep running until remaining petals fall off, then auto-stops
  }, [])

  // ── Drive audio & petals from `playing` state ──────────────────────────────
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      setLoading(true)
      audio.play()
        .then(() => setLoading(false))
        .catch(() => { setPlaying(false); setLoading(false) })
      startLoop()
    } else {
      audio.pause()
      stopLoop()
    }
  }, [playing, startLoop, stopLoop])

  // ── Cleanup on unmount ─────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      const audio = audioRef.current
      if (audio) { audio.pause(); audio.currentTime = 0 }
    }
  }, [])

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={MUSIC_URL}
        loop
        preload="none"
        crossOrigin="anonymous"
      />

      {/* Full-screen petal canvas — pointer-events none so it doesn't block clicks */}
      <canvas
        ref={canvasRef}
        style={{
          position:      'fixed',
          inset:         0,
          width:         '100%',
          height:        '100%',
          pointerEvents: 'none',
          zIndex:        9996,
        }}
      />

      {/* Music toggle button — bottom-left, above the Reserve button */}
      <motion.button
        onClick={() => setPlaying(v => !v)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: 'easeOut' }}
        style={{
          position:      'fixed',
          bottom:        '90px',
          left:          '24px',
          width:         '44px',
          height:        '44px',
          borderRadius:  '50%',
          background:    playing ? '#9B7A2A' : 'rgba(26,14,5,0.88)',
          border:        '1px solid rgba(155,122,42,0.5)',
          cursor:        'pointer',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          zIndex:        9999,
          color:         playing ? '#FAF5EC' : '#9B7A2A',
          backdropFilter:'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow:     playing
            ? '0 0 0 3px rgba(155,122,42,0.25), 0 4px 20px rgba(155,122,42,0.35)'
            : '0 2px 14px rgba(26,14,5,0.5)',
          transition:    'background 0.3s, color 0.3s, box-shadow 0.3s',
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? (zh ? '關閉音樂' : 'Pause music') : (zh ? '播放印度古典音樂' : 'Play South Indian classical music')}
        title={playing ? (zh ? '關閉音樂' : 'Pause music') : (zh ? '播放南印度古典音樂' : 'Play classical music')}
      >
        {/* Pulsing ring when playing */}
        {playing && (
          <motion.span
            style={{
              position:     'absolute',
              inset:        '-6px',
              borderRadius: '50%',
              border:       '1.5px solid rgba(155,122,42,0.4)',
              pointerEvents:'none',
            }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
        )}

        {loading ? (
          /* Spinner while buffering */
          <motion.svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </motion.svg>
        ) : playing ? (
          /* Pause bars */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          /* Music note */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        )}
      </motion.button>

      {/* Tiny label that appears below the button */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: playing ? 1 : 0.65 }}
        style={{
          position:   'fixed',
          bottom:     '78px',
          left:       '24px',
          width:      '44px',
          textAlign:  'center',
          fontFamily: "'Monograph', system-ui, sans-serif",
          fontSize:   '7px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:      playing ? '#9B7A2A' : 'rgba(155,122,42,0.55)',
          pointerEvents: 'none',
          zIndex:     9999,
        }}
      >
        {zh ? '音樂' : 'Music'}
      </motion.span>
    </>
  )
}
