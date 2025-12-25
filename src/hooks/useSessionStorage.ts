import { useCallback, useEffect, useState } from 'react'
import { isClient } from '../utils/ssr'

/**
 * useSessionStorage - same shape as useLocalStorage but uses sessionStorage
 */
export function useSessionStorage<T>(key: string, initial: T | (() => T)) {
  const read = () => {
    if (!isClient) return typeof initial === 'function' ? (initial as () => T)() : initial
    try {
      const raw = sessionStorage.getItem(key)
      return raw ? JSON.parse(raw) as T : (typeof initial === 'function' ? (initial as () => T)() : initial)
    } catch (err) {
      console.warn('useSessionStorage: error reading', err)
      return typeof initial === 'function' ? (initial as () => T)() : initial
    }
  }

  const [state, setState] = useState<T>(read)

  useEffect(() => {
    if (!isClient) return
    try {
      sessionStorage.setItem(key, JSON.stringify(state))
    } catch (err) {
      console.warn('useSessionStorage: error writing', err)
    }
  }, [key, state])

  const remove = useCallback(() => {
    if (!isClient) return
    try {
      sessionStorage.removeItem(key)
      setState(typeof initial === 'function' ? (initial as () => T)() : initial)
    } catch (err) {
      console.warn('useSessionStorage: remove failed', err)
    }
  }, [key, initial])

  return [state, setState as (v: T | ((prev: T) => T)) => void, remove] as const
}
