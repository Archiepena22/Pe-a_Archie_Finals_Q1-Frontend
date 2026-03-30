import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { TodoPage } from './pages/TodoPage'
import { AboutPage } from './pages/AboutPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TodoPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}

export default App
 
