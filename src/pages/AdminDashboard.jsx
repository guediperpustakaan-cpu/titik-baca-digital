import AdminSideNav from '../components/admin/AdminSideNav'
import { AdminMobileTopBar, AdminMobileNav } from '../components/admin/AdminMobileBar'
import StatsBento from '../components/admin/StatsBento'
import VisitorChart from '../components/admin/VisitorChart'
import QuickAccess from '../components/admin/QuickAccess'
import VisitorMonitorTable from '../components/admin/VisitorMonitorTable'

export default function AdminDashboard() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      <AdminMobileTopBar />

      <div className="flex">
        <AdminSideNav />

        <main className="flex-1 md:ml-64 p-margin-mobile md:p-xl mb-24 md:mb-0">
          <section className="mb-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-1">
              Ringkasan Dashboard
            </h2>
            <p className="text-on-surface-variant font-body-md">
              Pantau aktivitas perpustakaan digital Anda secara real-time.
            </p>
          </section>

          <StatsBento />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            <VisitorChart />
            <QuickAccess />
          </div>

          <VisitorMonitorTable />
        </main>
      </div>

      <AdminMobileNav />
    </div>
  )
}
