import { useEffect, useRef } from 'react'

/**
 * useInterval
 * Purpose: run a callback repeatedly at the provided delay. Uses refs to keep latest callback.
 * Params: callback, delay, options { immediate }
 */
export function useInterval(cb: () => void, delay: number | null, immediate = false) {
  const saved = useRef(cb)

  // update saved callback in effect to avoid changing interval when cb changes
  useEffect(() => { saved.current = cb }, [cb])

  useEffect(() => {
    if (delay == null) return
    if (immediate) saved.current()
    const id = setInterval(() => saved.current(), delay)
    return () => clearInterval(id)
  }, [delay, immediate])
}
