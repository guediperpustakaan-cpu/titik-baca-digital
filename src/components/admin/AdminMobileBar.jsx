import { Icon } from '../Icon'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from '../../context/RouterContext'

const MOBILE_NAV_ITEMS = [
  { view: 'dashboard', name: 'home', label: 'Beranda' },
  { view: 'books', name: 'library_books', label: 'Katalog' },
  { view: 'locations', name: 'location_on', label: 'Lokasi' },
  { view: 'visitors', name: 'person', label: 'Profil' },
]

export function AdminMobileTopBar() {
  const { logout } = useAuth()
  const { navigate } = useRouter()

  return (
    <header className="md:hidden sticky top-0 z-50 flex justify-between items-center px-margin-mobile py-4 w-full bg-surface border-b border-outline-variant shadow-sm">
      <h1 className="font-headline-md text-headline-md font-bold text-primary">
        Titik Baca
      </h1>
      <button
        className="p-2 text-primary"
        aria-label="Keluar"
        onClick={() => {
          logout()
          navigate('#login')
        }}
      >
        <Icon name="account_circle" />
      </button>
    </header>
  )
}

export function AdminMobileNav({ activeView, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-surface border-t border-outline-variant shadow-md md:hidden">
      {MOBILE_NAV_ITEMS.map((item) => {
        const active = activeView === item.view
        return (
          <button
            key={item.name}
            onClick={() => onNavigate(item.view)}
            className={`flex flex-col items-center justify-center rounded-full px-4 py-1 ${
              active
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:bg-surface-variant transition-all'
            }`}
          >
            <Icon name={item.name} />
            <span className="font-label-sm text-label-sm">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
