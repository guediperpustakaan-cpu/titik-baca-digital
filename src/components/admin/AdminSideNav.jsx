import { Icon } from '../Icon'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from '../../context/RouterContext'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'books', label: 'Kelola Buku', icon: 'menu_book' },
  { id: 'locations', label: 'Lokasi', icon: 'map' },
  { id: 'visitors', label: 'Pengunjung', icon: 'group' },
]

const FOOTER_ITEMS = [
  { id: 'settings', label: 'Pengaturan', icon: 'settings' },
  { id: 'logout', label: 'Keluar', icon: 'logout', danger: true },
]

export default function AdminSideNav({ activeView, onNavigate }) {
  const { logout } = useAuth()
  const { navigate } = useRouter()

  function handleLogout() {
    logout()
    navigate('#login')
  }

  function handleItem(item) {
    if (item.danger) {
      handleLogout()
    } else if (item.id === 'settings') {
      onNavigate('settings')
    } else {
      onNavigate(item.id)
    }
  }

  return (
    <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 p-md w-64 bg-surface-container-low border-r border-outline-variant z-50">
      <div className="mb-xl">
        <h2 className="font-headline-md text-headline-md font-bold text-primary">
          Admin Titik Baca
        </h2>
        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-75">
          Perpustakaan Palembang
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const active = activeView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={
                active
                  ? 'w-full flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold transition-transform active:translate-x-1'
                  : 'w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg'
              }
            >
              <Icon name={item.icon} />
              <span className="font-label-md text-label-md">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="pt-md border-t border-outline-variant mt-auto space-y-2">
        {FOOTER_ITEMS.map((item) =>
          item.danger ? (
            <button
              key={item.id}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-variant transition-colors rounded-lg text-error"
            >
              <Icon name={item.icon} />
              <span className="font-label-md text-label-md">{item.label}</span>
            </button>
          ) : (
            <button
              key={item.id}
              onClick={() => handleItem(item)}
              className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg"
            >
              <Icon name={item.icon} />
              <span className="font-label-md text-label-md">{item.label}</span>
            </button>
          ),
        )}
      </div>
    </aside>
  )
}
