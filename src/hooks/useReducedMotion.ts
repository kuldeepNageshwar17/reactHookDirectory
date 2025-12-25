import { useEffect, useState } from 'react'

/**
 * useReducedMotion
 * Returns whether the user prefers reduced motion.
 */
export function useReducedMotion() {
  const isClient = typeof window !== 'undefined'
  const [reduced, setReduced] = useState(() => (isClient ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false))

  useEffect(() => {
    if (!isClient) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange as EventListener)
      return () => mq.removeEventListener('change', onChange as EventListener)
    }
    type LegacyMQL = MediaQueryList & { addListener?: (cb: (e: MediaQueryListEvent) => void) => void; removeListener?: (cb: (e: MediaQueryListEvent) => void) => void }
    const legacy = mq as LegacyMQL
    if (legacy.addListener) legacy.addListener(onChange)
    return () => { if (legacy.removeListener) legacy.removeListener(onChange) }
  }, [isClient])

  return reduced
}
