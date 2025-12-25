import { useEffect, useState } from 'react'

/**
 * useElementSize
 * Returns width/height for a given element via ResizeObserver. Returns a ref setter.
 */
export function useElementSize<T extends HTMLElement = HTMLElement>() {
  const [el, setEl] = useState<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!el || typeof ResizeObserver === 'undefined') return
    const obs = new ResizeObserver(entries => {
      for (const entry of entries) {
        const cr = entry.contentRect
        setSize({ width: cr.width, height: cr.height })
      }
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [el])

  return { ref: setEl, size } as const
}
