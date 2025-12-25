import { useEffect, useState } from 'react'

/**
 * useDarkMode
 * Tracks OS preference and allows local override via localStorage.
 */
export function useDarkMode(key = 'use-dark-mode') {
  const isClient = typeof window !== 'undefined'
  const prefersDark = isClient && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (!isClient) return false
    const raw = localStorage.getItem(key)
    if (raw !== null) return raw === 'true'
    return prefersDark
  })

  useEffect(() => {
    if (!isClient) return
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    localStorage.setItem(key, String(isDark))
  }, [isDark, key, isClient])

  useEffect(() => {
    if (!isClient) return
    const mm = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => setIsDark(prev => {
      // only change if user hasn't saved a preference
      const saved = localStorage.getItem(key)
      if (saved !== null) return prev
      return e.matches
    })
    if (typeof mm.addEventListener === 'function') {
      mm.addEventListener('change', onChange as EventListener)
      return () => mm.removeEventListener('change', onChange as EventListener)
    }
    type LegacyMQL = MediaQueryList & { addListener?: (cb: (e: MediaQueryListEvent) => void) => void; removeListener?: (cb: (e: MediaQueryListEvent) => void) => void }
    const legacy = mm as LegacyMQL
    if (legacy.addListener) legacy.addListener(onChange as (e: MediaQueryListEvent) => void)
    return () => { if (legacy.removeListener) legacy.removeListener(onChange as (e: MediaQueryListEvent) => void) }
  }, [key, isClient])

  const toggle = () => setIsDark(d => !d)
  return { isDark, setIsDark, toggle } as const
}
