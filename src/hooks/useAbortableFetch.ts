import { useCallback, useRef, useState } from 'react'

/**
 * useAbortableFetch
 * Purpose: a lightweight fetch wrapper that exposes an abort function returned to the caller.
 * Returns: { data, error, loading, fetch, abort }
 */
export function useAbortableFetch<T = unknown>() {
  const controllerRef = useRef<AbortController | null>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const fetcher = useCallback(async (input: RequestInfo, init?: RequestInit) => {
    controllerRef.current?.abort()
    const ctrl = new AbortController()
    controllerRef.current = ctrl
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(input, { ...(init || {}), signal: ctrl.signal })
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const json = await res.json() as T
      setData(json)
      return json
    } catch (err: unknown) {
      if ((err as { name?: string }).name === 'AbortError') return
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const abort = useCallback(() => controllerRef.current?.abort(), [])
  return { data, error, loading, fetch: fetcher, abort } as const
}
