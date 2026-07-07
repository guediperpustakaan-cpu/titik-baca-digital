import { useEffect, useState } from 'react'
import AppBar from './components/AppBar'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import { useAuth } from './context/AuthContext'
import { useRouter } from './context/RouterContext'
import ValidationCard from './components/ValidationCard'
import LocationCard from './components/LocationCard'
import FeaturedBooks from './components/FeaturedBooks'
import BottomNav from './components/BottomNav'
import SuccessModal from './components/SuccessModal'
import { Icon } from './components/Icon'

const LOGO_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQKb8IarJKlx2dygCcdHVRcOCsfnp0L6YYZjsaaRj9cpCJovZ6gsAtC0q3Qo6zQ4Kz8P-Pg9AaqOP1EtVToaJApNILRTJaZV-mRJylCt9__lVzMgnUTe8WnEcCSFkIoKbGMW6PjX1ovKtG1TpNb3NX_ixJHSszdJFQkCc2bZDG5vVAiCPz6S7djK0TZawekPOlLcHUrBHzJEHK_QDqYV5Rf8s1310WiuzwI4esZOFJV8TgIPefoF1h'

function Hero({ children }) {
  return (
    <main className="flex-grow flex flex-col items-center justify-center relative px-margin-mobile py-xl">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-surface-container rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-primary-fixed-dim rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-4xl w-full text-center space-y-lg fade-in">
        <div className="flex flex-col items-center gap-4 mb-xl">
          <img
            className="w-24 h-24 object-contain mb-4"
            src={LOGO_SRC}
            alt="Logo Dinas Perpustakaan dan Kearsipan Kota Palembang"
          />
          <p className="text-primary font-label-md uppercase tracking-widest">
            Dinas Perpustakaan dan Kearsipan Kota Palembang
          </p>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background tracking-tight">
            Akses Literasi <span className="text-primary">Kapanpun, Di Manapun.</span>
          </h2>
          <p className="text-on-surface-variant text-body-lg max-w-2xl mx-auto">
            Selamat datang di Titik Baca Digital. Temukan ribuan koleksi buku
            digital eksklusif langsung dari perangkat Anda di lokasi-lokasi
            strategis kota Palembang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md w-full">
          {children}
        </div>
      </div>

      <FeaturedBooks />
    </main>
  )
}

export default function App() {
  const { user } = useAuth()
  const { route, navigate } = useRouter()
  const [successOpen, setSuccessOpen] = useState(false)

  useEffect(() => {
    if (route === '#admin' && !user) {
      navigate('#login')
    }
  }, [route, user, navigate])

  useEffect(() => {
    if (!successOpen) return
    const timer = setTimeout(() => {
      navigate('#catalog')
    }, 2000)
    return () => clearTimeout(timer)
  }, [successOpen, navigate])

  if (route === '#login') {
    return <AdminLogin />
  }

  if (route === '#admin') {
    if (!user) return null
    return <AdminDashboard />
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-x-hidden">
      <AppBar />
      <Hero>
        <ValidationCard onSuccess={() => setSuccessOpen(true)} />
        <LocationCard />
      </Hero>
      <BottomNav />
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </div>
  )
}
