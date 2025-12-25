import { useEffect, useState } from 'react'

/**
 * useWindowSize
 * Returns width and height of the window. SSR-safe (returns 0,0 on server).
 */
export function useWindowSize() {
  const isClient = typeof window !== 'undefined'
  const [size, setSize] = useState(() => ({ width: isClient ? window.innerWidth : 0, height: isClient ? window.innerHeight : 0 }))

  useEffect(() => {
    if (!isClient) return
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [isClient])

  return size
}
