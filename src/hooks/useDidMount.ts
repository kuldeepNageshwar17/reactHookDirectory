import { useEffect, useRef } from 'react'

/**
 * useDidMount
 * Run a callback once after the component mounts. Uses a ref to avoid effect deps warnings.
 */
export function useDidMount(fn: () => void) {
  const saved = useRef(fn)
  useEffect(() => { saved.current = fn }, [fn])
  useEffect(() => { saved.current() }, [])
}
