import { useEffect, useRef } from 'react'

/**
 * useDidUpdate
 * Runs callback when dependencies change but not on first render.
 */
export function useDidUpdate(fn: () => void | (() => void), deps: readonly unknown[]) {
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    const cleanup = fn()
    return typeof cleanup === 'function' ? cleanup : undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
