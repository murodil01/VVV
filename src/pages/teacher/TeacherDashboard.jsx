import { useState } from 'react'

/* ─── Data ────────────────────────────────────────────────── */
const students = [
  { name: 'Anvar',  attendance: '88%',  grade: 'B',  status: 'warning'  },
  { name: 'Malika', attendance: '100%', grade: 'A+', status: 'success'  },
  { name: 'Jules',  attendance: '92%',  grade: 'A',  status: 'success'  },
  { name: 'Priya',  attendance: '75%',  grade: 'C+', status: 'critical' },
  { name: 'Noah',   attendance: '95%',  grade: 'A-', status: 'success'  },
]

const insights = [
  {
    icon: '⚠️',
    title: 'Anvar is struggling with Geometry this week',
    detail: 'Needs help mastering angles and area problems.',
    status: 'warning',
  },
  {
    icon: '🚀',
    title: 'Malika shows 95% logic skills',
    detail: 'Recommended for Math Olympiad and logic puzzles.',
    status: 'success',
  },
  {
    icon: '🔴',
    title: 'Priya missed 2 quizzes in the past week',
    detail: 'Consider additional review sessions and guided practice.',
    status: 'critical',
  },
]

const priorities = [
  'Use AI to group students by skill gaps and assign targeted review packets.',
  'Review weak geometry learners first, then move to enrichment for advanced students.',
]

/* ─── Status helpers ──────────────────────────────────────── */
const statusBadge = {
  success:  'bg-emerald-400/10 text-emerald-300',
  warning:  'bg-amber-400/10  text-amber-300',
  critical: 'bg-rose-400/10   text-rose-300',
}
const statusDot = {
  success:  'bg-emerald-400',
  warning:  'bg-amber-400',
  critical: 'bg-rose-400',
}
const statusLabel = {
  success:  { insight: 'Positive',      table: 'On track' },
  warning:  { insight: 'Needs attention', table: 'Watch'    },
  critical: { insight: 'Critical',       table: 'At risk'  },
}

/* ─── Shared style tokens ─────────────────────────────────── */
const card  = 'rounded-2xl border border-cyan-400/10 bg-white/[0.04] backdrop-blur-xl'
const inner = 'rounded-xl border border-cyan-400/10 bg-[#061227]/90'
const lbl   = 'text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300/60'
const h2cls = 'mt-1.5 text-2xl font-semibold text-white'

