import { Icon } from './Icon'

const NAV_ITEMS = [
  { name: 'home', label: 'Beranda', active: true },
  { name: 'library_books', label: 'Katalog' },
  { name: 'location_on', label: 'Lokasi' },
  { name: 'person', label: 'Profil' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 md:hidden bg-surface border-t border-outline-variant rounded-t-xl shadow-md">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.name}
          href="#"
          className={`flex flex-col items-center justify-center rounded-full px-4 py-1 ${
            item.active
              ? 'bg-secondary-container text-on-secondary-container'
              : 'text-on-surface-variant'
          }`}
        >
          <Icon name={item.name} />
          <span className="font-label-sm text-label-sm">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
