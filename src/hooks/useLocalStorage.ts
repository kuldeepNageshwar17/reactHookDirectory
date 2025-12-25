import { useCallback, useEffect, useState } from 'react'
import { isClient } from '../utils/ssr'

/**
 * useLocalStorage
 * Purpose: store a value in localStorage and keep React state in sync.
 * Params: key - storage key, initial - initial value or initializer function
 * Returns: [value, setValue, remove]
 * Handles SSR by checking `isClient` before using localStorage.
 */
export function useLocalStorage<T>(key: string, initial: T | (() => T)) {
  const read = () => {
    if (!isClient) return typeof initial === 'function' ? (initial as () => T)() : initial
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) as T : (typeof initial === 'function' ? (initial as () => T)() : initial)
    } catch (err) {
      console.warn('useLocalStorage: error reading', err)
      return typeof initial === 'function' ? (initial as () => T)() : initial
    }
  }

  const [state, setState] = useState<T>(read)

  useEffect(() => {
    if (!isClient) return
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (err) {
      // storage errors can happen (quota, private mode)
      console.warn('useLocalStorage: error writing', err)
    }
  }, [key, state])

  const remove = useCallback(() => {
    if (!isClient) return
    try {
      localStorage.removeItem(key)
      setState(typeof initial === 'function' ? (initial as () => T)() : initial)
    } catch (err) {
      console.warn('useLocalStorage: remove failed', err)
    }
    }, [key, initial])

  return [state, setState as (v: T | ((prev: T) => T)) => void, remove] as const
}
