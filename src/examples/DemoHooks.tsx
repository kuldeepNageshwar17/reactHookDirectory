import React, { useState } from 'react'
import UseLocalStorageExample, { codeString as localCode } from './hooks/UseLocalStorageExample'
import UseDebounceExample, { codeString as debounceCode } from './hooks/UseDebounceExample'
import UseFetchExample, { codeString as fetchCode } from './hooks/UseFetchExample'
import UseClickOutsideExample, { codeString as clickOutsideCode } from './hooks/UseClickOutsideExample'
import UseDarkModeExample, { codeString as darkCode } from './hooks/UseDarkModeExample'

function ExampleCard({ title, children, code }: { title: string; children: React.ReactNode; code: string }) {
  const [show, setShow] = useState(false)
  const copy = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) await navigator.clipboard.writeText(code)
  }
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6, marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShow(s => !s)}>{show ? 'Hide Code' : 'Show Code'}</button>
          <button onClick={copy}>Copy Code</button>
        </div>
      </div>
      <div style={{ marginTop: 8 }}>{children}</div>
      {show && (
        <pre className="codeBlock" style={{ marginTop: 8 }}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}

export default function DemoHooks() {
  return (
    <div style={{ maxWidth: 900, margin: '16px auto', padding: 12 }}>
      <h1>Examples — 5 Hooks Showcase</h1>
      <p>Each card contains a live demo and a <strong>Show Code</strong> toggle to reveal the usage.</p>

      <ExampleCard title="useLocalStorage" code={localCode}>
        <UseLocalStorageExample />
      </ExampleCard>

      <ExampleCard title="useDebounce" code={debounceCode}>
        <UseDebounceExample />
      </ExampleCard>

      <ExampleCard title="useFetch" code={fetchCode}>
        <UseFetchExample />
      </ExampleCard>

      <ExampleCard title="useClickOutside" code={clickOutsideCode}>
        <UseClickOutsideExample />
      </ExampleCard>

      <ExampleCard title="useDarkMode" code={darkCode}>
        <UseDarkModeExample />
      </ExampleCard>
    </div>
  )
}
