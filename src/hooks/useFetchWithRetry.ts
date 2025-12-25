import { useCallback } from 'react'
import { useFetch } from './useFetch'

/**
 * useFetchWithRetry
 * A thin helper that will attempt refetch `retries` times with `delay` between attempts.
 */
export function useFetchWithRetry<T = unknown>(url: string | null, options?: RequestInit, retries = 2, delay = 500) {
  const base = useFetch<T>(url, options)

  const retry = useCallback(async () => {
    for (let i = 0; i <= retries; i++) {
      try {
        await base.refetch()
        return
      } catch (err) {
        if (i === retries) throw err
        await new Promise(res => setTimeout(res, delay))
      }
    }
  }, [base, retries, delay])

  return { ...base, retry } as const
}
