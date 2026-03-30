# Finals_Q2 Frontend (React Todo App)

## Setup

```bash
npm install
npm run dev
```

Backend API expected at `http://localhost:5000/api/todos`.

## Architecture Summary

- **React Router**: `/` for the todo list and `/about` for app details.
- **Context + Hooks**: `TodoContext` centralizes API synchronization, and `useTodos` exposes the todo collection plus CRUD actions.
- **Component Layout**: `Layout` supplies navigation + shared theme, `TodoPage` hosts `AddTodoForm`, `TodoList`, `TodoItem`, and `EditTodoModal`.
- **Theming**: `ThemeContext` applies global theme variables and a toggle across the UI.
- **Immutability**: All state updates use `map`/`filter`/spread without mutating existing arrays.

## Technical Debt Fixes (Finals_Q2 Audit)

1. **Filter logic (ID vs Title mismatch)**
   - Fixed by filtering by `id` instead of comparing to `title` in delete flow.
2. **Update logic (Filter instead of Map)**
   - Fixed by using `map` to update the matching todo, preserving the rest.
3. **Reconciliation (Index used as key)**
   - Fixed by using `todo.id` as the key when rendering the list.
