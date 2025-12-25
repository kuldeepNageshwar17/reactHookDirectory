import { useEffect } from 'react'
import { useDarkMode } from '../../index'

export const codeString = `function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode()
  return (
    <div>
      <div>dark? {String(isDark)}</div>
      <button onClick={() => toggle()}>toggle</button>
    </div>
  )
}`

export default function UseDarkModeExample() {
  const { isDark, toggle } = useDarkMode()

  useEffect(() => {
    // show how it sets data-theme on documentElement
  }, [isDark])

  return (
    <div>
      <div style={{ marginBottom: 8 }}>useDarkMode demo — toggles data-theme on &lt;html&gt;</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div>dark: <strong>{String(isDark)}</strong></div>
        <button onClick={() => toggle()}>toggle</button>
      </div>
    </div>
  )
}
