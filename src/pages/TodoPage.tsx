import { AddTodoForm } from '../components/AddTodoForm'
import { TodoList } from '../components/TodoList'

export const TodoPage = () => {
  return (
    <section className="todo-page">
      <header className="page-header">
        <div>
          <h1>Todo Dashboard</h1>
          <p>Track tasks with consistent API synchronization.</p>
        </div>
      </header>
      <AddTodoForm />
      <TodoList />
    </section>
  )
}
 
