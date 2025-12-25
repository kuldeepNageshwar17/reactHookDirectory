import { useEffect, useRef, useState } from 'react'

/**
 * useIntersectionObserver
 * Small wrapper around IntersectionObserver that returns entries and an observe function.
 */
export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    observerRef.current = new IntersectionObserver((ent) => setEntries(ent), options)
    return () => { observerRef.current?.disconnect() }
  }, [options])

  const observe = (el: Element | null) => { if (el && observerRef.current) observerRef.current.observe(el) }
  const unobserve = (el: Element | null) => { if (el && observerRef.current) observerRef.current.unobserve(el) }

  return { entries, observe, unobserve } as const
}
