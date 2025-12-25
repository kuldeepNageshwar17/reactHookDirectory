import { useEffect } from 'react'

/**
 * useUnmount
 * Run a cleanup callback when the component unmounts.
 */
export function useUnmount(fn: () => void) {
  useEffect(() => () => fn(), [fn])
}
