import { useCallback, useState } from 'react'
import { useFetch } from './useFetch'

/**
 * usePaginatedFetch
 * Simple pagination helper using useFetch for each page.
 * Params: baseUrl (without page query), pageSize
 */
export function usePaginatedFetch<T = unknown>(baseUrl: string, pageSize = 10) {
  const [page, setPage] = useState(1)
  const url = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}_page=${page}&_limit=${pageSize}`
  const res = useFetch<T[]>(url)

  const next = useCallback(() => setPage(p => p + 1), [])
  const prev = useCallback(() => setPage(p => Math.max(1, p - 1)), [])
  const reset = useCallback(() => setPage(1), [])

  return { ...res, page, next, prev, reset } as const
}
