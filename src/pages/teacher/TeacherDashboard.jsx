import { useState } from 'react'

const students = [
  { name: 'Anvar', attendance: '88%', grade: 'B', status: 'warning' },
  { name: 'Malika', attendance: '100%', grade: 'A+', status: 'success' },
  { name: 'Jules', attendance: '92%', grade: 'A', status: 'success' },
  { name: 'Priya', attendance: '75%', grade: 'C+', status: 'critical' },
  { name: 'Noah', attendance: '95%', grade: 'A-', status: 'success' },
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

const statusStyles = {
  success: 'bg-emerald-400/10 text-emerald-200',
  warning: 'bg-amber-400/10 text-amber-200',
  critical: 'bg-rose-400/10 text-rose-200',
}

const TeacherDashboard = () => {
  const [topic, setTopic] = useState('Geometry strategies')
  const [deadline, setDeadline] = useState('2026-05-24')
  const [notification, setNotification] = useState('Ready to distribute the assignment.')

  const handleDistribute = (event) => {
    event.preventDefault()
    setNotification(
      `AI assignment distributed: “${topic}” with deadline ${deadline}. Students will receive personalized practice prompts.`
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
        <header className="mb-8 rounded-[2rem] border border-cyan-400/10 bg-white/5 p-7 shadow-[0_40px_120px_rgba(0,229,255,0.12)] backdrop-blur-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Teacher dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">AI-powered class oversight</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Monitor attendance, grades, and AI insights in one Night Sky control room. Assign homework faster with AI-driven distribution.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-cyan-400/10 bg-[#091b33]/90 px-5 py-4">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Class average</p>
                <p className="mt-3 text-3xl font-semibold text-white">91%</p>
              </div>
              <div className="rounded-3xl border border-cyan-400/10 bg-[#091b33]/90 px-5 py-4">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Alerts</p>
                <p className="mt-3 text-3xl font-semibold text-white">3</p>
              </div>
              <div className="rounded-3xl border border-cyan-400/10 bg-[#091b33]/90 px-5 py-4">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">AI insights</p>
                <p className="mt-3 text-3xl font-semibold text-white">Realtime</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <main className="space-y-8">
            <section className="rounded-[2rem] border border-cyan-400/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,229,255,0.1)] backdrop-blur-xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">AI insights</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Smart alerts</h2>
                </div>
                <div className="rounded-3xl bg-[#061227]/95 px-4 py-3 text-sm text-slate-300">
                  Updated in real time based on student performance patterns.
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {insights.map((insight) => (
                  <div
                    key={insight.title}
                    className="rounded-[1.75rem] border border-cyan-400/10 bg-[#061227]/90 p-5 sm:p-6"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">{insight.icon} {insight.title}</p>
                        <p className="mt-2 text-slate-300">{insight.detail}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[insight.status]}`}>
                        {insight.status === 'success'
                          ? 'Positive'
                          : insight.status === 'warning'
                          ? 'Needs attention'
                          : 'Critical'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-cyan-400/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,229,255,0.1)] backdrop-blur-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Class overview</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">Student performance</h2>
                </div>
              </div>
              <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-cyan-400/10 bg-[#061227]/90">
                <div className="grid gap-4 p-4 text-xs uppercase tracking-[0.35em] text-cyan-300/70 sm:grid-cols-[2fr_1fr_1fr_1fr]">
                  <span>Name</span>
                  <span>Attendance</span>
                  <span>Average grade</span>
                  <span>Status</span>
                </div>
                <div className="divide-y divide-cyan-400/10">
                  {students.map((student) => (
                    <div key={student.name} className="grid gap-4 px-4 py-5 sm:grid-cols-[2fr_1fr_1fr_1fr]">
                      <div>
                        <p className="font-semibold text-white">{student.name}</p>
                        <p className="mt-1 text-sm text-slate-400">Classroom student</p>
                      </div>
                      <span className="text-slate-200">{student.attendance}</span>
                      <span className="text-slate-200">{student.grade}</span>
                      <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[student.status]}`}>
                        {student.status === 'success'
                          ? 'On track'
                          : student.status === 'warning'
                          ? 'Watch'
                          : 'At risk'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          <aside className="space-y-8">
            <section className="rounded-[2rem] border border-cyan-400/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,229,255,0.1)] backdrop-blur-xl">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Assignment manager</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Distribute via AI</h2>
              </div>
              <form className="space-y-5" onSubmit={handleDistribute}>
                <label className="block text-sm font-medium text-slate-300">
                  Homework topic
                  <input
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                    className="mt-3 w-full rounded-3xl border border-cyan-400/10 bg-[#061227]/90 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                    placeholder="Enter assignment topic"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-300">
                  Deadline
                  <input
                    type="date"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                    className="mt-3 w-full rounded-3xl border border-cyan-400/10 bg-[#061227]/90 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-[#0B0F19] transition hover:bg-cyan-300"
                >
                  Distribute via AI
                </button>
              </form>
              <div className="mt-6 rounded-[2rem] border border-cyan-400/10 bg-[#091a31]/90 p-5 text-slate-200">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Latest action</p>
                <p className="mt-3 text-sm leading-7">{notification}</p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-cyan-400/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,229,255,0.1)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Focus summary</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Current priorities</h2>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">AI-driven</span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-[1.75rem] bg-[#061227]/90 p-5">
                  <p className="font-semibold text-white">Use AI to group students by skill gaps and assign targeted review packets.</p>
                </div>
                <div className="rounded-[1.75rem] bg-[#061227]/90 p-5">
                  <p className="font-semibold text-white">Review weak geometry learners first, then move to enrichment for advanced students.</p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
