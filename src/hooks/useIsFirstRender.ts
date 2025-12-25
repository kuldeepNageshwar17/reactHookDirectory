import { useEffect, useState } from 'react'

/**
 * useIsFirstRender
 * Returns true for the first render, false afterwards. Uses state to avoid ref reads during render.
 */
export function useIsFirstRender() {
  const [first, setFirst] = useState(true)
  useEffect(() => { const id = setTimeout(() => setFirst(false), 0); return () => clearTimeout(id) }, [])
  return first
}
