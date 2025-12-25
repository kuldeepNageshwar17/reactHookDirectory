import { useMemo, useState } from 'react'
import type { FC } from 'react'

// Import hook sources as raw text (Vite raw import)
import useLocalStorageSrc from '../hooks/useLocalStorage.ts?raw'
import useSessionStorageSrc from '../hooks/useSessionStorage.ts?raw'
import useClipboardSrc from '../hooks/useClipboard.ts?raw'
import useDebounceSrc from '../hooks/useDebounce.ts?raw'
import useThrottleSrc from '../hooks/useThrottle.ts?raw'
import useIntervalSrc from '../hooks/useInterval.ts?raw'
import useTimeoutSrc from '../hooks/useTimeout.ts?raw'
import usePreviousSrc from '../hooks/usePrevious.ts?raw'
import useToggleSrc from '../hooks/useToggle.ts?raw'
import useBooleanSrc from '../hooks/useBoolean.ts?raw'

import useFetchSrc from '../hooks/useFetch.ts?raw'
import useFetchWithRetrySrc from '../hooks/useFetchWithRetry.ts?raw'
import useAbortableFetchSrc from '../hooks/useAbortableFetch.ts?raw'
import usePollingSrc from '../hooks/usePolling.ts?raw'
import useInfiniteScrollSrc from '../hooks/useInfiniteScroll.ts?raw'
import usePaginatedFetchSrc from '../hooks/usePaginatedFetch.ts?raw'

import useClickOutsideSrc from '../hooks/useClickOutside.ts?raw'
import useScrollPositionSrc from '../hooks/useScrollPosition.ts?raw'
import useMediaQuerySrc from '../hooks/useMediaQuery.ts?raw'
import useKeyPressSrc from '../hooks/useKeyPress.ts?raw'
import useEventListenerSrc from '../hooks/useEventListener.ts?raw'
import useWindowSizeSrc from '../hooks/useWindowSize.ts?raw'
import useElementSizeSrc from '../hooks/useElementSize.ts?raw'
import useIntersectionObserverSrc from '../hooks/useIntersectionObserver.ts?raw'
import useResizeObserverSrc from '../hooks/useResizeObserver.ts?raw'

import useOnlineStatusSrc from '../hooks/useOnlineStatus.ts?raw'
import useGeolocationSrc from '../hooks/useGeolocation.ts?raw'
import useDarkModeSrc from '../hooks/useDarkMode.ts?raw'
import usePreferredLanguageSrc from '../hooks/usePreferredLanguage.ts?raw'
import useReducedMotionSrc from '../hooks/useReducedMotion.ts?raw'

import useDidMountSrc from '../hooks/useDidMount.ts?raw'
import useDidUpdateSrc from '../hooks/useDidUpdate.ts?raw'
import useUnmountSrc from '../hooks/useUnmount.ts?raw'
import useIsFirstRenderSrc from '../hooks/useIsFirstRender.ts?raw'
import useWhyDidYouUpdateSrc from '../hooks/useWhyDidYouUpdate.ts?raw'
import useRenderCountSrc from '../hooks/useRenderCount.ts?raw'

import useWebSocketSrc from '../hooks/useWebSocket.ts?raw'
import useWorkerSrc from '../hooks/useWorker.ts?raw'
import useBroadcastChannelSrc from '../hooks/useBroadcastChannel.ts?raw'
import useVirtualListSrc from '../hooks/useVirtualList.ts?raw'

type HookItem = {
  id: string
  name: string
  description: string
  source: string
}

