import React, { useState } from 'react'

// Import raw source for hooks using Vite's ?raw loader so code is visible in the browser.
import useLocalStorageSrc from '../hooks/useLocalStorage.ts?raw'
import useDebounceSrc from '../hooks/useDebounce.ts?raw'
import useFetchSrc from '../hooks/useFetch.ts?raw'
import useClickOutsideSrc from '../hooks/useClickOutside.ts?raw'
import useDarkModeSrc from '../hooks/useDarkMode.ts?raw'

// For remaining hooks we'll import raw as needed (examples only show five in detail)
import useThrottleSrc from '../hooks/useThrottle.ts?raw'
import useIntervalSrc from '../hooks/useInterval.ts?raw'
import useTimeoutSrc from '../hooks/useTimeout.ts?raw'
import usePreviousSrc from '../hooks/usePrevious.ts?raw'
import useToggleSrc from '../hooks/useToggle.ts?raw'

import UseLocalStorageExample, { codeString as localCode } from './hooks/UseLocalStorageExample'
import UseDebounceExample, { codeString as debounceCode } from './hooks/UseDebounceExample'
import UseFetchExample, { codeString as fetchCode } from './hooks/UseFetchExample'
import UseClickOutsideExample, { codeString as clickCode } from './hooks/UseClickOutsideExample'
import UseDarkModeExample, { codeString as darkCode } from './hooks/UseDarkModeExample'

type HookEntry = {
  name: string
  description: string
  source: string
  example?: { Comp: React.FC; code: string }
}

const hooks: HookEntry[] = [
  { name: 'useLocalStorage', description: 'Persist state to localStorage with SSR-safety.', source: useLocalStorageSrc, example: { Comp: UseLocalStorageExample, code: localCode } },
  { name: 'useDebounce', description: 'Debounce a value to avoid rapid updates.', source: useDebounceSrc, example: { Comp: UseDebounceExample, code: debounceCode } },
  { name: 'useFetch', description: 'Fetch JSON and manage loading/error state. Aborts on unmount.', source: useFetchSrc, example: { Comp: UseFetchExample, code: fetchCode } },
  { name: 'useClickOutside', description: 'Detect outside clicks for dropdowns/modals.', source: useClickOutsideSrc, example: { Comp: UseClickOutsideExample, code: clickCode } },
  { name: 'useDarkMode', description: 'Track OS dark mode and allow a local override.', source: useDarkModeSrc, example: { Comp: UseDarkModeExample, code: darkCode } },
  // Additional hooks (source-only entries for now)
  { name: 'useThrottle', description: 'Throttle a value so it updates at most once per interval.', source: useThrottleSrc },
  { name: 'useInterval', description: 'Run a callback repeatedly with stable reference.', source: useIntervalSrc },
  { name: 'useTimeout', description: 'Run a callback once after a delay with cleanup.', source: useTimeoutSrc },
  { name: 'usePrevious', description: 'Read the previous render value.', source: usePreviousSrc },
  { name: 'useToggle', description: 'Convenience boolean toggle hook.', source: useToggleSrc },
]

