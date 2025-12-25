import { useEffect, useRef } from 'react'

/**
 * useTimeout
 * Purpose: run a callback once after delay ms. Returns cancel function via ref if needed.
 */
export function useTimeout(cb: () => void, delay: number | null) {
  const saved = useRef(cb)
  useEffect(() => { saved.current = cb }, [cb])

  useEffect(() => {
    if (delay == null) return
    const id = setTimeout(() => saved.current(), delay)
    return () => clearTimeout(id)
  }, [delay])
}
