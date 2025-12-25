import { useEffect, useRef, useState } from 'react'

/**
 * useResizeObserver
 * Returns size and an observe function to attach to elements.
 */
export function useResizeObserver() {
  const obsRef = useRef<ResizeObserver | null>(null)
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return
    obsRef.current = new ResizeObserver(entries => {
      const e = entries[0]
      if (!e) return
      const cr = e.contentRect
      setSize({ width: cr.width, height: cr.height })
    })
    return () => obsRef.current?.disconnect()
  }, [])

  const observe = (el: Element | null) => { if (el && obsRef.current) obsRef.current.observe(el) }
  const unobserve = (el: Element | null) => { if (el && obsRef.current) obsRef.current.unobserve(el) }

  return { size, observe, unobserve } as const
}
