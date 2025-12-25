import { useState } from 'react'
import { useDebounce } from '../../index'

export const codeString = `function DebouncedInput() {
  const [value, setValue] = useState('')
  const debounced = useDebounce(value, 500)
  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <div>Debounced: {debounced}</div>
    </div>
  )
}`

export default function UseDebounceExample() {
  const [value, setValue] = useState('')
  const debounced = useDebounce(value, 600)
  return (
    <div>
      <div style={{ marginBottom: 8 }}>useDebounce demo — delay updates</div>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="type quickly" />
      <div style={{ marginTop: 8 }}>debounced: <strong>{debounced}</strong></div>
    </div>
  )
}
