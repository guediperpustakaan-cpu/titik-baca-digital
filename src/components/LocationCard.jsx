import { useState } from 'react'
import { Icon } from './Icon'
import { TARGET_COORDS } from '../lib/geo'

export default function LocationCard() {
  const [showMap, setShowMap] = useState(false)
  const { lat, lon } = TARGET_COORDS
  const mapSrc = `https://www.google.com/maps?q=${lat},${lon}&z=16&output=embed`

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
        <button
          onClick={() => setShowMap((v) => !v)}
          className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all"
        >
          {showMap ? 'Tutup Peta' : 'Lihat Peta'}
          <Icon name={showMap ? 'close' : 'arrow_forward'} />
        </button>
      </div>

      {showMap && (
        <div className="relative z-10 mt-md">
          <iframe
            title="Peta Titik Baca Digital"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-64 rounded-xl border border-outline-variant"
          />
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-primary font-bold hover:underline"
          >
            Buka di Google Maps <Icon name="open_in_new" />
          </a>
        </div>
      )}

      <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <Icon name="explore" style={{ fontSize: 200 }} />
      </div>
    </div>
  )
}
