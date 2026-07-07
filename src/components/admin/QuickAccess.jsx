import { Icon } from '../Icon'

const QUICK_ACCESS = [
  {
    icon: 'add',
    iconClass: 'bg-primary text-on-primary',
    title: 'Tambah Koleksi',
    desc: 'Upload PDF atau EPUB baru',
  },
  {
    icon: 'print',
    iconClass: 'bg-secondary text-on-secondary',
    title: 'Laporan Bulanan',
    desc: 'Unduh rekapitulasi data',
  },
]

export default function QuickAccess() {
  return (
    <div className="bg-surface border border-outline-variant p-lg rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
      <h3 className="font-headline-md text-headline-md text-on-background mb-lg">
        Akses Cepat
      </h3>

      <div className="space-y-4">
        {QUICK_ACCESS.map((item) => (
          <button
            key={item.title}
            className="w-full flex items-center gap-3 p-3 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors text-left"
          >
            <div className={`p-2 ${item.iconClass} rounded-lg`}>
              <Icon name={item.icon} />
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface">
                {item.title}
              </p>
              <p className="text-xs text-on-surface-variant">{item.desc}</p>
            </div>
          </button>
        ))}
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