export default function Textbook() {
  const [selected, setSelected] = useState<string>(hooks[0].name)

  const current = hooks.find(h => h.name === selected) || hooks[0]

  // Categories and their hooks (complete list grouped)
  const categories: Record<string, { title: string; hooks: { name: string; description?: string }[] }> = {
    Core: {
      title: 'Core Hooks',
      hooks: [
        { name: 'useLocalStorage', description: 'Persist state to localStorage' },
        { name: 'useSessionStorage', description: 'Persist state to sessionStorage' },
        { name: 'useClipboard', description: 'Copy text to clipboard' },
        { name: 'useDebounce', description: 'Debounce a value' },
        { name: 'useThrottle', description: 'Throttle a value' },
        { name: 'useInterval', description: 'Stable interval with latest callback' },
        { name: 'useTimeout', description: 'Run callback after delay' },
        { name: 'usePrevious', description: 'Get previous render value' },
        { name: 'useToggle', description: 'Toggle boolean' },
        { name: 'useBoolean', description: 'Boolean API (setTrue/setFalse)' },
      ],
    },
    Data: {
      title: 'Data & Async',
      hooks: [
        { name: 'useFetch', description: 'Fetch JSON with state' },
        { name: 'useFetchWithRetry', description: 'Retrying fetch' },
        { name: 'useAbortableFetch', description: 'Manual fetch with abort' },
        { name: 'usePolling', description: 'Polling helper' },
        { name: 'useInfiniteScroll', description: 'Infinite loading' },
        { name: 'usePaginatedFetch', description: 'Pagination helper' },
      ],
    },
    Browser: {
      title: 'Browser & DOM',
      hooks: [
        { name: 'useClickOutside', description: 'Detect outside clicks' },
        { name: 'useScrollPosition', description: 'Track scroll position' },
        { name: 'useMediaQuery', description: 'Match media queries' },
        { name: 'useKeyPress', description: 'Key press state' },
        { name: 'useEventListener', description: 'Attach event listener' },
        { name: 'useWindowSize', description: 'Window width/height' },
        { name: 'useElementSize', description: 'Element size via ResizeObserver' },
        { name: 'useIntersectionObserver', description: 'IntersectionObserver wrapper' },
        { name: 'useResizeObserver', description: 'ResizeObserver helper' },
      ],
    },
    Device: {
      title: 'Device & Environment',
      hooks: [
        { name: 'useOnlineStatus', description: 'Online/offline state' },
        { name: 'useGeolocation', description: 'Geolocation watch' },
        { name: 'useDarkMode', description: 'Dark mode preference' },
        { name: 'usePreferredLanguage', description: 'Navigator languages' },
        { name: 'useReducedMotion', description: 'Prefers-reduced-motion' },
      ],
    },
    Lifecycle: {
      title: 'Lifecycle & Debug',
      hooks: [
        { name: 'useDidMount', description: 'Run on mount' },
        { name: 'useDidUpdate', description: 'Run on update (not first)' },
        { name: 'useUnmount', description: 'Run on unmount' },
        { name: 'useIsFirstRender', description: 'Detect first render' },
        { name: 'useWhyDidYouUpdate', description: 'Debug prop diffs' },
        { name: 'useRenderCount', description: 'Render count' },
      ],
    },
    Advanced: {
      title: 'Advanced',
      hooks: [
        { name: 'useWebSocket', description: 'WebSocket helper' },
        { name: 'useWorker', description: 'Worker creation helper' },
        { name: 'useBroadcastChannel', description: 'BroadcastChannel wrapper' },
        { name: 'useVirtualList', description: 'Virtualized list helper' },
      ],
    },
  }

  // Collapsible state for categories
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    const obj: Record<string, boolean> = {}
    for (const k of Object.keys(categories)) obj[k] = false // expanded by default
    return obj
  })

  const toggleCategory = (key: string) => setCollapsed(c => ({ ...c, [key]: !c[key] }))

  const findHook = (name: string) => hooks.find(h => h.name === name)

  return (
    <div style={{ display: 'flex', gap: 12, padding: 16, maxWidth: 1100, margin: '0 auto' }}>
      <aside style={{ width: 300, borderRight: '1px solid #eee', paddingRight: 12 }}>
        <h2>Hook Textbook</h2>
        <p style={{ fontSize: 13, color: '#555' }}>Browse hooks and view source + usage.</p>
        {Object.entries(categories).map(([key, group]) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <button onClick={() => toggleCategory(key)} style={{ width: '100%', textAlign: 'left', padding: '6px 8px', background: 'none', border: '1px solid transparent', cursor: 'pointer' }}>
              <strong>{group.title}</strong>
              <div style={{ fontSize: 12, color: '#666' }}>{group.hooks.length} hooks</div>
            </button>

            {!collapsed[key] && (
              <ul style={{ listStyle: 'none', paddingLeft: 8, marginTop: 6 }}>
                {group.hooks.map(h => (
                  <li key={h.name} style={{ marginBottom: 6 }}>
                    <button onClick={() => setSelected(h.name)} style={{ background: 'none', border: 'none', padding: 6, textAlign: 'left', width: '100%', cursor: 'pointer' }}>
                      <div style={{ fontSize: 13 }}><strong>{h.name}</strong></div>
                      <div style={{ fontSize: 11, color: '#666' }}>{h.description}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </aside>

      <main style={{ flex: 1 }}>
        <h2>{current.name}</h2>
        <p style={{ color: '#444' }}>{current.description}</p>

        {current.example && (
          <section style={{ marginBottom: 12 }}>
            <h3>Interactive example</h3>
            <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
              <current.example.Comp />
            </div>
            <details style={{ marginTop: 8 }}>
              <summary>Show example code</summary>
              <pre className="codeBlock"><code>{current.example.code}</code></pre>
            </details>
          </section>
        )}

        <section>
          <h3>Source</h3>
          <pre className="codeBlock dark">
            <code>{current.source || findHook(current.name)?.source || '// source not available in this demo'}</code>
          </pre>
        </section>
      </main>
    </div>
  )
}
