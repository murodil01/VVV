import { Link } from "react-router-dom";

/* ─── Data ────────────────────────────────────────────────── */
const roles = [
  {
    title: "Student",
    description: "Interactive practice, voice tutoring, and progress tracking.",
    path: "/student",
    icon: "🎓",
  },
  {
    title: "Teacher",
    description: "Class oversight, assignment distribution, and AI insights.",
    path: "/teacher",
    icon: "🏫",
  },
  {
    title: "Parent",
    description: "Homework verification, progress summaries, and family learning.",
    path: "/parent",
    icon: "👨‍👩‍👧",
  },
];

const features = [
  "Responsive role-based screens built for mobile first.",
  "Accessible navigation and interactive UI patterns.",
  "Clean dark-glow design with modern spacing and transitions.",
];

/* ─── Shared tokens ───────────────────────────────────────── */
const card  = "rounded-2xl border border-cyan-400/10 bg-white/[0.04] backdrop-blur-xl";
const inner = "rounded-xl border border-cyan-400/10 bg-[#061227]/90";
const lbl   = "text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300/60";

/* ─── Component ───────────────────────────────────────────── */
const Home = () => (
  <div className="mx-auto w-full max-w-[1200px] py-8">

    {/* ── Hero section ──────────────────────────────────── */}
    <div className={`${card} mb-6 p-6 shadow-[0_32px_80px_rgba(0,229,255,0.09)] sm:p-8`}>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

        {/* Left — copy */}
        <div className="min-w-0">
          <p className={lbl}>VVV EdTech startup</p>
          <h1 className="mt-2 text-2xl font-semibold leading-snug text-white sm:text-3xl lg:text-4xl">
            Night Sky experience for{" "}
            <span className="text-cyan-300">Student</span>,{" "}
            <span className="text-cyan-300">Teacher</span>, and{" "}
            <span className="text-cyan-300">Parent</span> roles.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
            Role-based pages, accessible routing, and a modern dashboard interface
            optimised for every screen size.
          </p>

          {/* Quick-nav pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {roles.map((role) => (
              <Link
                key={role.title}
                to={role.path}
                className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20
                           bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white
                           transition hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-100"
              >
                <span>{role.icon}</span>
                {role.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Right — highlights */}
        <div className={`${inner} p-5`}>
          <p className={lbl}>Modern UI highlights</p>
          <h2 className="mt-1.5 text-lg font-semibold text-white">Built for clarity and speed</h2>
          <ul className="mt-4 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm leading-5 text-slate-400">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center
                                 rounded bg-cyan-500/15 text-[10px] text-cyan-300">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* ── Role cards ────────────────────────────────────── */}
    <div className="grid gap-4 sm:grid-cols-3">
      {roles.map((role) => (
        <Link
          key={role.title}
          to={role.path}
          className={[
            "group flex flex-col rounded-2xl border border-cyan-400/10",
            "bg-[#061227]/90 p-5",
            "transition-all duration-200",
            "hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-[#0d1f3a]/90",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
          ].join(" ")}
        >
          {/* Icon */}
          <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl
                           bg-cyan-500/10 text-xl">
            {role.icon}
          </span>

          <p className={lbl}>{role.title}</p>
          <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">{role.description}</p>

          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold
                           text-cyan-400/70 transition group-hover:text-cyan-300">
            Explore role
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </Link>
      ))}
    </div>
  </div>
);

export default Home;