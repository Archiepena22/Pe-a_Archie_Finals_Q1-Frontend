import { useTodos } from '../hooks/useTodos'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const { todos } = useTodos()
  const firstIncompleteIndex = todos.findIndex((todo) => !todo.completed)

  if (todos.length === 0) {
    return <p className="empty-state">No todos yet. Add one to get started.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          canComplete={todo.completed || index === firstIncompleteIndex}
        />
      ))}
    </ul>
  )
}
 
