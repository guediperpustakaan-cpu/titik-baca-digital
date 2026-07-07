import { useState, useRef, useEffect } from 'react'
import { Icon } from './Icon'

const MENU_ITEMS = [
  { label: 'Profil Saya', icon: 'person' },
  { label: 'Buku Pinjaman', icon: 'menu_book' },
  { label: 'Pengaturan', icon: 'settings' },
  { label: 'Keluar', icon: 'logout' },
]

export default function AppBar() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-margin-mobile md:px-gutter w-full max-w-container-max mx-auto bg-surface border-b border-outline-variant py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-on-primary">
          <Icon name="library_books" />
        </div>
        <h1 className="font-headline-md text-headline-md font-bold text-primary">
          Titik Baca Digital
        </h1>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        <nav className="flex gap-6">
          <a
            className="text-primary font-bold border-b-2 border-primary"
            href="#"
          >
            Beranda
          </a>
          <a
            className="text-on-surface-variant hover:bg-surface-container-low transition-colors px-2 py-1 rounded"
            href="#"
          >
            Katalog
          </a>
          <a
            className="text-on-surface-variant hover:bg-surface-container-low transition-colors px-2 py-1 rounded"
            href="#"
          >
            Lokasi
          </a>
        </nav>

        <div className="relative" ref={menuRef}>
          <button
            aria-label="Akun"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="material-symbols-outlined text-primary p-2 rounded-full hover:bg-surface-container-low transition-colors"
          >
            account_circle
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-60 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <Icon name="account_circle" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-label-md text-on-surface">
                    Pengunjung
                  </p>
                  <p className="text-body-sm text-on-surface-variant">
                    pengunjung@titikbaca.id
                  </p>
                </div>
              </div>
              <ul>
                {MENU_ITEMS.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <Icon name={item.icon} />
                      <span className="text-label-md">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
