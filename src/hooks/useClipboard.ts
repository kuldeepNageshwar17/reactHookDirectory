import { useCallback, useState } from 'react'
import { isClient } from '../utils/ssr'

/**
 * useClipboard
 * Purpose: copy text to the user's clipboard and report status.
 * Returns: { copy(text), supported, isCopying, lastCopied }
 */
export function useClipboard() {
  const [isCopying, setIsCopying] = useState(false)
  const [lastCopied, setLastCopied] = useState<string | null>(null)

  const supported = isClient && !!(navigator.clipboard && navigator.clipboard.writeText)

  const copy = useCallback(async (text: string) => {
    if (!supported) return false
    setIsCopying(true)
    try {
      await navigator.clipboard.writeText(text)
      setLastCopied(text)
      return true
    } catch (err) {
      console.warn('useClipboard: copy failed', err)
      return false
    } finally {
      setIsCopying(false)
    }
  }, [supported])

  return { copy, supported, isCopying, lastCopied } as const
}
