import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos'

type FormValues = {
  title: string
}

export const AddTodoForm = () => {
  const { addTodo, todos } = useTodos()
  const navigate = useNavigate()
  const [showToast, setShowToast] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { title: '' },
  })

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  )
  const isAtCapacity = activeCount >= 5

  const onSubmit = handleSubmit(async (values) => {
    if (isAtCapacity) {
      setShowToast(true)
      return
    }
    const ok = await addTodo(values.title)
    if (ok) {
      reset()
      setShowToast(true)
      navigate('/')
    }
  })

  useEffect(() => {
    if (!showToast) return
    const timeout = window.setTimeout(() => setShowToast(false), 2500)
    return () => window.clearTimeout(timeout)
  }, [showToast])

  return (
    <>
      <form className="todo-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">New Todo</label>
          <input
            id="title"
            placeholder="e.g. Review Finals_Q2 requirements"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <span className="field-error">{errors.title.message}</span>}
      </div>
        <button type="submit" disabled={isSubmitting || isAtCapacity}>
          {isAtCapacity ? 'Capacity Reached' : isSubmitting ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
      {isAtCapacity && (
        <div className="form-warning" role="status">
          Max 5 active tasks reached. Finish a task before adding a new one.
        </div>
      )}
      {showToast && (
        <div className="toast" role="status">
          {isAtCapacity
            ? 'Capacity reached. Complete a task to add more.'
            : 'Todo added. Keep the momentum going.'}
        </div>
      )}
    </>
  )
}
 
