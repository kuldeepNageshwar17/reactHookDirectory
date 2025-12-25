import { useEffect, useState } from 'react'

/**
 * useScrollPosition
 * Returns current scrollX and scrollY. SSR-safe.
 */
export function useScrollPosition() {
  const isClient = typeof window !== 'undefined'
  const [pos, setPos] = useState(() => ({ x: isClient ? window.scrollX : 0, y: isClient ? window.scrollY : 0 }))

  useEffect(() => {
    if (!isClient) return
    const handler = () => setPos({ x: window.scrollX, y: window.scrollY })
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [isClient])

  return pos
}
