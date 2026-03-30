import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { TodoProvider } from './context/TodoContext'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <TodoProvider>
          <App />
        </TodoProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
