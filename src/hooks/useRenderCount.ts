import { useEffect, useState } from 'react'

/**
 * useRenderCount
 * Returns an approximate render count. Implemented with state and effect to avoid ref access during render.
 */
export function useRenderCount() {
  const [count, setCount] = useState(1)
  useEffect(() => { const id = setTimeout(() => setCount(c => c + 1), 0); return () => clearTimeout(id) })
  return count
}
