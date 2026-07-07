import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const FALLBACK = [
  {
    initials: 'AN',
    avatarClass: 'bg-primary-fixed text-primary',
    name: 'Adit Nugroho',
    id: '48210',
    book: 'Panduan Budidaya Ikan Gabus',
    start: '14:20 WIB',
    status: 'Aktif',
    statusClass: 'bg-surface-container-highest text-primary',
  },
  {
    initials: 'SR',
    avatarClass: 'bg-secondary-fixed text-on-secondary-container',
    name: 'Siska Ramadhani',
    id: '48215',
    book: 'Palembang: Venesia dari Timur',
    start: '14:05 WIB',
    status: 'Aktif',
    statusClass: 'bg-surface-container-highest text-primary',
  },
  {
    initials: 'BP',
    avatarClass: 'bg-tertiary-fixed text-tertiary',
    name: 'Bambang Pamungkas',
    id: '48199',
    book: 'Teknik Sipil Jembatan Ampera',
    start: '13:45 WIB',
    status: 'Idle',
    statusClass: 'bg-surface-container-low text-on-surface-variant',
  },
]

function initialsOf(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function formatWIB(iso) {
  const d = new Date(iso)
  const wib = new Date(d.getTime() + 7 * 3600 * 1000)
  return wib.toISOString().slice(11, 16) + ' WIB'
}

function mapVisitor(v, index) {
  const isActive = v.status === 'active'
  const palette = [
    'bg-primary-fixed text-primary',
    'bg-secondary-fixed text-on-secondary-container',
    'bg-tertiary-fixed text-tertiary',
  ]
  return {
    initials: initialsOf(v.name),
    avatarClass: palette[index % palette.length],
    name: v.name,
    id: v.member_code,
    book: v.book_title,
    start: formatWIB(v.started_at),
    status: isActive ? 'Aktif' : 'Idle',
    statusClass: isActive
      ? 'bg-surface-container-highest text-primary'
      : 'bg-surface-container-low text-on-surface-variant',
  }
}

export default function VisitorMonitorTable({ onDetail }) {
  const [rows, setRows] = useState(FALLBACK)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data, error } = await supabase
        .from('active_visitors')
        .select('*')
        .order('started_at', { ascending: false })
      if (cancelled) return
      if (!error && data && data.length > 0) {
        setRows(data.map(mapVisitor))
      }
    }
    load().catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const visible = showAll ? rows : rows.slice(0, 3)
  const activeCount = rows.filter((r) => r.status === 'Aktif').length

  return (
    <section className="mt-xl bg-surface border border-outline-variant rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="p-lg flex justify-between items-center border-b border-outline-variant">
        <h3 className="font-headline-md text-headline-md text-on-background">
          Monitor Pengunjung Aktif
        </h3>
        <div className="flex gap-2">
          <span className="flex items-center gap-2 text-label-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> {activeCount} Aktif
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              {['Pengunjung', 'Buku yang Dibaca', 'Mulai Baca', 'Status', 'Aksi'].map(
                (h) => (
                  <th
                    key={h}
                    className="px-lg py-md font-label-md text-on-surface-variant border-b border-outline-variant"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {visible.map((v) => (
              <tr key={v.id} className="hover:bg-background transition-colors">
                <td className="px-lg py-md">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${v.avatarClass}`}
                    >
                      {v.initials}
                    </div>
                    <div>
                      <p className="font-label-md text-on-surface">{v.name}</p>
                      <p className="text-xs text-on-surface-variant">ID: {v.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-lg py-md font-body-sm text-on-surface">
                  {v.book}
                </td>
                <td className="px-lg py-md font-body-sm text-on-surface-variant">
                  {v.start}
                </td>
                <td className="px-lg py-md">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${v.statusClass}`}
                  >
                    {v.status}
                  </span>
                </td>
                <td className="px-lg py-md">
                  <button
                    onClick={() => onDetail?.(v)}
                    className="text-primary hover:underline font-label-sm"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-lg bg-surface-container-low flex justify-center">
        <button
          onClick={() => setShowAll((v) => !v)}
          className="text-primary font-label-md flex items-center gap-2 hover:gap-3 transition-all"
        >
          {showAll ? 'Sembunyikan' : 'Lihat Semua Aktivitas'}
          <span className="material-symbols-outlined">
            {showAll ? 'expand_less' : 'arrow_forward'}
          </span>
        </button>
      </div>
    </section>
  )
}
