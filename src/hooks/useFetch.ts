import { useCallback, useEffect, useRef, useState } from 'react'
import type { AsyncState } from '../types'

/**
 * useFetch
 * Purpose: perform a fetch and manage loading/error/data state. Uses AbortController for cleanup.
 * Params: url, options
 * Returns: { data, error, loading, refetch }
 */
export function useFetch<T = unknown>(url: string | null, options?: RequestInit) {
  const [state, setState] = useState<AsyncState<T>>({ data: null, error: null, loading: !!url })
  const controllerRef = useRef<AbortController | null>(null)
  const savedUrl = useRef(url)

  const fetcher = useCallback(async (input?: string | null) => {
    const target = input ?? url
    if (!target) return
    controllerRef.current?.abort()
    const ctrl = new AbortController()
    controllerRef.current = ctrl
    setState(s => ({ ...s, loading: true }))
    try {
      const res = await fetch(target, { signal: ctrl.signal, ...(options || {}) })
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = (await res.json()) as T
      setState({ data, error: null, loading: false })
      return data
    } catch (err: unknown) {
      // AbortErrors are expected on unmounts; guard access safely
      const name = (err as { name?: string }).name
      if (name === 'AbortError') return
      setState({ data: null, error: err as Error, loading: false })
      throw err
    }
  }, [url, options])

  useEffect(() => {
    if (!url) return
    savedUrl.current = url
    fetcher(url).catch(() => {})
    return () => { controllerRef.current?.abort() }
  }, [url, fetcher])

  const refetch = useCallback(() => fetcher(savedUrl.current), [fetcher])
  return { ...state, refetch } as const
}
