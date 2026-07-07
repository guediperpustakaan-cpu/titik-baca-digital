import { useState, useRef } from 'react'
import AdminSideNav from '../components/admin/AdminSideNav'
import { AdminMobileTopBar, AdminMobileNav } from '../components/admin/AdminMobileBar'
import StatsBento from '../components/admin/StatsBento'
import VisitorChart from '../components/admin/VisitorChart'
import QuickAccess from '../components/admin/QuickAccess'
import VisitorMonitorTable from '../components/admin/VisitorMonitorTable'
import Modal from '../components/Modal'
import { Icon } from '../components/Icon'

const VIEWS = {
  dashboard: {
    title: 'Ringkasan Dashboard',
    subtitle: 'Pantau aktivitas perpustakaan digital Anda secara real-time.',
  },
  books: {
    title: 'Kelola Buku',
    subtitle: 'Tambah, edit, dan kelola koleksi buku digital.',
  },
  locations: {
    title: 'Lokasi',
    subtitle: 'Kelola titik baca digital di seluruh Palembang.',
  },
  visitors: {
    title: 'Pengunjung',
    subtitle: 'Lihat data dan riwayat pengunjung perpustakaan.',
  },
  settings: {
    title: 'Pengaturan',
    subtitle: 'Atur preferensi akun dan sistem perpustakaan.',
  },
}

const PLACEHOLDER_ICON = {
  books: 'menu_book',
  locations: 'map',
  visitors: 'group',
  settings: 'settings',
}

export default function AdminDashboard() {
  const [view, setView] = useState('dashboard')
  const [addBookOpen, setAddBookOpen] = useState(false)
  const [detailVisitor, setDetailVisitor] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  function showToast(message) {
    setToast(message)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }

  function handleReport() {
    const rows = [
      ['Tanggal', 'Pengunjung', 'Buku Dibaca'],
      ['2026-07-01', '420', 'Sejarah Palembang Modern'],
      ['2026-07-02', '310', 'Teknologi Masa Depan'],
      ['2026-07-03', '640', 'Kuliner Palembang'],
      ['2026-07-04', '520', 'Sajak Musi'],
      ['2026-07-05', '710', 'Panduan Budidaya Ikan Gabus'],
      ['2026-07-06', '580', 'Palembang: Venesia dari Timur'],
      ['2026-07-07', '380', 'Teknik Sipil Jembatan Ampera'],
    ]
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'laporan-bulanan.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast('Laporan bulanan berhasil diunduh')
  }

  function handleAddBook(e) {
    e.preventDefault()
    setAddBookOpen(false)
    showToast('Koleksi berhasil ditambahkan')
  }

  const isDashboard = view === 'dashboard'

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      <AdminMobileTopBar />

      <div className="flex">
        <AdminSideNav activeView={view} onNavigate={setView} />

        <main className="flex-1 md:ml-64 p-margin-mobile md:p-xl mb-24 md:mb-0">
          <section className="mb-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-1">
              {VIEWS[view].title}
            </h2>
            <p className="text-on-surface-variant font-body-md">
              {VIEWS[view].subtitle}
            </p>
          </section>

          {isDashboard ? (
            <>
              <StatsBento />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                <VisitorChart />
                <QuickAccess
                  onAddBook={() => setAddBookOpen(true)}
                  onReport={handleReport}
                />
              </div>

              <VisitorMonitorTable onDetail={setDetailVisitor} />
            </>
          ) : (
            <div className="bg-surface border border-outline-variant rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] p-2xl flex flex-col items-center justify-center text-center min-h-[50vh]">
              <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4">
                <Icon name={PLACEHOLDER_ICON[view]} style={{ fontSize: 40 }} />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                {VIEWS[view].title}
              </h3>
              <p className="text-on-surface-variant max-w-md">
                Halaman ini sedang dalam pengembangan. Fitur {VIEWS[view].title.toLowerCase()} akan segera tersedia.
              </p>
              <button
                onClick={() => setView('dashboard')}
                className="mt-lg flex items-center gap-2 text-primary font-label-md hover:gap-3 transition-all"
              >
                <Icon name="arrow_back" />
                Kembali ke Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      <AdminMobileNav activeView={view} onNavigate={setView} />

      <Modal
        open={addBookOpen}
        onClose={() => setAddBookOpen(false)}
        title="Tambah Koleksi"
      >
        <form className="space-y-md" onSubmit={handleAddBook}>
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Judul Buku
            </label>
            <input
              required
              type="text"
              placeholder="Masukkan judul buku"
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Penulis
            </label>
            <input
              type="text"
              placeholder="Masukkan nama penulis"
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Berkas (PDF/EPUB)
            </label>
            <input
              type="file"
              accept=".pdf,.epub"
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-on-primary file:font-label-md"
            />
          </div>
          <div className="flex gap-2 pt-md">
            <button
              type="button"
              onClick={() => setAddBookOpen(false)}
              className="flex-1 py-3 bg-surface-container text-on-surface font-label-md rounded-lg hover:bg-surface-container-high transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary-container transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={!!detailVisitor}
        onClose={() => setDetailVisitor(null)}
        title="Detail Pengunjung"
      >
        {detailVisitor && (
          <div className="space-y-md">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-[16px] font-bold ${detailVisitor.avatarClass}`}
              >
                {detailVisitor.initials}
              </div>
              <div>
                <p className="font-label-md text-on-surface text-headline-md">
                  {detailVisitor.name}
                </p>
                <p className="text-xs text-on-surface-variant">
                  ID: {detailVisitor.id}
                </p>
              </div>
            </div>
            <div className="space-y-2 bg-surface-container-lowest rounded-lg p-md">
              <div className="flex justify-between">
                <span className="text-on-surface-variant text-label-sm">Buku</span>
                <span className="text-on-surface font-label-sm">
                  {detailVisitor.book}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant text-label-sm">
                  Mulai Baca
                </span>
                <span className="text-on-surface font-label-sm">
                  {detailVisitor.start}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant text-label-sm">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${detailVisitor.statusClass}`}
                >
                  {detailVisitor.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => setDetailVisitor(null)}
              className="w-full py-3 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary-container transition-colors"
            >
              Tutup
            </button>
          </div>
        )}
      </Modal>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-on-background text-surface-container-lowest px-lg py-md rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
          <Icon name="check_circle" className="text-green-400" />
          <span className="font-label-md">{toast}</span>
        </div>
      )}
    </div>
  )
}
