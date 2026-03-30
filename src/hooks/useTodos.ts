import { useTodosContext } from '../context/TodoContext'

export const useTodos = () => {
  return useTodosContext()
}
