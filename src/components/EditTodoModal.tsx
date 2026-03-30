import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos'
import type { Todo } from '../types/todo'

export const EditTodoModal = ({
  todo,
  onClose,
}: {
  todo: Todo
  onClose: () => void
}) => {
  const { updateTodo } = useTodos()
  const navigate = useNavigate()
  const [title, setTitle] = useState(todo.title)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    const trimmed = title.trim()
    if (!trimmed) return
    setIsSaving(true)
    const ok = await updateTodo(todo.id, { title: trimmed })
    setIsSaving(false)
    if (ok) {
      onClose()
      navigate('/')
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header>
          <h3>Edit Todo</h3>
        </header>
        <div className="modal-body">
          <label htmlFor={`edit-${todo.id}`}>Title</label>
          <input
            id={`edit-${todo.id}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <footer className="modal-actions">
          <button type="button" onClick={onClose} className="ghost">
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </footer>
      </div>
    </div>
  )
}
 
