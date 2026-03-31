import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Todo } from '../types/todo'
import { useTodos } from '../hooks/useTodos'
import { EditTodoModal } from './EditTodoModal'

export const TodoItem = ({ todo, canComplete }: { todo: Todo; canComplete: boolean }) => {
  const { deleteTodo, toggleTodo } = useTodos()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [isWorking, setIsWorking] = useState(false)
  const [showOrderWarning, setShowOrderWarning] = useState(false)

  const handleToggle = async () => {
    if (!todo.completed && !canComplete) {
      setShowOrderWarning(true)
      window.setTimeout(() => setShowOrderWarning(false), 2500)
      return
    }
    setIsWorking(true)
    const ok = await toggleTodo(todo.id)
    setIsWorking(false)
    if (ok) navigate('/')
  }

  const handleDelete = async () => {
    setIsWorking(true)
    const ok = await deleteTodo(todo.id)
    setIsWorking(false)
    if (ok) navigate('/')
  }

  return (
    <li className={`todo-item ${todo.completed ? 'done' : ''}`}>
      <div>
        <h3>{todo.title}</h3>
        <p>{todo.completed ? 'Completed' : 'Pending'}</p>
      </div>
      <div className="actions">
        <button type="button" onClick={handleToggle} disabled={isWorking}>
          Toggle
        </button>
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button type="button" className="danger" onClick={handleDelete} disabled={isWorking}>
          Delete
        </button>
      </div>
      {showOrderWarning && (
        <p className="inline-warning">Complete tasks in order (FIFO).</p>
      )}
      {isEditing && (
        <EditTodoModal todo={todo} onClose={() => setIsEditing(false)} />
      )}
    </li>
  )
}
 
