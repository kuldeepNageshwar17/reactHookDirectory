import { useEffect, useState } from 'react'

/**
 * useMediaQuery
 * Returns whether the given media query matches. SSR-safe by defaulting false.
 */
export function useMediaQuery(query: string) {
  const isClient = typeof window !== 'undefined'
  const [matches, setMatches] = useState(() => (isClient ? window.matchMedia(query).matches : false))

  useEffect(() => {
    if (!isClient) return
    const mq = window.matchMedia(query)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', listener)
      return () => mq.removeEventListener('change', listener)
    } else {
      // older browsers - use a typed cast for legacy methods
      type LegacyMQL = MediaQueryList & { addListener?: (cb: (e: MediaQueryListEvent) => void) => void; removeListener?: (cb: (e: MediaQueryListEvent) => void) => void }
      const legacy = mq as LegacyMQL
      if (legacy.addListener) legacy.addListener(listener)
      return () => { if (legacy.removeListener) legacy.removeListener(listener) }
    }
  }, [query, isClient])

  return matches
}
