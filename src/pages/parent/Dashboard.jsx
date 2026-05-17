import { useState } from 'react'

/* ─── Data ────────────────────────────────────────────────── */
const weeklyActivity = [
  { day: 'Mon', value: 70 },
  { day: 'Tue', value: 80 },
  { day: 'Wed', value: 90 },
  { day: 'Thu', value: 85 },
  { day: 'Fri', value: 95 },
  { day: 'Sat', value: 65 },
  { day: 'Sun', value: 72 },
]

const skillProgress = [
  { label: 'Logic',      value: 90 },
  { label: 'Creativity', value: 70 },
  { label: 'Languages',  value: 60 },
]

const recentGrades = [
  { subject: 'Math',    grade: 'A-' },
  { subject: 'English', grade: 'B+' },
  { subject: 'Science', grade: 'A'  },
]

const lessons = [
  { title: 'Basic English for Mothers', time: '15 min' },
  { title: 'Refresher Math',            time: '15 min' },
  { title: 'Parenting Study Tips',      time: '15 min' },
]

/* ─── Shared style tokens ─────────────────────────────────── */
const card   = 'rounded-2xl border border-cyan-400/10 bg-white/[0.04] backdrop-blur-xl'
const inner  = 'rounded-xl border border-cyan-400/10 bg-[#061227]/90'
const label  = 'text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300/60'
const h2     = 'mt-1.5 text-2xl font-semibold text-white'
const badge  = 'rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200 whitespace-nowrap'

