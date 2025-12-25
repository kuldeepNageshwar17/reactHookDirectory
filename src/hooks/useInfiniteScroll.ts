import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * useInfiniteScroll
 * Purpose: provides items, loading flag and a sentinel ref to attach to the loader element.
 * Params: loader: async function that loads next items and returns array
 */
export function useInfiniteScroll<T>(loader: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLElement | null>(null)

  const loadMore = useCallback(async () => {
    setLoading(true)
    try {
      const next = await loader()
      setItems(prev => [...prev, ...next])
    } finally { setLoading(false) }
  }, [loader])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) loadMore()
      })
    })
    const obs = observerRef.current
    const el = sentinelRef.current
    if (el) obs.observe(el)
    return () => { if (el) obs.unobserve(el) }
  }, [loadMore])

  return { items, loading, sentinelRef: (el: HTMLElement | null) => { sentinelRef.current = el }, loadMore } as const
}
