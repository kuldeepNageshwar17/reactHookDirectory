import { useLocalStorage } from '../../index'

export const codeString = `function LocalStorageCounter() {
  const [count, setCount] = useLocalStorage('counter', 0)
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount((c: number) => c + 1)}>+1</button>
      <button onClick={() => setCount(0)}>reset</button>
    </div>
  )
}`

export default function UseLocalStorageExample() {
  const [count, setCount] = useLocalStorage<number>('counter_demo', 0)
  return (
    <div>
      <div style={{ marginBottom: 8 }}>useLocalStorage demo — persisted counter</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => setCount((c: number) => c + 1)}>+1</button>
        <button onClick={() => setCount(0)}>reset</button>
        <div>value: <strong>{count}</strong></div>
      </div>
    </div>
  )
}
