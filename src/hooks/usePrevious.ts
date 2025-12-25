import { useEffect, useRef, useState } from 'react'

/**
 * usePrevious
 * Returns the value from the previous render. Safe for React rules.
 */
export function usePrevious<T>(value: T) {
  const curRef = useRef<T | undefined>(undefined)
  const [prev, setPrev] = useState<T | undefined>(undefined)

  useEffect(() => {
    setPrev(curRef.current)
    curRef.current = value
  }, [value])

  return prev
}
