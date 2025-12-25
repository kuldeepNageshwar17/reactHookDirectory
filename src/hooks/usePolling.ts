import { useEffect, useRef } from 'react'

/**
 * usePolling
 * Calls an async function at an interval. Keeps latest callback via ref.
 * Returns stop function through cleanup automatic on unmount.
 */
export function usePolling(fn: () => Promise<void> | void, interval: number | null) {
  const saved = useRef(fn)
  useEffect(() => { saved.current = fn }, [fn])

  useEffect(() => {
    if (interval == null) return
    let mounted = true
    const tick = async () => { if (!mounted) return; await saved.current() }
    const id = setInterval(tick, interval)
    return () => { mounted = false; clearInterval(id) }
  }, [interval])
}