const ALL_HOOKS: HookItem[] = [
  { id: 'useLocalStorage', name: 'useLocalStorage', description: 'Persistent state via localStorage (SSR-safe).', source: useLocalStorageSrc },
  { id: 'useSessionStorage', name: 'useSessionStorage', description: 'Persistent state via sessionStorage.', source: useSessionStorageSrc },
  { id: 'useClipboard', name: 'useClipboard', description: 'Copy/paste helper using the Clipboard API.', source: useClipboardSrc },
  { id: 'useDebounce', name: 'useDebounce', description: 'Debounce a value or callback.', source: useDebounceSrc },
  { id: 'useThrottle', name: 'useThrottle', description: 'Throttle a value or callback.', source: useThrottleSrc },
  { id: 'useInterval', name: 'useInterval', description: 'Declarative setInterval hook.', source: useIntervalSrc },
  { id: 'useTimeout', name: 'useTimeout', description: 'Declarative setTimeout hook.', source: useTimeoutSrc },
  { id: 'usePrevious', name: 'usePrevious', description: 'Get previous value of a prop or state.', source: usePreviousSrc },
  { id: 'useToggle', name: 'useToggle', description: 'Toggle boolean state.', source: useToggleSrc },
  { id: 'useBoolean', name: 'useBoolean', description: 'Boolean helpers (setTrue, setFalse).', source: useBooleanSrc },

  { id: 'useFetch', name: 'useFetch', description: 'Small typed fetch hook with abort support.', source: useFetchSrc },
  { id: 'useFetchWithRetry', name: 'useFetchWithRetry', description: 'Fetch with retry/backoff.', source: useFetchWithRetrySrc },
  { id: 'useAbortableFetch', name: 'useAbortableFetch', description: 'Fetch that exposes AbortController to caller.', source: useAbortableFetchSrc },
  { id: 'usePolling', name: 'usePolling', description: 'Polling helper for repeated fetches.', source: usePollingSrc },
  { id: 'useInfiniteScroll', name: 'useInfiniteScroll', description: 'Infinite scroll helper for lists.', source: useInfiniteScrollSrc },
  { id: 'usePaginatedFetch', name: 'usePaginatedFetch', description: 'Helper for paginated API fetching.', source: usePaginatedFetchSrc },

  { id: 'useClickOutside', name: 'useClickOutside', description: 'Detect outside clicks for a node.', source: useClickOutsideSrc },
  { id: 'useScrollPosition', name: 'useScrollPosition', description: 'Read scroll position with throttling.', source: useScrollPositionSrc },
  { id: 'useMediaQuery', name: 'useMediaQuery', description: 'Match media queries (SSR-safe).', source: useMediaQuerySrc },
  { id: 'useKeyPress', name: 'useKeyPress', description: 'Detect key presses globally.', source: useKeyPressSrc },
  { id: 'useEventListener', name: 'useEventListener', description: 'Add/remove event listeners safely.', source: useEventListenerSrc },
  { id: 'useWindowSize', name: 'useWindowSize', description: 'Track window width/height.', source: useWindowSizeSrc },
  { id: 'useElementSize', name: 'useElementSize', description: 'Track element size via ResizeObserver.', source: useElementSizeSrc },
  { id: 'useIntersectionObserver', name: 'useIntersectionObserver', description: 'IntersectionObserver for element visibility.', source: useIntersectionObserverSrc },
  { id: 'useResizeObserver', name: 'useResizeObserver', description: 'ResizeObserver wrapper.', source: useResizeObserverSrc },

  { id: 'useOnlineStatus', name: 'useOnlineStatus', description: 'Detect online/offline status.', source: useOnlineStatusSrc },
  { id: 'useGeolocation', name: 'useGeolocation', description: 'Read geolocation (permission aware).', source: useGeolocationSrc },
  { id: 'useDarkMode', name: 'useDarkMode', description: 'Manage dark/light theme with localStorage.', source: useDarkModeSrc },
  { id: 'usePreferredLanguage', name: 'usePreferredLanguage', description: 'Detect preferred language from navigator.', source: usePreferredLanguageSrc },
  { id: 'useReducedMotion', name: 'useReducedMotion', description: 'Respect reduced motion preferences.', source: useReducedMotionSrc },

  { id: 'useDidMount', name: 'useDidMount', description: 'Run effect only on mount.', source: useDidMountSrc },
  { id: 'useDidUpdate', name: 'useDidUpdate', description: 'Run effect on updates (not first).', source: useDidUpdateSrc },
  { id: 'useUnmount', name: 'useUnmount', description: 'Run callback on unmount.', source: useUnmountSrc },
  { id: 'useIsFirstRender', name: 'useIsFirstRender', description: 'Detect first render.', source: useIsFirstRenderSrc },
  { id: 'useWhyDidYouUpdate', name: 'useWhyDidYouUpdate', description: 'Help debug prop changes.', source: useWhyDidYouUpdateSrc },
  { id: 'useRenderCount', name: 'useRenderCount', description: 'Count renders for a component.', source: useRenderCountSrc },

  { id: 'useWebSocket', name: 'useWebSocket', description: 'Manage WebSocket connection with reconnection.', source: useWebSocketSrc },
  { id: 'useWorker', name: 'useWorker', description: 'Spawn inline web workers easily.', source: useWorkerSrc },
  { id: 'useBroadcastChannel', name: 'useBroadcastChannel', description: 'BroadcastChannel helper for cross-tab comms.', source: useBroadcastChannelSrc },
  { id: 'useVirtualList', name: 'useVirtualList', description: 'Virtualize long lists for performance.', source: useVirtualListSrc }
]

const PAGE_SIZE_OPTIONS = [6, 9, 12]

const Showcase: FC = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0])
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const total = ALL_HOOKS.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return ALL_HOOKS.slice(start, start + pageSize)
  }, [page, pageSize])

  function toggle(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Hooks Showcase</h2>
      <p style={{ color: '#666' }}>Browse all hooks. Click "View Source" to inspect the implementation.</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <label style={{ marginRight: 8 }}>Per page</label>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}>
            {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
          <span style={{ margin: '0 8px' }}>{page} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {pageItems.map(item => (
          <div key={item.id} style={{ border: '1px solid #e6e6e6', borderRadius: 8, padding: 12, background: '#fff' }}>
            <h3 style={{ margin: '0 0 8px' }}>{item.name}</h3>
            <p style={{ margin: '0 0 12px', color: '#555' }}>{item.description}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => toggle(item.id)}>{expanded[item.id] ? 'Hide Source' : 'View Source'}</button>
            </div>
            {expanded[item.id] && (
              <pre style={{ marginTop: 12, maxHeight: 360, overflow: 'auto', background: '#f7f7f8', padding: 12, borderRadius: 6 }}>
                <code>{item.source}</code>
              </pre>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 8 }}>
        <button onClick={() => setPage(1)} disabled={page === 1}>First</button>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <span style={{ alignSelf: 'center' }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
        <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last</button>
      </div>
    </div>
  )
}

export default Showcase
