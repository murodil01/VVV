import { useEffect, useRef, useState } from 'react'

const classroomLeaderboard = [
  { name: 'Mia', points: 980, avatar: 'M' },
  { name: 'Noah', points: 945, avatar: 'N' },
  { name: 'Ava', points: 912, avatar: 'A' },
  { name: 'Leo', points: 878, avatar: 'L' },
  { name: 'Zoe', points: 850, avatar: 'Z' },
]

const initialQuests = [
  { label: 'Complete Math Quiz', done: false },
  { label: 'Talk to AI Tutor', done: false },
  { label: 'Review yesterday’s lesson', done: false },
]

const generateAIResponse = (message) => {
  const lower = message.toLowerCase()

  if (lower.includes('fraction')) {
    return (
      'Imagine a pizza split into 4 equal slices. If you eat 1 slice, that is 1/4 of the pizza — the numerator is the slices you ate, and the denominator is the total slices. ' +
      'So, fractions are just parts of a whole, like a team sharing one football field into equal zones.'
    )
  }

  if (lower.includes('understand')) {
    return (
      'Think of percentages like a football field: 100% is the entire field, and 25% is just one quarter of it. ' +
      'This helps you know how much of the whole you have learned.'
    )
  }

  return (
    'Nice question! In math, we break difficult ideas into smaller pieces. I’m here to make the next step easy and fun.'
  )
}

