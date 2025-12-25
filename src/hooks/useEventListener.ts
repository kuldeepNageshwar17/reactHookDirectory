import { useEffect, useRef } from 'react'

/**
 * useEventListener
 * Attaches an event listener to a target (window, document, element) and updates when handler changes.
 */
export function useEventListener<K extends keyof GlobalEventHandlersEventMap>(
  eventName: K,
  handler: (evt: GlobalEventHandlersEventMap[K]) => void,
  element: EventTarget | null = typeof window !== 'undefined' ? window : null,
) {
  const saved = useRef(handler)
  useEffect(() => { saved.current = handler }, [handler])

  useEffect(() => {
    if (!element || !element.addEventListener) return
    const listener = (e: Event) => saved.current(e as unknown as GlobalEventHandlersEventMap[K])
    element.addEventListener(eventName as string, listener)
    return () => element.removeEventListener(eventName as string, listener)
  }, [eventName, element])
}
