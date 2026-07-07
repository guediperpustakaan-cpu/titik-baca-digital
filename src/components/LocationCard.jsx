import { Icon } from './Icon'

export default function LocationCard() {
  return (
    <div className="bg-surface-container-low border border-outline-variant p-xl rounded-xl flex flex-col justify-between overflow-hidden relative group h-full">
      <div className="relative z-10 space-y-md">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-secondary-fixed rounded-lg text-on-secondary-container">
            <Icon name="map" />
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-label-sm font-bold">
            12 Titik Aktif
          </span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Cari Lokasi Terdekat
        </h3>
        <p className="text-on-surface-variant text-body-sm">
          Lihat daftar lokasi perpustakaan digital di taman kota, halte, dan area
          publik lainnya di Palembang.
        </p>
        <button className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
          Lihat Peta <Icon name="arrow_forward" />
        </button>
      </div>
      <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <Icon name="explore" style={{ fontSize: 200 }} />
      </div>
    </div>
  )
}
