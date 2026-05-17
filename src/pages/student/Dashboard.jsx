import { useEffect, useRef, useState } from 'react'

/* ─── Data ────────────────────────────────────────────────── */
const classroomLeaderboard = [
  { name: 'Mia',  points: 980, avatar: 'M' },
  { name: 'Noah', points: 945, avatar: 'N' },
  { name: 'Ava',  points: 912, avatar: 'A' },
  { name: 'Leo',  points: 878, avatar: 'L' },
  { name: 'Zoe',  points: 850, avatar: 'Z' },
]

const initialQuests = [
  { label: 'Complete Math Quiz',         done: false },
  { label: 'Talk to AI Tutor',           done: false },
  { label: 'Review yesterday\'s lesson', done: false },
]

/* ─── AI response generator ───────────────────────────────── */
const generateAIResponse = (message) => {
  const lower = message.toLowerCase()
  if (lower.includes('fraction'))
    return 'Imagine a pizza split into 4 equal slices. If you eat 1 slice, that is 1/4 of the pizza — the numerator is the slices you ate, and the denominator is the total slices. Fractions are just parts of a whole!'
  if (lower.includes('understand'))
    return 'Think of percentages like a football field: 100% is the entire field, and 25% is just one quarter of it. This helps you see how much of the whole you have learned.'
  return 'Nice question! In math, we break difficult ideas into smaller pieces. I\'m here to make the next step easy and fun.'
}

/* ─── Shared style tokens ─────────────────────────────────── */
const card  = 'rounded-2xl border border-cyan-400/10 bg-white/[0.04] backdrop-blur-xl'
const inner = 'rounded-xl border border-cyan-400/10 bg-[#061227]/90'
const lbl   = 'text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300/60'
const h2cls = 'mt-1.5 text-2xl font-semibold text-white'
const badge = 'rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200 whitespace-nowrap'

