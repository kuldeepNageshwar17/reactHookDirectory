import { useRef, useState } from 'react'
import { useClickOutside } from '../../index'

export const codeString = `function ClickOutsideDropdown() {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  useClickOutside(ref, () => setOpen(false))
  return (
    <div ref={ref}>
      <button onClick={() => setOpen(o => !o)}>toggle</button>
      {open && <div className="panel">I close on outside click</div>}
    </div>
  )
}`

export default function UseClickOutsideExample() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  useClickOutside(ref, () => setOpen(false))

  return (
    <div>
      <div style={{ marginBottom: 8 }}>useClickOutside demo — dropdown</div>
      <div ref={ref} style={{ display: 'inline-block', position: 'relative' }}>
        <button onClick={() => setOpen(o => !o)}>Toggle</button>
        {open && (
          <div style={{ position: 'absolute', top: '100%', left: 0, border: '1px solid #ddd', background: 'white', padding: 8 }}>
            I close on outside click
          </div>
        )}
      </div>
    </div>
  )
}
