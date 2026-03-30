import { useEffect, useMemo, useState } from 'react'
import { AddTodoForm } from '../components/AddTodoForm'
import { TodoList } from '../components/TodoList'
import { useTodos } from '../hooks/useTodos'

export const TodoPage = () => {
  const { todos, lastSynced } = useTodos()
  const total = todos.length
  const completed = todos.filter((todo) => todo.completed).length
  const pending = total - completed
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (todos.length > 0) {
      setDismissed(false)
    }
  }, [todos.length])

  const syncLabel = useMemo(() => {
    if (!lastSynced) return 'Never'
    return lastSynced.toLocaleTimeString()
  }, [lastSynced])

  return (
    <section className="todo-page">
      <header className="page-header">
        <div>
          <h1>Todo Dashboard</h1>
          <p>Track tasks with consistent API synchronization.</p>
        </div>
        <div className="header-meta">
          <span>Last synced from API</span>
          <strong>{syncLabel}</strong>
        </div>
      </header>
      <div className="stats-grid">
        <article className="stat-card">
          <p>Total tasks</p>
          <h2>{total}</h2>
        </article>
        <article className="stat-card">
          <p>In progress</p>
          <h2>{pending}</h2>
        </article>
        <article className="stat-card">
          <p>Completed</p>
          <h2>{completed}</h2>
        </article>
      </div>
      <AddTodoForm />
      <TodoList />
      {!dismissed && todos.length === 0 && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <header>
              <h3>What should I do next?</h3>
            </header>
            <div className="modal-body">
              <ul className="tip-list">
                <li>Add your top 3 priority tasks.</li>
                <li>Use short, action-focused titles.</li>
                <li>Mark tasks done as you complete them.</li>
              </ul>
            </div>
            <footer className="modal-actions">
              <button type="button" className="ghost" onClick={() => setDismissed(true)}>
                Close
              </button>
              <button type="button" onClick={() => setDismissed(true)}>
                Got it
              </button>
            </footer>
          </div>
        </div>
      )}
    </section>
  )
}
 
