import { useEffect, useRef } from 'react'

/**
 * useWhyDidYouUpdate
 * Logs prop differences between renders to help debugging.
 */
export function useWhyDidYouUpdate(name: string, props: Record<string, unknown>) {
  const prev = useRef<Record<string, unknown> | null>(null)
  useEffect(() => {
    if (prev.current == null) { prev.current = props; return }
    const changed: Record<string, { from: unknown; to: unknown }> = {}
    for (const key of Object.keys({ ...prev.current, ...props })) {
      if (prev.current[key] !== props[key]) changed[key] = { from: prev.current[key], to: props[key] }
    }
    if (Object.keys(changed).length) {
      console.log('[why-did-you-update]', name, changed)
    }
    prev.current = props
  }, [name, props])
}
