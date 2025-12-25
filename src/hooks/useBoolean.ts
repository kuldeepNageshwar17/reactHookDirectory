import { useCallback, useState } from 'react'

/**
 * useBoolean
 * Purpose: similar to useToggle but returns an API object helpful for readability
 */
export function useBoolean(initial = false) {
  const [value, setValue] = useState<boolean>(initial)
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue(v => !v), [])
  return { value, setTrue, setFalse, toggle } as const
}
