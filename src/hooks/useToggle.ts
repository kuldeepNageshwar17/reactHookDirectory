import { useCallback, useState } from 'react'

/**
 * useToggle
 * Simple toggle hook: returns [value, toggle, setOn, setOff]
 */
export function useToggle(initial = false) {
  const [state, setState] = useState<boolean>(initial)
  const toggle = useCallback(() => setState(s => !s), [])
  const setOn = useCallback(() => setState(true), [])
  const setOff = useCallback(() => setState(false), [])
  return [state, toggle, setOn, setOff] as const
}
