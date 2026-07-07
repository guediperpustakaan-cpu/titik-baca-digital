import { Icon } from './Icon'

export default function AppBar() {
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
        <button className="material-symbols-outlined text-primary p-2 rounded-full hover:bg-surface-container-low transition-colors">
          account_circle
        </button>
      </div>
    </header>
  )
}
