import { useState } from 'react'
import { Icon } from '../components/Icon'
import { useAuth } from '../context/AuthContext'
import { useRouter } from '../context/RouterContext'

export default function AdminLogin() {
  const { login } = useAuth()
  const { navigate } = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = login(username, password)
    setLoading(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('#admin')
  }

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md flex items-center justify-center px-margin-mobile relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-surface-container rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-primary-fixed-dim rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="w-full max-w-md fade-in">
        <div className="bg-surface border border-outline-variant rounded-2xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] p-xl">
          <div className="flex flex-col items-center text-center mb-xl">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-on-primary mb-4">
              <Icon name="lock_person" style={{ fontSize: 32 }} />
            </div>
            <h1 className="font-headline-md text-headline-md text-primary font-bold">
              Masuk Admin
            </h1>
            <p className="text-on-surface-variant text-body-sm mt-1">
              Titik Baca Digital · Perpustakaan Palembang
            </p>
          </div>

          <form className="space-y-md" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block font-label-md text-label-md text-on-surface mb-2"
              >
                Username
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  person
                </span>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-label-md text-label-md text-on-surface mb-2"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-11 pr-11 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <Icon name={showPassword ? 'visibility' : 'visibility_off'} />
                </button>
              </div>
            </div>

            {error && (
              <div className="w-full p-3 bg-error-container text-on-error-container rounded-lg border border-error flex items-start gap-2 text-left">
                <Icon name="error" className="mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Icon name="login" />
                  Masuk
                </>
              )}
            </button>
          </form>

          <p className="text-center text-label-sm text-on-surface-variant mt-lg">
            Demo: <span className="font-semibold text-on-surface">admin</span> /{' '}
            <span className="font-semibold text-on-surface">admin123</span>
          </p>
        </div>

        <a
          href="#"
          className="flex items-center justify-center gap-2 mt-md text-on-surface-variant hover:text-primary transition-colors font-label-md"
        >
          <Icon name="arrow_back" />
          Kembali ke Beranda
        </a>
      </div>
    </div>
  )
}
