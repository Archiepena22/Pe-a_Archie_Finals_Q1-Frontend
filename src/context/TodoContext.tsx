import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Todo } from '../types/todo'

const API_BASE = 'http://localhost:5000/api/todos'

type TodoContextValue = {
  todos: Todo[]
  fetchTodos: () => Promise<void>
  addTodo: (title: string) => Promise<boolean>
  updateTodo: (id: string, updates: Partial<Pick<Todo, 'title' | 'completed'>>) => Promise<boolean>
  deleteTodo: (id: string) => Promise<boolean>
  toggleTodo: (id: string) => Promise<boolean>
}

const TodoContext = createContext<TodoContextValue | null>(null)

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodos = useCallback(async () => {
    const res = await fetch(API_BASE)
    if (!res.ok) return
    const data = (await res.json()) as Todo[]
    setTodos(data)
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const addTodo = useCallback(async (title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return false

    const payload: Todo = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
    }

    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) return false

    const created = (await res.json().catch(() => payload)) as Todo
    setTodos((prev) => [...prev, created])
    return true
  }, [])

  const updateTodo = useCallback(
    async (id: string, updates: Partial<Pick<Todo, 'title' | 'completed'>>) => {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!res.ok) return false

      const updated = (await res.json().catch(() => updates)) as Partial<Todo>
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo)),
      )
      return true
    },
    [],
  )

  const deleteTodo = useCallback(async (id: string) => {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    if (!res.ok) return false

    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    return true
  }, [])

  const toggleTodo = useCallback(
    async (id: string) => {
      const current = todos.find((todo) => todo.id === id)
      if (!current) return false
      return updateTodo(id, { completed: !current.completed })
    },
    [todos, updateTodo],
  )

  const value = useMemo(
    () => ({ todos, fetchTodos, addTodo, updateTodo, deleteTodo, toggleTodo }),
    [todos, fetchTodos, addTodo, updateTodo, deleteTodo, toggleTodo],
  )

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export const useTodosContext = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodosContext must be used within TodoProvider')
  }
  return context
}
