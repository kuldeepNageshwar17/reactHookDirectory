import { useCallback, useEffect, useRef, useState } from 'react'

export type GeoPosition = {
  latitude: number
  longitude: number
  accuracy?: number
}

/**
 * useGeolocation
 * Returns { position, error, watching, start, stop }
 */
export function useGeolocation(options?: PositionOptions) {
  const [position, setPosition] = useState<GeoPosition | null>(null)
  const [error, setError] = useState<GeolocationPositionError | null>(null)
  const watchId = useRef<number | null>(null)
  const [watching, setWatching] = useState(false)

  const start = useCallback(() => {
    if (!('geolocation' in navigator)) return
    if (watchId.current != null) return
    watchId.current = navigator.geolocation.watchPosition(
      pos => setPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      err => setError(err),
      options,
    )
    setWatching(true)
  }, [options])

  const stop = useCallback(() => {
    if (watchId.current != null) {
      navigator.geolocation.clearWatch(watchId.current)
      watchId.current = null
    }
    setWatching(false)
  }, [])

  useEffect(() => {
    // auto start once mounted - defer to avoid sync setState in effect
    const id = setTimeout(() => start(), 0)
    return () => { clearTimeout(id); stop() }
  }, [start, stop])

  return { position, error, watching, start, stop } as const
}
