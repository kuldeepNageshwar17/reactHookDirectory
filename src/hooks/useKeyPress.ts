import { useEffect, useState } from 'react'

/**
 * useKeyPress
 * Returns boolean pressed for provided key (string or array of keys)
 */
export function useKeyPress(targetKey: string | string[]) {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const ks = Array.isArray(targetKey) ? targetKey : [targetKey]
    const onDown = (e: KeyboardEvent) => { if (ks.includes(e.key)) setPressed(true) }
    const onUp = (e: KeyboardEvent) => { if (ks.includes(e.key)) setPressed(false) }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp) }
  }, [targetKey])

  return pressed
}
