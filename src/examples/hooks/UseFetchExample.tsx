import { useFetch } from '../../index'

export const codeString = `function FetchPosts() {
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts')
  if (loading) return <div>loading...</div>
  if (error) return <div>error: {String(error)}</div>
  return (
    <div>
      <button onClick={() => refetch()}>refetch</button>
      <ul>{(data || []).slice(0,5).map(p => <li key={p.id}>{p.title}</li>)}</ul>
    </div>
  )
}`

export default function UseFetchExample() {
  type Post = { id: number; title: string }
  const { data, loading, error, refetch } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts')
  return (
    <div>
      <div style={{ marginBottom: 8 }}>useFetch demo — JSONPlaceholder posts</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => refetch()}>refetch</button>
        {loading && <div>loading…</div>}
        {error && <div style={{ color: 'crimson' }}>error</div>}
      </div>
      <ul>
        {(data || []).slice(0,5).map((p: Post) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  )
}
