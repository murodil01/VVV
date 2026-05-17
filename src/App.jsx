import { useState } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/student/Dashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ParentDashboard from "./pages/parent/Dashboard";
import NotFound from "./pages/NotFound";
import VVV from "./assets/VVV.png";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/student", label: "Student" },
  { to: "/teacher", label: "Teacher" },
  { to: "/parent", label: "Parent" },
];

const activeLink = ({ isActive }) =>
  isActive
    ? "rounded-full bg-cyan-400/15 px-4 py-2 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.18)]"
    : "rounded-full px-4 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white";

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#040d21] text-white">
        <header className="fixed top-0 left-0 z-[1000] w-full border-b border-cyan-400/10 bg-[#06122f]/95 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <div className="mx-auto flex h-[88px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-4 min-w-0">
              <img src={VVV} alt="VVV logo" className="h-10 w-auto object-contain md:h-12" />
            </div>

            <nav className="hidden flex-wrap items-center gap-3 md:flex">
              {navLinks.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={activeLink}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setIsNavOpen((open) => !open)}
              aria-expanded={isNavOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-white/5 text-cyan-200 transition hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 md:hidden"
              aria-label="Toggle navigation"
            >
              <span className="text-lg">{isNavOpen ? "✕" : "☰"}</span>
            </button>
          </div>

          {isNavOpen ? (
            <div className="absolute inset-x-0 top-full z-[1001] border-t border-cyan-400/10 bg-[#06122f]/95 px-4 py-4 shadow-[0_40px_80px_rgba(0,0,0,0.35)] md:hidden">
              <div className="mx-auto max-w-[1200px]">
                <nav className="flex flex-col gap-3">
                  {navLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      className={activeLink}
                      onClick={() => setIsNavOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          ) : null}
        </header>

        <div className="mx-auto w-full max-w-[1200px] px-4 pt-[88px] pb-6 sm:px-6 lg:px-10">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/student" element={<Dashboard />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/parent" element={<ParentDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
