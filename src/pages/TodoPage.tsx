import { AddTodoForm } from '../components/AddTodoForm'
import { TodoList } from '../components/TodoList'
import { useTodos } from '../hooks/useTodos'

export const TodoPage = () => {
  const { todos } = useTodos()
  const total = todos.length
  const completed = todos.filter((todo) => todo.completed).length
  const pending = total - completed

  return (
    <section className="todo-page">
      <header className="page-header">
        <div>
          <h1>Todo Dashboard</h1>
          <p>Track tasks with consistent API synchronization.</p>
        </div>
        <div className="header-meta">
          <span>Last synced from API</span>
          <strong>Live</strong>
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
    </section>
  )
}
 
