// Central index of hooks grouped for the docs sidebar.
// Each entry imports the hook source via Vite raw import so the docs can show implementation.

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

export type HookDoc = {
  id: string
  name: string
  description: string
  source: string
  // optional metadata for docs UI
  summary?: string
  signature?: string
  params?: { name: string; type?: string; default?: string; desc?: string }[]
  returns?: string
  motivation?: string
  behaviour?: string
  edgeCases?: string
  performance?: string
  testing?: string
  tsTips?: string
  accessibility?: string
  related?: string[]
  links?: { label?: string; url: string }[]
}

export const HOOK_GROUPS: { title: string; hooks: HookDoc[] }[] = [
  {
    title: 'Core',
    hooks: [
      {
        id: 'useLocalStorage',
        name: 'useLocalStorage',
        description: 'Persistent state via localStorage (SSR-safe).',
        source: useLocalStorageSrc,
        summary: 'Persist React state to localStorage with SSR-safety.',
        signature: 'useLocalStorage<T>(key: string, initialValue: T): [T, (v: T) => void, () => void]',
        motivation: 'Keep state in sync with localStorage so users keep settings between sessions.',
        behaviour: 'Initialises state from localStorage if present; writes updates to localStorage and keeps a stable API across SSR by guarding window access.',
        edgeCases: 'Handles JSON parse errors and missing keys; beware of quota errors in browsers with limited storage.',
        performance: 'Writes are synchronous to localStorage — avoid writing very frequently (debounce if needed).',
        testing: 'Mock localStorage in tests; ensure initial value and updates persist as expected.',
        tsTips: 'Use a generic type parameter to keep TS types for stored values.',
        accessibility: 'No direct accessibility concerns; ensure stored preferences do not hide essential UI without a clear toggle.',
        links: [{ label: 'localStorage MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage' }]
      },
      { id: 'useSessionStorage', name: 'useSessionStorage', description: 'Persistent state via sessionStorage.', source: useSessionStorageSrc, summary: 'Persist state to sessionStorage', signature: 'useSessionStorage<T>(key: string, initialValue: T): [T, (v: T) => void, () => void]' },
      { id: 'useClipboard', name: 'useClipboard', description: 'Copy/paste helper using the Clipboard API.', source: useClipboardSrc, summary: 'Copy text to clipboard safely', signature: 'useClipboard(): { copy: (text: string) => Promise<void>, supported: boolean }' },
  { id: 'useDebounce', name: 'useDebounce', description: 'Debounce a value or callback.', source: useDebounceSrc, summary: 'Debounce value or callback to reduce update frequency', signature: 'useDebounce<T>(value: T, wait?: number): T', motivation: 'Reduce frequent updates (e.g., input events) to improve performance and avoid excessive side-effects.', behaviour: 'Returns a debounced snapshot of a value; for callbacks it returns a stable, debounced function reference.', edgeCases: 'Beware of stale closures when debouncing callbacks — prefer refs for latest values.', performance: 'Debouncing reduces CPU for hot events; choose a delay appropriate to UX.', testing: 'Use fake timers to test debounce behaviour.', tsTips: 'Declare generic parameter for value type to retain typing.' },
      { id: 'useThrottle', name: 'useThrottle', description: 'Throttle a value or callback.', source: useThrottleSrc, summary: 'Throttle updates to at most once per interval', signature: 'useThrottle<T>(value: T, limit?: number): T' },
      { id: 'useInterval', name: 'useInterval', description: 'Declarative setInterval hook.', source: useIntervalSrc, summary: 'Run a callback on an interval with stable ref', signature: 'useInterval(cb: () => void, delay?: number, immediate?: boolean): void' },
      { id: 'useTimeout', name: 'useTimeout', description: 'Declarative setTimeout hook.', source: useTimeoutSrc, summary: 'Run a callback once after a delay', signature: 'useTimeout(cb: () => void, delay?: number): void' },
      { id: 'usePrevious', name: 'usePrevious', description: 'Get previous value of a prop or state.', source: usePreviousSrc, summary: 'Return previous render value', signature: 'usePrevious<T>(value: T): T | undefined' },
      { id: 'useToggle', name: 'useToggle', description: 'Toggle boolean state.', source: useToggleSrc, summary: 'Boolean toggle helper', signature: 'useToggle(initial?: boolean): [boolean, () => void, (v: boolean) => void]' },
      { id: 'useBoolean', name: 'useBoolean', description: 'Boolean helpers (setTrue, setFalse).', source: useBooleanSrc }
    ]
  },
  {
    title: 'Data & Async',
    hooks: [
  
  
  // polished advanced metadata for useFetch
  {
    id: 'useFetch',
    name: 'useFetch',
    description: 'Typed fetch with loading/error and abort support.',
    source: useFetchSrc,
    summary: 'Fetch JSON with loading/error state and abort on unmount',
    signature: 'useFetch<T>(url: string, options?: RequestInit): { data?: T, error?: any, loading: boolean, refetch: () => void }',
    motivation: 'Provide a small, typesafe hook for fetching JSON resources that integrates with React lifecycles.',
    behaviour: 'Starts fetch on mount or when url changes, exposes loading/error/data and a refetch function. Uses AbortController to cancel on unmount.',
    edgeCases: 'Handle non-JSON responses, network errors, and race conditions when urls change quickly.',
    performance: 'Should be used sparingly for frequent polling; prefer pagination or caching for large datasets.',
    testing: 'Mock fetch or use msw to verify response and error paths; assert abort behavior.',
    tsTips: 'Provide the expected response type as generic to get typed data.',
    links: [{ label: 'Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API' }]
  },
  { id: 'useFetchWithRetry', name: 'useFetchWithRetry', description: 'Fetch with retries and backoff.', source: useFetchWithRetrySrc, summary: 'Retry failed fetch requests with backoff', signature: 'useFetchWithRetry<T>(url: string, options?: RequestInit, retries?: number, delay?: number): { data?: T, error?: any, loading: boolean }' },
  { id: 'useAbortableFetch', name: 'useAbortableFetch', description: 'Expose AbortController for fetches.', source: useAbortableFetchSrc, summary: 'Manual fetch with abort controls', signature: 'useAbortableFetch(): { fetch: Function, abort: () => void }' },
  { id: 'usePolling', name: 'usePolling', description: 'Polling helper for repeated fetches.', source: usePollingSrc, summary: 'Poll an async function at an interval', signature: 'usePolling(fn: () => Promise<any>, interval: number): void' },
  { id: 'useInfiniteScroll', name: 'useInfiniteScroll', description: 'Infinite scroll helper for lists.', source: useInfiniteScrollSrc, summary: 'Infinite loading helper using IntersectionObserver', signature: 'useInfiniteScroll(loader: () => void): { sentinelRef: RefObject<HTMLElement> }' },
  { id: 'usePaginatedFetch', name: 'usePaginatedFetch', description: 'Helper for paginated API fetching.', source: usePaginatedFetchSrc, summary: 'Simple pagination helper', signature: 'usePaginatedFetch(baseUrl: string, pageSize?: number)' }
    ]
  },
  {
    title: 'Browser & DOM',
    hooks: [
      { id: 'useClickOutside', name: 'useClickOutside', description: 'Detect outside clicks for a node.', source: useClickOutsideSrc, summary: 'Call handler when clicks occur outside a ref', signature: 'useClickOutside(ref: RefObject<HTMLElement>, handler: (e: Event) => void): void' },
      { id: 'useScrollPosition', name: 'useScrollPosition', description: 'Read scroll position with throttling.', source: useScrollPositionSrc, summary: 'Track scroll X/Y with optional throttle', signature: 'useScrollPosition(throttle?: number): { x: number, y: number }' },
      { id: 'useMediaQuery', name: 'useMediaQuery', description: 'Match media queries (SSR-safe).', source: useMediaQuerySrc, summary: 'Reactive media query match', signature: 'useMediaQuery(query: string): boolean' },
      { id: 'useKeyPress', name: 'useKeyPress', description: 'Detect key presses globally.', source: useKeyPressSrc, summary: 'Return true when a key is pressed', signature: 'useKeyPress(key: string | string[]): boolean' },
      { id: 'useEventListener', name: 'useEventListener', description: 'Add/remove event listeners safely.', source: useEventListenerSrc, summary: 'Stable event listener that keeps latest handler ref', signature: 'useEventListener(event: string, handler: Function, element?: EventTarget): void' },
      { id: 'useWindowSize', name: 'useWindowSize', description: 'Track window width/height.', source: useWindowSizeSrc, summary: 'Reactive window width/height', signature: 'useWindowSize(): { width: number, height: number }' },
      { id: 'useElementSize', name: 'useElementSize', description: 'Track element size via ResizeObserver.', source: useElementSizeSrc, summary: 'ResizeObserver-based element size tracker', signature: 'useElementSize(): { ref: RefObject<HTMLElement>, size: { width:number, height:number } }' },
      { id: 'useIntersectionObserver', name: 'useIntersectionObserver', description: 'IntersectionObserver for element visibility.', source: useIntersectionObserverSrc, summary: 'Observe element intersection entries', signature: 'useIntersectionObserver(options?: IntersectionObserverInit): { observe: (el: Element) => void, entries: IntersectionObserverEntry[] }' },
      {
        id: 'useIntersectionObserver',
        name: 'useIntersectionObserver',
        description: 'IntersectionObserver for element visibility.',
        source: useIntersectionObserverSrc,
        summary: 'Observe element intersection entries',
        signature: 'useIntersectionObserver(options?: IntersectionObserverInit): { observe: (el: Element) => void, entries: IntersectionObserverEntry[] }',
        motivation: 'Detect element visibility or when items enter/leave the viewport for lazy loading or analytics.',
        behaviour: 'Wraps IntersectionObserver, exposes entries and an observe function; unobserves on cleanup.',
        edgeCases: 'Be careful with root margins and thresholds; test in different layout scenarios and SSR where window is undefined.',
        performance: 'IntersectionObserver is efficient compared to scroll listeners but avoid observing many nodes without virtualization.',
        testing: 'Simulate intersections in tests or use a real browser environment for accurate behavior.',
        tsTips: 'Provide correct IntersectionObserverInit types for predictable behavior.',
        links: [{ label: 'IntersectionObserver MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API' }]
      },
      { id: 'useResizeObserver', name: 'useResizeObserver', description: 'ResizeObserver wrapper.', source: useResizeObserverSrc, summary: 'Observe element resize events', signature: 'useResizeObserver(): { observe: (el: Element) => void, size: { width:number, height:number } }' }
    ]
  },
  {
    title: 'Device & Environment',
    hooks: [
      { id: 'useOnlineStatus', name: 'useOnlineStatus', description: 'Detect online/offline status.', source: useOnlineStatusSrc },
      { id: 'useGeolocation', name: 'useGeolocation', description: 'Read geolocation (permission aware).', source: useGeolocationSrc },
      { id: 'useDarkMode', name: 'useDarkMode', description: 'Manage dark/light theme with localStorage.', source: useDarkModeSrc },
      { id: 'usePreferredLanguage', name: 'usePreferredLanguage', description: 'Detect preferred language from navigator.', source: usePreferredLanguageSrc },
      { id: 'useReducedMotion', name: 'useReducedMotion', description: 'Respect reduced motion preferences.', source: useReducedMotionSrc }
    ]
  },
  {
    title: 'Lifecycle & Debug',
    hooks: [
      { id: 'useDidMount', name: 'useDidMount', description: 'Run effect only on mount.', source: useDidMountSrc },
      { id: 'useDidUpdate', name: 'useDidUpdate', description: 'Run effect on updates (not first).', source: useDidUpdateSrc },
      { id: 'useUnmount', name: 'useUnmount', description: 'Run callback on unmount.', source: useUnmountSrc },
      { id: 'useIsFirstRender', name: 'useIsFirstRender', description: 'Detect first render.', source: useIsFirstRenderSrc },
      { id: 'useWhyDidYouUpdate', name: 'useWhyDidYouUpdate', description: 'Help debug prop changes.', source: useWhyDidYouUpdateSrc },
      { id: 'useRenderCount', name: 'useRenderCount', description: 'Count renders for a component.', source: useRenderCountSrc }
    ]
  },
  {
    title: 'Advanced',
    hooks: [
      { id: 'useWebSocket', name: 'useWebSocket', description: 'Manage WebSocket connection with reconnection.', source: useWebSocketSrc },
      { id: 'useWorker', name: 'useWorker', description: 'Spawn inline web workers easily.', source: useWorkerSrc },
      { id: 'useBroadcastChannel', name: 'useBroadcastChannel', description: 'BroadcastChannel helper for cross-tab comms.', source: useBroadcastChannelSrc },
      {
        id: 'useVirtualList',
        name: 'useVirtualList',
        description: 'Virtualize long lists for performance.',
        source: useVirtualListSrc,
        summary: 'Only render visible windowed rows for large lists to improve rendering performance',
        signature: 'useVirtualList<T>(items: T[], renderAhead?: number): { containerRef: RefObject<HTMLElement>, visibleItems: T[] }',
        motivation: 'Render only what is visible when dealing with very large lists to keep DOM size small and fast.',
        behaviour: 'Measures container size and item heights to compute a visible window; updates on scroll and resize.',
        edgeCases: 'Variable-height items need careful measurement; ensure correct keying and placeholder space to avoid layout shifts.',
        performance: 'Dramatically reduces DOM nodes and repaint cost for large lists; test memory and reflow behavior.',
        testing: 'Use integration tests to ensure virtualization shows expected items at different scroll positions.',
        tsTips: 'Generics help preserve item typing through the hook.',
        links: [{ label: 'Virtualization patterns', url: 'https://web.dev/virtualize-long-lists/' }]
      }
    ]
  }
]

export default HOOK_GROUPS
