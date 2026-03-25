import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const dotRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const lerped = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = () => {
      lerped.current.x += (pos.current.x - lerped.current.x) * 0.1
      lerped.current.y += (pos.current.y - lerped.current.y) * 0.1
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${lerped.current.x - 7}px, ${lerped.current.y - 7}px) rotate(45deg)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '14px',
        height: '14px',
        background: '#9B7A2A',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.5,
        willChange: 'transform',
        mixBlendMode: 'multiply',
      }}
    />
  )
}
