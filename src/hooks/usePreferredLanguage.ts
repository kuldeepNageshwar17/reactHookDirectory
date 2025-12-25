import { useMemo } from 'react'

/**
 * usePreferredLanguage
 * Returns the user's preferred language(s) from the navigator API.
 */
export function usePreferredLanguage() {
  const isClient = typeof navigator !== 'undefined'
  return useMemo(() => {
    if (!isClient) return { language: 'en', languages: ['en'] }
    return { language: navigator.language || 'en', languages: navigator.languages || [navigator.language || 'en'] }
  }, [isClient])
}