/* ─── Component ───────────────────────────────────────────── */
const ParentDashboard = () => {
  const [uploadName,  setUploadName]  = useState('No file selected')
  const [isScanning,  setIsScanning]  = useState(false)
  const [scanResult,  setScanResult]  = useState('Upload a homework photo to verify with AI.')

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadName(file.name)
    setScanResult('Ready to verify: ' + file.name)
  }

  const verifyHomework = () => {
    if (uploadName === 'No file selected') {
      setScanResult('Please upload a photo of homework first.')
      return
    }
    setIsScanning(true)
    setScanResult('Verifying with AI…')
    setTimeout(() => {
      setIsScanning(false)
      setScanResult('AI Feedback: 4/5 Correct. Fix problem #3 in the algebra section.')
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100">
      <div className="mx-auto w-full max-w-[1200px] px-0 py-8 sm:px-6">

        {/* ── Hero banner ─────────────────────────────────── */}
        <div className={`${card} mb-8 p-6 shadow-[0_32px_80px_rgba(0,229,255,0.10)]`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Left copy */}
            <div className="min-w-0">
              <p className={label}>Parent dashboard</p>
              <h1 className="mt-2 text-2xl font-semibold leading-snug text-white sm:text-3xl">
                Track your child's growth with AI guidance
              </h1>
              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Follow weekly progress, future skill paths, and premium AI homework verification
                from the Night Sky parent portal.
              </p>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              {[
                { label: 'Current streak', value: '12 days'   },
                { label: 'Recent grade',   value: 'A– Science' },
                { label: 'Confidence',     value: 'High'       },
              ].map((s) => (
                <div key={s.label} className={`${inner} px-4 py-3 min-w-[120px]`}>
                  <p className={label}>{s.label}</p>
                  <p className="mt-1.5 text-xl font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Two-column layout ────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* ── MAIN column ─────────────────────────────────── */}
          <div className="flex min-w-0 flex-col gap-6">

            {/* Progress tracker card */}
            <section className={`${card} p-6 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className={label}>Child progress tracker</p>
                  <h2 className={h2}>Weekly activity & grades</h2>
                </div>
                <p className="text-xs text-slate-400">Based on recent activity &amp; performance</p>
              </div>

              <div className="grid gap-5 md:grid-cols-[1fr_220px]">

                {/* Bar chart */}
                <div className={`${inner} p-5`}>
                  <p className={label}>Weekly activity</p>
                  <div className="mt-5 flex items-end justify-between gap-2">
                    {weeklyActivity.map((item) => (
                      <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                        <div className="relative flex h-36 w-full items-end overflow-hidden rounded-lg bg-slate-900/80">
                          <div
                            className="w-full rounded-lg bg-gradient-to-b from-cyan-400 to-sky-600 transition-all duration-500"
                            style={{ height: `${item.value}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Streak + grades */}
                <div className="flex flex-col gap-4">
                  <div className={`${inner} p-4`}>
                    <p className={label}>Current streak</p>
                    <p className="mt-2 text-3xl font-semibold text-white">12 days</p>
                    <p className="mt-1 text-xs text-slate-400">Keep the momentum going daily.</p>
                  </div>

                  <div className={`${inner} flex-1 p-4`}>
                    <p className={`${label} mb-3`}>Recent grades</p>
                    <div className="space-y-2">
                      {recentGrades.map((g) => (
                        <div
                          key={g.subject}
                          className="flex items-center justify-between rounded-lg bg-[#0e1c35]/80 px-3 py-2.5"
                        >
                          <div>
                            <p className="text-sm font-medium text-white">{g.subject}</p>
                            <p className="text-[11px] text-slate-500">Latest assessment</p>
                          </div>
                          <span className={badge}>{g.grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Career Prediction card */}
            <section className={`${card} p-6 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className={label}>AI Future Path Navigator</p>
                  <h2 className={h2}>AI Career Prediction</h2>
                </div>
                <span className={badge}>Skill-focused</span>
              </div>

              <div className="space-y-3">
                {skillProgress.map((skill) => (
                  <div key={skill.label} className={`${inner} p-4`}>
                    <div className="mb-2.5 flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">{skill.label}</p>
                      <span className="text-xs text-slate-400">{skill.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-900/80">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={`${inner} mt-5 p-5`}>
                <p className={`${label} mb-3`}>Prediction summary</p>
                <p className="text-sm leading-7 text-slate-300">
                  Your child is leaning heavily towards Computer Science and Software Engineering,
                  with strong logic skills and growing creativity. Support them with coding
                  challenges and collaborative projects.
                </p>
              </div>
            </section>

            {/* Parallel learning — full width at bottom of main col */}
            <section className={`${card} p-6 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className={label}>Parallel learning</p>
                  <h2 className={h2}>Learn together with your child</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Guided mini-lessons and shared tasks designed for busy families.
                  </p>
                </div>
                <span className={`${badge} self-start`}>Shared study sessions</span>
              </div>

              <div className="grid gap-5 sm:grid-cols-[1fr_220px]">

                {/* Lessons list */}
                <div className={`${inner} p-5`}>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className={label}>Today's guide</p>
                      <p className="mt-1 text-base font-semibold text-white">Active study routine</p>
                    </div>
                    <span className={badge}>3 lessons · 15 min</span>
                  </div>

                  <div className="space-y-3">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.title}
                        className="flex items-center justify-between gap-4 rounded-xl border border-cyan-400/10 bg-[#091a31]/90 px-4 py-3
                                   transition duration-200 hover:-translate-y-px hover:border-cyan-300/25"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">{lesson.title}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{lesson.time}</p>
                        </div>
                        <button
                          type="button"
                          className="shrink-0 rounded-full bg-cyan-400 px-3.5 py-1.5 text-xs font-semibold text-[#0B0F19]
                                     transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                        >
                          Start
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why it works + signals */}
                <div className="flex flex-col gap-4">
                  <div className={`${inner} p-4`}>
                    <p className={`${label} mb-3`}>Why it works</p>
                    <ul className="space-y-2.5">
                      {[
                        'Short lessons keep focus and motivation high.',
                        'Clear next steps help parents guide without extra prep.',
                        'Scales from quick sessions to deeper review time.',
                      ].map((tip) => (
                        <li key={tip} className="flex gap-2.5 text-xs leading-5 text-slate-300">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-cyan-500/15 text-[10px] text-cyan-300">✓</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`${inner} flex-1 p-4`}>
                    <p className={`${label} mb-3`}>Learning signals</p>
                    <div className="space-y-2.5">
                      {[
                        { title: 'Family review',     desc: 'Pause and ask one quick question after each lesson.' },
                        { title: 'Confidence check',  desc: 'Easy recall = the lesson landed well.' },
                      ].map((s) => (
                        <div key={s.title} className="rounded-lg bg-[#0d1f38]/80 p-3">
                          <p className="text-xs font-semibold text-white">{s.title}</p>
                          <p className="mt-1 text-[11px] leading-4 text-slate-400">{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── ASIDE column ─────────────────────────────────── */}
          <aside className="flex min-w-0 flex-col gap-6">

            {/* HW Camera Scan */}
            <section className={`${card} p-5 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className={label}>⭐ Premium</p>
                  <h2 className={h2}>HW Camera Scan</h2>
                </div>
                <span className={badge}>Premium</span>
              </div>

              <div className={`${inner} space-y-3 p-4`}>
                {/* File input */}
                <div>
                  <p className="mb-2 text-xs font-medium text-slate-400">Upload homework photo</p>
                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-2 rounded-lg border border-dashed border-cyan-400/20 bg-[#091a31]/80
                                    px-3 py-2.5 text-xs text-slate-400 transition hover:border-cyan-400/40 hover:text-slate-200">
                      <svg className="h-4 w-4 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                      </svg>
                      <span className="truncate">{uploadName}</span>
                    </div>
                  </label>
                </div>

                {/* Verify button */}
                <button
                  type="button"
                  onClick={verifyHomework}
                  disabled={isScanning}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5
                             text-sm font-semibold text-[#0B0F19] transition
                             hover:bg-cyan-300 disabled:opacity-60
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {isScanning && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" opacity="0.25" />
                      <path strokeLinecap="round" d="M22 12a10 10 0 0 1-10 10" />
                    </svg>
                  )}
                  {isScanning ? 'Verifying…' : 'Verify with AI'}
                </button>

                {/* Result */}
                <div className="rounded-lg bg-[#091a31]/80 p-3">
                  <p className={`${label} mb-2`}>AI result</p>
                  <p className="text-xs leading-5 text-slate-300">{scanResult}</p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default ParentDashboard