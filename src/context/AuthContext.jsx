import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'tbd_admin_session'

const DEMO_CREDENTIALS = { username: 'admin', password: 'admin123' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? null
    } catch {
      return null
    }
  })

  function login(username, password) {
    if (
      username.trim() === DEMO_CREDENTIALS.username &&
      password === DEMO_CREDENTIALS.password
    ) {
      const session = { username: username.trim(), name: 'Admin Titik Baca' }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
      setUser(session)
      return { ok: true }
    }
    return { ok: false, error: 'Username atau kata sandi salah.' }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
