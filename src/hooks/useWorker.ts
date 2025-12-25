import { useCallback, useEffect, useRef } from 'react'

/**
 * useWorker
 * Create a worker from a URL or function. If `script` is a function, it will be blobified.
 */
export function useWorker(script: string | ((self: unknown) => void)) {
  const workerRef = useRef<Worker | null>(null)
  const urlRef = useRef<string | null>(null)

  useEffect(() => {
    let created = false
    if (typeof script === 'function') {
      const body = `(${script.toString()})(self)`
      const blob = new Blob([body], { type: 'application/javascript' })
      const url = URL.createObjectURL(blob)
      urlRef.current = url
      workerRef.current = new Worker(url)
      created = true
    } else {
      workerRef.current = new Worker(script)
    }
    return () => {
      workerRef.current?.terminate()
      if (created && urlRef.current) {
        URL.revokeObjectURL(urlRef.current)
        urlRef.current = null
      }
    }
  }, [script])

  const post = useCallback((msg: unknown) => workerRef.current?.postMessage(msg), [])
  const terminate = useCallback(() => workerRef.current?.terminate(), [])
  return { workerRef, post, terminate } as const
}