/* ─── Component ───────────────────────────────────────────── */
const TeacherDashboard = () => {
  const [topic,        setTopic]        = useState('Geometry strategies')
  const [deadline,     setDeadline]     = useState('2026-05-24')
  const [notification, setNotification] = useState('Ready to distribute the assignment.')

  const handleDistribute = (e) => {
    e.preventDefault()
    setNotification(
      `AI assignment distributed: "${topic}" — deadline ${deadline}. Students will receive personalised practice prompts.`
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6">

        {/* ── Hero banner ─────────────────────────────────── */}
        <div className={`${card} mb-8 p-6 shadow-[0_32px_80px_rgba(0,229,255,0.10)]`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="min-w-0">
              <p className={lbl}>Teacher dashboard</p>
              <h1 className="mt-2 text-2xl font-semibold leading-snug text-white sm:text-3xl">
                AI-powered class oversight
              </h1>
              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Monitor attendance, grades, and AI insights in one Night Sky control room.
                Assign homework faster with AI-driven distribution.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:shrink-0">
              {[
                { label: 'Class average', value: '91%'      },
                { label: 'All alerts',    value: '3'        },
                { label: 'AI insights',   value: 'Realtime' },
              ].map((s) => (
                <div key={s.label} className={`${inner} px-4 py-3 min-w-[120px]`}>
                  <p className={lbl}>{s.label}</p>
                  <p className="mt-1.5 text-xl font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Two-column layout ────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* ── MAIN column ─────────────────────────────────── */}
          <div className="flex min-w-0 flex-col gap-6">

            {/* Smart alerts */}
            <section className={`${card} p-6 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className={lbl}>AI insights</p>
                  <h2 className={h2cls}>Smart alerts</h2>
                </div>
                <p className="text-xs text-slate-500">Updated in real time based on student patterns.</p>
              </div>

              <div className="space-y-3">
                {insights.map((ins) => (
                  <div key={ins.title} className={`${inner} p-4`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">
                          {ins.icon} {ins.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">{ins.detail}</p>
                      </div>
                      <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusBadge[ins.status]}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDot[ins.status]}`} />
                        {statusLabel[ins.status].insight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Student performance table */}
            <section className={`${card} p-6 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>
              <div className="mb-5">
                <p className={lbl}>Class overview</p>
                <h2 className={h2cls}>Student performance</h2>
              </div>

              <div className={`${inner} overflow-hidden`}>
                {/* Table header */}
                <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 sm:grid">
                  {['Name', 'Attendance', 'Avg grade', 'Status'].map((h) => (
                    <span key={h} className={lbl}>{h}</span>
                  ))}
                </div>

                <div className="divide-y divide-cyan-400/10">
                  {students.map((s) => (
                    <div
                      key={s.name}
                      className="grid grid-cols-[1fr_auto] gap-3 px-4 py-4 sm:grid-cols-[2fr_1fr_1fr_1fr] sm:items-center"
                    >
                      {/* Name (always visible) */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{s.name}</p>
                        <p className="text-[11px] text-slate-500">Classroom student</p>
                      </div>

                      {/* Status badge on small screens (top-right) */}
                      <span className={`flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-[11px] font-semibold sm:hidden ${statusBadge[s.status]}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDot[s.status]}`} />
                        {statusLabel[s.status].table}
                      </span>

                      {/* Remaining cols (hidden on mobile) */}
                      <span className="hidden text-sm text-slate-300 sm:block">{s.attendance}</span>
                      <span className="hidden text-sm text-slate-300 sm:block">{s.grade}</span>
                      <span className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold sm:flex ${statusBadge[s.status]}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDot[s.status]}`} />
                        {statusLabel[s.status].table}
                      </span>

                      {/* Attendance + grade below name on mobile */}
                      <div className="flex gap-4 text-xs text-slate-400 sm:hidden">
                        <span>Attendance: <span className="text-slate-200">{s.attendance}</span></span>
                        <span>Grade: <span className="text-slate-200">{s.grade}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ── ASIDE column ─────────────────────────────────── */}
          <aside className="flex min-w-0 flex-col gap-6">

            {/* Assignment manager */}
            <section className={`${card} p-5 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>
              <div className="mb-4">
                <p className={lbl}>Assignment manager</p>
                <h2 className={h2cls}>Distribute via AI</h2>
              </div>

              <form className="space-y-3" onSubmit={handleDistribute}>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Homework topic
                  </label>
                  <input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter assignment topic"
                    className="w-full rounded-lg border border-cyan-400/10 bg-[#061227]/90 px-3 py-2.5
                               text-sm text-white outline-none
                               transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-lg border border-cyan-400/10 bg-[#061227]/90 px-3 py-2.5
                               text-sm text-white outline-none
                               transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20
                               [color-scheme:dark]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-[#0B0F19]
                             transition hover:bg-cyan-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Distribute via AI
                </button>
              </form>

              <div className={`${inner} mt-4 p-4`}>
                <p className={`${lbl} mb-2`}>Latest action</p>
                <p className="text-xs leading-5 text-slate-300">{notification}</p>
              </div>
            </section>

            {/* Focus summary */}
            <section className={`${card} p-5 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className={lbl}>Focus summary</p>
                  <h2 className={h2cls}>Current priorities</h2>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200 whitespace-nowrap">
                  AI-driven
                </span>
              </div>

              <div className="space-y-3">
                {priorities.map((text, i) => (
                  <div key={i} className={`${inner} flex gap-3 p-4`}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-[11px] font-bold text-cyan-300">
                      {i + 1}
                    </span>
                    <p className="text-xs leading-5 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard