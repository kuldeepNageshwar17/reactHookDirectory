import { useCallback, useEffect, useRef, useState } from 'react'

type ReadyState = number

/**
 * useWebSocket
 * Lightweight WebSocket hook that manages connection, messages and send.
 */
export function useWebSocket(url: string, protocols?: string | string[]) {
  const wsRef = useRef<WebSocket | null>(null)
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null)
  const [readyState, setReadyState] = useState<ReadyState>(WebSocket.CONNECTING)

  const connect = useCallback(() => {
    wsRef.current?.close()
    const ws = new WebSocket(url, protocols)
    wsRef.current = ws
    setReadyState(ws.readyState)
    ws.onopen = () => setReadyState(ws.readyState)
    ws.onclose = () => setReadyState(ws.readyState)
    ws.onerror = () => setReadyState(ws.readyState)
    ws.onmessage = (m) => setLastMessage(m)
  }, [url, protocols])

  const send = useCallback((data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) wsRef.current.send(data)
  }, [])

  const disconnect = useCallback(() => { wsRef.current?.close() }, [])

  useEffect(() => { const id = setTimeout(() => connect(), 0); return () => { clearTimeout(id); disconnect() } }, [connect, disconnect])

  return { send, lastMessage, readyState, connect, disconnect } as const
}
