import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export const Layout = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">?</span>
          <span className="brand-name">Finals Todo</span>
        </div>
        <nav className="app-nav">
          <NavLink to="/" end>
            Todos
          </NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme} type="button">
          Theme: {theme === 'light' ? 'Light' : 'Dark'}
        </button>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
