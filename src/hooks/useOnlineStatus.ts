import { useEffect, useState } from 'react'

/**
 * useOnlineStatus
 * Returns whether the browser is online. Listens to online/offline events.
 */
export function useOnlineStatus() {
  const isClient = typeof navigator !== 'undefined' && 'onLine' in navigator
  const [online, setOnline] = useState(() => (isClient ? navigator.onLine : true))

  useEffect(() => {
    if (!isClient) return
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => { window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline) }
  }, [isClient])

  return online
}
