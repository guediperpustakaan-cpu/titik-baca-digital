import { Icon } from '../Icon'

export default function QuickAccess({ onAddBook, onReport }) {
  return (
    <div className="bg-surface border border-outline-variant p-lg rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
      <h3 className="font-headline-md text-headline-md text-on-background mb-lg">
        Akses Cepat
      </h3>

      <div className="space-y-4">
        <button
          onClick={onAddBook}
          className="w-full flex items-center gap-3 p-3 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors text-left"
        >
          <div className="p-2 bg-primary text-on-primary rounded-lg">
            <Icon name="add" />
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface">
              Tambah Koleksi
            </p>
            <p className="text-xs text-on-surface-variant">Upload PDF atau EPUB baru</p>
          </div>
        </button>
        <button
          onClick={onReport}
          className="w-full flex items-center gap-3 p-3 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors text-left"
        >
          <div className="p-2 bg-secondary text-on-secondary rounded-lg">
            <Icon name="print" />
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface">
              Laporan Bulanan
            </p>
            <p className="text-xs text-on-surface-variant">Unduh rekapitulasi data</p>
          </div>
        </button>
      </div>

      <div className="mt-lg pt-lg border-t border-outline-variant">
        <h4 className="text-label-md font-bold text-on-surface-variant mb-4 uppercase tracking-wider">
          Status Server
        </h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-body-sm">Koneksi Database</span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-body-sm">Penyimpanan Cloud</span>
          <span className="text-body-sm font-semibold">82% Full</span>
        </div>
      </div>
    </div>
  )
}
