import { useEffect, useRef } from 'react'

/**
 * useBroadcastChannel
 * Provides a thin wrapper around BroadcastChannel for messaging between tabs.
 */
export function useBroadcastChannel(name: string) {
  const bcRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return
    bcRef.current = new BroadcastChannel(name)
    return () => bcRef.current?.close()
  }, [name])

  const post = (msg: unknown) => bcRef.current?.postMessage(msg)
  const subscribe = (handler: (msg: MessageEvent) => void) => {
    const ch = bcRef.current
    if (!ch) return () => {}
    ch.addEventListener('message', handler)
    return () => ch.removeEventListener('message', handler)
  }

  return { post, subscribe, channel: bcRef } as const
}
