export type AsyncState<T> = {
  data: T | null
  error: Error | null
  loading: boolean
}

export type FetchOptions = RequestInit & { cache?: 'no-cache' | 'default' }
