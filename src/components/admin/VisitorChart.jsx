import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const FALLBACK_7 = [
  { day: 'Sen', value: 420, height: '60%', bar: 'bg-primary-container/20' },
  { day: 'Sel', value: 310, height: '45%', bar: 'bg-primary-container/20' },
  { day: 'Rab', value: 640, height: '85%', bar: 'bg-primary-container/40' },
  { day: 'Kam', value: 520, height: '70%', bar: 'bg-primary-container/20' },
  { day: 'Jum', value: 710, height: '95%', bar: 'bg-primary-container/30' },
  { day: 'Sab', value: 580, height: '80%', bar: 'bg-primary' },
  { day: 'Min', value: 380, height: '55%', bar: 'bg-primary-container/20' },
]

function buildRows(data) {
  if (!data || data.length === 0) return FALLBACK_7
  const max = Math.max(...data.map((d) => d.visitor_count), 1)
  return data.map((d) => {
    const value = d.visitor_count
    const isMax = value === max
    return {
      day: d.day_label,
      value,
      height: `${Math.max(8, Math.round((value / max) * 100))}%`,
      bar: isMax ? 'bg-primary' : 'bg-primary-container/30',
    }
  })
}

export default function VisitorChart() {
  const [range, setRange] = useState('7')
  const [rows, setRows] = useState(FALLBACK_7)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data, error } = await supabase
        .from('visitor_stats')
        .select('day_label, visitor_count')
        .order('stat_date', { ascending: true })
        .limit(range === '7' ? 7 : 30)
      if (cancelled) return
      if (!error && data) {
        setRows(buildRows(data))
      } else {
        setRows(FALLBACK_7)
      }
      setMounted(true)
    }
    load().catch(() => {
      if (!cancelled) setMounted(true)
    })
    return () => {
      cancelled = true
    }
  }, [range])

  return (
    <div className="lg:col-span-2 bg-surface border border-outline-variant p-lg rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center mb-xl">
        <h3 className="font-headline-md text-headline-md text-on-background">
          Tren Pengunjung
        </h3>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-surface-container border border-outline-variant rounded-lg text-label-md px-3 py-1 text-on-surface-variant focus:outline-none focus:border-primary"
        >
          <option value="7">7 Hari Terakhir</option>
          <option value="30">30 Hari Terakhir</option>
        </select>
      </div>

      <div className="relative h-64 flex items-end justify-between gap-2 px-2 border-b border-outline-variant mb-6">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
          <div className="border-t border-on-surface"></div>
          <div className="border-t border-on-surface"></div>
          <div className="border-t border-on-surface"></div>
          <div className="border-t border-on-surface"></div>
        </div>

        {rows.map((d) => (
          <div
            key={d.day}
            className={`w-full ${d.bar} rounded-t-lg chart-bar hover:bg-primary transition-colors cursor-pointer group relative`}
            style={{
              height: mounted ? d.height : '0%',
              transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-background text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {d.value}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-label-sm text-on-surface-variant px-2">
        {rows.map((d) => (
          <span key={d.day}>{d.day}</span>
        ))}
      </div>
    </div>
  )
}
