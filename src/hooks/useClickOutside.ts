import { useEffect } from 'react'

/**
 * useClickOutside
 * Calls handler when click/touch happens outside the provided element ref.
 */
export function useClickOutside<T extends HTMLElement>(ref: { current: T | null }, handler: (e: Event) => void) {
  useEffect(() => {
    const listener = (e: Event) => {
      const el = ref?.current
      if (!el) return
      if (e.target instanceof Node && el.contains(e.target)) return
      handler(e)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
