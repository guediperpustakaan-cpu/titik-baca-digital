import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const RouterContext = createContext(null)

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : '',
  )

  useEffect(() => {
    function onHash() {
      setRoute(window.location.hash)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = useCallback((hash) => {
    if (window.location.hash !== hash) {
      window.location.hash = hash
    }
    setRoute(hash)
  }, [])

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  return useContext(RouterContext)
}
