import { useEffect, useState } from 'react'
import { Icon } from '../Icon'
import { supabase } from '../../lib/supabase'

const FALLBACK_COVER =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBB2_AbnitiwirsLVMbOxUcJC1yP-jQNONLMsaICf2rlGgJ71X7Wvy6Vcvq2WLfiZUHWLqCgPF8vww185KjtVCm0UYmKcxjtDRe8I_4rwBkWC8I1CUJJOCp6s6OP7VSRyTXdtB31PCcHlmwYnltwXuCwxRwT4vhNAPN2WkVUpXspSqBpJ2XVd8TDdYAHJPAuWRs1TGr79VkRlEUGU4ddMX9sHJQjFnyh5wbEcC87aD37mc24DYEDCH6'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function StatCard({ label, value, children, icon, iconClass }) {
  return (
    <div className="bg-surface border border-outline-variant p-lg rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] flex items-center justify-between">
      <div>
        <p className="text-on-surface-variant font-label-md mb-2">{label}</p>
        <h3 className="text-headline-lg font-bold text-primary">{value}</h3>
        {children}
      </div>
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${iconClass}`}
      >
        <Icon name={icon} className="text-[28px]" />
      </div>
    </div>
  )
}

export default function StatsBento() {
  const [total, setTotal] = useState(12482)
  const [popular, setPopular] = useState({
    title: 'Sejarah Palembang Modern',
    reads: 124,
    cover: FALLBACK_COVER,
  })
  const [today, setToday] = useState(847)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [countRes, popRes, todayRes] = await Promise.all([
        supabase.from('books').select('*', { count: 'exact', head: true }),
        supabase
          .from('books')
          .select('title, reads_today, cover_url')
          .order('reads_today', { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from('visitor_stats')
          .select('visitor_count')
          .eq('stat_date', todayISO())
          .maybeSingle(),
      ])
      if (cancelled) return
      if (!countRes.error && countRes.count != null) setTotal(countRes.count)
      if (!popRes.error && popRes.data) {
        setPopular({
          title: popRes.data.title,
          reads: popRes.data.reads_today,
          cover: popRes.data.cover_url || FALLBACK_COVER,
        })
      }
      if (!todayRes.error && todayRes.data) setToday(todayRes.data.visitor_count)
    }
    load().catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl">
      <StatCard
        label="Total Buku"
        value={total.toLocaleString('id-ID')}
        icon="library_books"
        iconClass="bg-primary-fixed text-primary"
      >
        <p className="text-label-sm font-medium mt-1 text-green-600 flex items-center gap-1">
          <Icon name="trending_up" className="text-[16px]" /> +12% bln ini
        </p>
      </StatCard>

      <StatCard
        label="Pengunjung Hari Ini"
        value={today.toLocaleString('id-ID')}
        icon="person"
        iconClass="bg-secondary-fixed text-on-secondary-container"
      >
        <p className="text-on-surface-variant text-label-sm mt-1 opacity-70">
          Rata-rata 42/jam
        </p>
      </StatCard>

      <div className="bg-surface border border-outline-variant p-lg rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] flex items-center gap-4">
        <div className="flex-shrink-0 w-16 h-20 rounded bg-surface-dim overflow-hidden shadow-sm">
          <img
            className="w-full h-full object-cover"
            src={popular.cover}
            alt={`Sampul buku ${popular.title}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-on-surface-variant font-label-md mb-1">
            Buku Terpopuler
          </p>
          <h3 className="text-body-lg font-bold text-primary truncate">
            {popular.title}
          </h3>
          <p className="text-on-surface-variant text-label-sm truncate">
            Dibaca {popular.reads} kali hari ini
          </p>
        </div>
      </div>
    </div>
  )
}
