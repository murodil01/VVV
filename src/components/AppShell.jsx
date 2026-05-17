const AppShell = ({ title, description, children }) => {
  return (
    <div className="rounded-[2rem] border border-cyan-400/10 bg-[#06122f]/80 p-8 shadow-[0_36px_90px_rgba(0,229,255,0.08)] backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">VVV role starter</p>
        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
        <p className="mt-3 text-slate-300">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default AppShell
