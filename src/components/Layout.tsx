import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useTodos } from '../hooks/useTodos'

export const Layout = () => {
  const { theme, toggleTheme } = useTheme()
  const { chainStatus } = useTodos()

  return (
    <div className="app-shell">
      {chainStatus === 'tampered' && (
        <div className="chain-banner" role="alert">
          REDACTED/TAMPERED: Blockchain verification failed. Please check the server.
        </div>
      )}
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
 
