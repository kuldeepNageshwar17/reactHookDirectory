import { useEffect, useRef, useState } from 'react'

/**
 * useThrottle
 * Purpose: returns a throttled version of a value that only updates at most once per `limit` ms
 */
export function useThrottle<T>(value: T, limit = 200) {
  const [throttled, setThrottled] = useState(value)
  const lastRun = useRef<number | null>(null)
  const timeout = useRef<number | null>(null)

  useEffect(() => {
    const now = Date.now()
    if (lastRun.current == null || (now - lastRun.current) >= limit) {
      lastRun.current = now
      const id = window.setTimeout(() => setThrottled(value), 0)
      return () => clearTimeout(id)
    }
    if (timeout.current) window.clearTimeout(timeout.current)
    const remaining = limit - (now - (lastRun.current || 0))
    timeout.current = window.setTimeout(() => {
      lastRun.current = Date.now()
      setThrottled(value)
    }, remaining)

    return () => { if (timeout.current) window.clearTimeout(timeout.current) }
  }, [value, limit])

  return throttled
}