/* ─── Component ───────────────────────────────────────────── */
const Dashboard = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript,  setTranscript]  = useState('Tap the mic and ask your tutor anything.')
  const [aiResponse,  setAiResponse]  = useState('Ready to help you learn with a Night Sky glow.')
  const [history,     setHistory]     = useState([])
  const [quests,      setQuests]      = useState(initialQuests)
  const recognitionRef = useRef(null)

  /* ── Speech recognition setup ── */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null
    if (!SR) return
    const r = new SR()
    r.continuous = false
    r.interimResults = true
    r.lang = 'en-US'
    r.onresult = (e) => {
      const last = e.results[e.results.length - 1]
      const text = last[0]?.transcript || ''
      setTranscript(text)
      if (last.isFinal) {
        const res = generateAIResponse(text)
        setAiResponse(res)
        setHistory((p) => [{ role: 'student', text }, { role: 'assistant', text: res }, ...p])
      }
    }
    r.onend = () => setIsListening(false)
    recognitionRef.current = r
  }, [])

  const handleMicClick = () => {
    if (isListening) { recognitionRef.current?.stop(); return }
    const r = recognitionRef.current
    if (r) {
      setIsListening(true)
      setTranscript('Listening… speak naturally.')
      setAiResponse('Waiting for your question…')
      r.start()
      return
    }
    /* Fallback simulation */
    setIsListening(true)
    setTranscript('Listening…')
    setAiResponse('Simulating voice input…')
    setTimeout(() => {
      const mock = "I don't understand fractions..."
      setTranscript(mock)
      const res = generateAIResponse(mock)
      setAiResponse(res)
      setHistory((p) => [{ role: 'student', text: mock }, { role: 'assistant', text: res }, ...p])
      setIsListening(false)
    }, 1600)
  }

  const toggleQuest = (i) =>
    setQuests((q) => q.map((item, idx) => idx === i ? { ...item, done: !item.done } : item))

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6">

        {/* ── Hero banner ─────────────────────────────────── */}
        <div className={`${card} mb-8 p-6 shadow-[0_32px_80px_rgba(0,229,255,0.10)]`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className={lbl}>Student dashboard</p>
              <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Skyward Learning</h1>
              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Your voice tutor is ready. Speak naturally and watch the Night Sky AI explain
                lessons in friendly, story-driven language.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              {[
                { label: 'XP',     value: '1,420'       },
                { label: 'Streak', value: '5 Days 🔥'   },
                { label: 'Level',  value: 'Star Learner' },
              ].map((s) => (
                <div key={s.label} className={`${inner} px-4 py-3 min-w-[110px]`}>
                  <p className={lbl}>{s.label}</p>
                  <p className="mt-1.5 text-lg font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Two-column layout ────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

          {/* ── MAIN column ─────────────────────────────────── */}
          <div className="flex min-w-0 flex-col gap-6">

            {/* Student profile + mic */}
            <section className={`${card} p-5 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>

              {/* Profile row */}
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl
                                  bg-gradient-to-br from-cyan-500/20 to-sky-500/20
                                  text-xl font-bold text-cyan-200
                                  shadow-[0_0_24px_rgba(0,229,255,0.12)]">
                    S
                  </div>
                  <div>
                    <p className={lbl}>Student</p>
                    <h2 className="mt-0.5 text-lg font-semibold text-white">Skyla Rivera</h2>
                    <p className="text-xs text-slate-400">Voice tutor ready for fractions, word problems &amp; more.</p>
                  </div>
                </div>
                <div className={`${inner} px-4 py-3 text-center`}>
                  <p className={lbl}>Today's energy</p>
                  <p className="mt-1 text-2xl font-semibold text-white">+48</p>
                  <p className="text-[11px] text-slate-500">Keep your streak going!</p>
                </div>
              </div>

              {/* Mic button */}
              <div className={`${inner} flex flex-col items-center py-8`}>
                <p className={`${lbl} mb-5`}>Voice AI tutor</p>
                <button
                  type="button"
                  onClick={handleMicClick}
                  aria-pressed={isListening}
                  className={[
                    'relative flex h-28 w-28 items-center justify-center rounded-full',
                    'bg-cyan-400 text-[#0B0F19]',
                    'shadow-[0_0_60px_rgba(0,229,255,0.30)]',
                    'transition-transform duration-300',
                    isListening ? 'scale-105' : 'hover:scale-105',
                  ].join(' ')}
                >
                  {isListening && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/40" />
                  )}
                  <span className="relative z-10 text-4xl">🎙️</span>
                </button>
                <p className="mt-4 text-base font-medium text-white">
                  {isListening ? 'Listening…' : 'Tap to start voice learning'}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Speak a question and your AI tutor will reply instantly.
                </p>
              </div>
            </section>

            {/* Transcript + AI response */}
            <div className="grid gap-4 sm:grid-cols-2">
              <article className={`${card} p-5`}>
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className={lbl}>Live transcript</p>
                    <h3 className={h2cls}>Student voice</h3>
                  </div>
                  <span className={badge}>{isListening ? 'Listening' : 'Ready'}</span>
                </div>
                <div className={`${inner} p-4`}>
                  <p className={`${lbl} mb-2`}>Student</p>
                  <p className="text-sm leading-6 text-slate-200">"{transcript}"</p>
                </div>
              </article>

              <article className={`${card} p-5`}>
                <div className="mb-4">
                  <p className={lbl}>AI tutor response</p>
                  <h3 className={h2cls}>Tutor</h3>
                </div>
                <div className={`${inner} p-4`}>
                  <p className="text-sm leading-6 text-slate-200">{aiResponse}</p>
                </div>
              </article>
            </div>

            {/* Conversation history */}
            <section className={`${card} p-5`}>
              <p className={`${lbl} mb-4`}>Conversation history</p>
              <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                {history.length === 0 ? (
                  <p className="text-xs text-slate-500">Your previous voice interactions will appear here.</p>
                ) : (
                  history.map((entry, i) => (
                    <div key={`${entry.role}-${i}`} className={`${inner} p-3`}>
                      <p className={`${lbl} mb-1`}>{entry.role === 'student' ? 'Student' : 'Tutor'}</p>
                      <p className="text-xs leading-5 text-slate-300">{entry.text}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* ── ASIDE column ─────────────────────────────────── */}
          <aside className="flex min-w-0 flex-col gap-6">

            {/* Leaderboard */}
            <section className={`${card} p-5 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className={lbl}>Class leaderboard</p>
                  <h2 className={h2cls}>Top 5 classmates</h2>
                </div>
                <span className={badge}>Active</span>
              </div>

              <ul className="space-y-2.5">
                {classroomLeaderboard.map((s, idx) => (
                  <li
                    key={s.name}
                    className={`${inner} flex items-center justify-between gap-3 p-3`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                                      bg-cyan-400/10 text-sm font-bold text-cyan-200">
                        {s.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{s.name}</p>
                        <p className="text-[11px] text-slate-500">Rank #{idx + 1}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-cyan-300">
                      {s.points} XP
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Daily quests */}
            <section className={`${card} p-5 shadow-[0_24px_64px_rgba(0,229,255,0.08)]`}>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className={lbl}>Daily quests</p>
                  <h2 className={h2cls}>Today's focus</h2>
                </div>
                <span className={badge}>3 tasks</span>
              </div>

              <div className="space-y-2.5">
                {quests.map((quest, idx) => (
                  <button
                    key={quest.label}
                    type="button"
                    onClick={() => toggleQuest(idx)}
                    className={[
                      'group flex w-full items-center justify-between gap-3',
                      'rounded-xl border px-4 py-3 text-left',
                      'transition-all duration-200',
                      quest.done
                        ? 'border-cyan-400/20 bg-cyan-500/[0.06]'
                        : 'border-cyan-400/10 bg-[#061227]/90 hover:border-cyan-400/25',
                    ].join(' ')}
                  >
                    <div className="min-w-0">
                      <p className={`truncate text-sm font-medium ${quest.done ? 'text-cyan-300 line-through decoration-cyan-400/40' : 'text-white'}`}>
                        {quest.label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {quest.done ? 'Completed ✓' : 'Tap to mark complete'}
                      </p>
                    </div>
                    <span className={[
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm transition-all',
                      quest.done
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'bg-slate-900/80 text-slate-400 group-hover:text-slate-200',
                    ].join(' ')}>
                      {quest.done ? '✓' : '+'}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Dashboard