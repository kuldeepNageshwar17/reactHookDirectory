import { useCallback, useMemo, useState } from 'react'

/**
 * useVirtualList
 * Simple virtual list helper.
 * Params: items (array), itemHeight, containerHeight, overscan
 * Returns: visible items slice, containerProps (onScroll, style), start index
 */
export function useVirtualList<T>(items: T[], itemHeight: number, containerHeight: number, overscan = 2) {
  const [scrollTop, setScrollTop] = useState(0)
  const onScroll = useCallback((e: Event) => {
    const el = e.target as Element
    setScrollTop((el as HTMLElement).scrollTop)
  }, [])

  const totalHeight = items.length * itemHeight
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const visibleCount = Math.ceil(containerHeight / itemHeight) + overscan * 2
  const end = Math.min(items.length, start + visibleCount)

  const visible = useMemo(() => items.slice(start, end), [items, start, end])

  const containerStyle = { height: containerHeight, overflowY: 'auto' as const }
  const spacerStyle = { height: totalHeight }

  return { visible, start, onScroll, containerStyle, spacerStyle } as const
}
