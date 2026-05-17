import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="rounded-[2rem] border border-rose-400/10 bg-[#06122f]/80 p-10 text-white shadow-[0_36px_80px_rgba(0,229,255,0.05)]">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">404 - Page not found</h1>
      <p className="mt-4 max-w-xl text-slate-300">
        The page you are looking for does not exist, but the Night Sky dashboard is ready for your next click.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-[#0B0F19] transition hover:bg-cyan-300"
        >
          Return Home
        </Link>
        <p className="text-sm text-slate-400">Or use the navigation above to choose Student, Teacher or Parent view.</p>
      </div>
    </section>
  );
};

export default NotFound;