const Dashboard = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('Tap the mic and ask your tutor anything.')
  const [aiResponse, setAiResponse] = useState('Ready to help you learn with a Night Sky glow.')
  const [history, setHistory] = useState([])
  const [quests, setQuests] = useState(initialQuests)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition || null

    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1]
      const text = lastResult[0]?.transcript || ''
      setTranscript(text)

      if (lastResult.isFinal) {
        const response = generateAIResponse(text)
        setAiResponse(response)
        setHistory((prev) => [
          { role: 'student', text },
          { role: 'assistant', text: response },
          ...prev,
        ])
      }
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
  }, [])

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      return
    }

    const recognition = recognitionRef.current

    if (recognition) {
      setIsListening(true)
      setTranscript('Listening... speak naturally into your microphone.')
      setAiResponse('I’m waiting for your question...')
      recognition.start()
      return
    }

    setIsListening(true)
    setTranscript('Listening...')
    setAiResponse('Simulating voice input...')

    setTimeout(() => {
      const mockPhrase = "I don't understand fractions..."
      setTranscript(mockPhrase)
      const response = generateAIResponse(mockPhrase)
      setAiResponse(response)
      setHistory((prev) => [
        { role: 'student', text: mockPhrase },
        { role: 'assistant', text: response },
        ...prev,
      ])
      setIsListening(false)
    }, 1600)
  }

  const toggleQuest = (index) => {
    setQuests((current) =>
      current.map((quest, idx) =>
        idx === index ? { ...quest, done: !quest.done } : quest
      )
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
        <div className="mb-8 rounded-[2rem] border border-cyan-400/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,229,255,0.1)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Student Dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Skyward Learning</h1>
              <p className="mt-2 max-w-2xl text-slate-300">
                Your voice tutor is ready. Speak naturally and watch the Night Sky AI explain lessons in friendly, story-driven language.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-cyan-400/10 bg-[#091b33]/90 px-5 py-4">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">XP</p>
                <p className="mt-3 text-3xl font-semibold text-white">1,420</p>
              </div>
              <div className="rounded-3xl border border-cyan-400/10 bg-[#091b33]/90 px-5 py-4">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Streak</p>
                <p className="mt-3 text-3xl font-semibold text-white">5 Days 🔥</p>
              </div>
              <div className="rounded-3xl border border-cyan-400/10 bg-[#091b33]/90 px-5 py-4">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Level</p>
                <p className="mt-3 text-3xl font-semibold text-white">Star Learner</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
          <section className="space-y-8 rounded-[2rem] border border-cyan-400/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,229,255,0.1)] backdrop-blur-xl">
            <div className="flex flex-col gap-5 rounded-[2rem] border border-cyan-400/10 bg-[#091a31]/90 p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 text-3xl font-semibold text-cyan-100 shadow-[0_20px_80px_rgba(0,229,255,0.15)]">
                    S
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Student</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Skyla Rivera</h2>
                    <p className="mt-1 text-slate-300">Voice tutor ready for fractions, word problems, and more.</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-cyan-400/10 bg-[#061227]/80 p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Today’s energy</p>
                  <p className="mt-3 text-3xl font-semibold text-white">+48</p>
                  <p className="mt-1 text-slate-400">Keep your streak going!</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-cyan-400/10 bg-[#061227]/80 p-8 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Voice AI tutor</p>
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`relative mx-auto mt-6 flex h-36 w-36 items-center justify-center rounded-full bg-cyan-400 text-[#0B0F19] shadow-[0_0_80px_rgba(0,229,255,0.35)] transition-transform duration-300 ${
                    isListening ? 'scale-105' : 'hover:scale-105'
                  }`}
                  aria-pressed={isListening}
                >
                  <span className="absolute inset-0 rounded-full border border-cyan-200/30"></span>
                  <span className={`absolute inset-0 rounded-full bg-cyan-400/40 ${isListening ? 'animate-pulse' : ''}`} />
                  <span className="relative z-10 text-5xl">🎙️</span>
                </button>
                <p className="mt-5 text-lg font-medium text-white">Tap to start voice learning</p>
                <p className="mt-2 text-sm text-slate-300">Speak a question, and your AI tutor will reply instantly.</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-[2rem] border border-cyan-400/10 bg-[#091a31]/90 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Live transcript</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Student voice</h3>
                  </div>
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
                    {isListening ? 'Listening' : 'Ready'}
                  </span>
                </div>
                <div className="mt-6 rounded-[1.75rem] border border-cyan-400/10 bg-[#061227]/80 p-5 text-slate-200">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/60">Student</p>
                  <p className="mt-3 whitespace-pre-wrap text-lg leading-8 text-white">"{transcript}"</p>
                </div>
              </article>

              <article className="rounded-[2rem] border border-cyan-400/10 bg-[#091a31]/90 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">AI tutor response</p>
                <div className="mt-6 rounded-[1.75rem] border border-cyan-400/10 bg-[#061227]/80 p-5 text-slate-200">
                  <p className="text-lg leading-8 text-white">{aiResponse}</p>
                </div>
              </article>
            </div>

            <div className="rounded-[2rem] border border-cyan-400/10 bg-[#091a31]/90 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Conversation history</p>
              <div className="mt-5 space-y-4 max-h-80 overflow-y-auto pr-2">
                {history.length === 0 ? (
                  <p className="text-slate-400">Your previous voice interactions will appear here.</p>
                ) : (
                  history.map((entry, index) => (
                    <div key={`${entry.role}-${index}`} className="rounded-3xl border border-cyan-400/10 bg-[#061227]/90 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/60">{entry.role === 'student' ? 'Student' : 'Tutor'}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-200">{entry.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-8">
            <section className="rounded-[2rem] border border-cyan-400/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,229,255,0.08)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Class leaderboard</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Top 5 classmates</h2>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">Active</span>
              </div>
              <ul className="mt-6 space-y-4">
                {classroomLeaderboard.map((student, idx) => (
                  <li key={student.name} className="flex items-center justify-between rounded-[1.75rem] border border-cyan-400/10 bg-[#061227]/90 p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-xl font-semibold text-cyan-100">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-white">{student.name}</p>
                        <p className="text-sm text-slate-400">Class rank {idx + 1}</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-cyan-200">{student.points} XP</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-cyan-400/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,229,255,0.08)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Daily quests</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Today’s focus</h2>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">3 tasks</span>
              </div>
              <div className="mt-6 space-y-4">
                {quests.map((quest, idx) => (
                  <button
                    key={quest.label}
                    type="button"
                    onClick={() => toggleQuest(idx)}
                    className="group flex w-full items-center justify-between rounded-3xl border border-cyan-400/10 bg-[#061227]/90 px-4 py-4 text-left transition hover:border-cyan-200/40"
                  >
                    <div>
                      <p className={`text-base font-medium ${quest.done ? 'text-cyan-200' : 'text-white'}`}>
                        {quest.label}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        {quest.done ? 'Completed' : 'Tap to mark complete'}
                      </p>
                    </div>
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl text-lg ${quest.done ? 'bg-cyan-500/20 text-cyan-200' : 'bg-slate-900/80 text-slate-300'}`}>
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
