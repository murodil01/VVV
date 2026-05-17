import { Link } from "react-router-dom";

const roles = [
  { title: "Student", description: "Interactive practice, voice tutoring, and progress tracking.", path: "/student" },
  { title: "Teacher", description: "Class oversight, assignment distribution, and AI insights.", path: "/teacher" },
  { title: "Parent", description: "Homework verification, progress summaries, and family learning.", path: "/parent" },
];

const features = [
  "Responsive role-based screens built for mobile first.",
  "Accessible navigation and interactive UI patterns.",
  "Clean dark-glow design with modern spacing and transitions.",
];

const Home = () => {
  return (
    <section className="rounded-[2rem] mt-8 border border-cyan-400/10 bg-[#06122f]/80 p-8 shadow-[0_36px_80px_rgba(0,229,255,0.08)] backdrop-blur-xl sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300/80">VVV EdTech startup</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Night Sky experience for Student, Teacher, and Parent roles.</h1>
          <p className="mt-5 max-w-2xl text-slate-300 sm:text-lg">
            This starter app includes role-based pages, accessible routing, and a modern dashboard interface optimized for every screen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {roles.map((role) => (
              <Link
                key={role.title}
                to={role.path}
                className="inline-flex rounded-full border border-cyan-400/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:bg-cyan-400/10"
              >
                {role.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-cyan-400/10 bg-[#091a31]/90 p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Modern UI highlights</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">Built for clarity and speed</h2>
          <ul className="mt-6 space-y-4 text-slate-300">
            {features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="mt-1 text-cyan-300">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {roles.map((role) => (
          <Link
            key={role.title}
            to={role.path}
            className="group rounded-[1.75rem] border border-cyan-400/10 bg-[#061227]/90 p-6 text-white transition hover:-translate-y-1 hover:bg-[#0d1f3a]/95"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">{role.title}</p>
            <p className="mt-4 text-base font-semibold leading-7 text-white">{role.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 group-hover:text-cyan-100">
              Explore role
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
