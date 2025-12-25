import { useEffect, useState } from 'react'

/**
 * useDebounce
 * Purpose: return a debounced value that updates after `delay` ms of inactivity
 * Params: value, delay
 * Edge cases: delay=0 returns immediate, cleanup cancels pending timers
 */
export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    if (delay <= 0) {
      const id = setTimeout(() => setDebounced(value), 0)
      return () => clearTimeout(id)
    }
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])

  return debounced
}
