export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div className="text-2xl font-bold tracking-tight">
          <span className="text-slate-900">Miet</span>
          <span className="text-teal-500">Gate</span>
        </div>


        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#" className="hover:text-teal-600">
            So funktioniert es
          </a>

          <a href="#" className="hover:text-teal-600">
            Preise
          </a>

          <a href="#" className="hover:text-teal-600">
            FAQ
          </a>
        </div>


        <button className="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600">
          Suchprofil erstellen
        </button>

      </div>

    </nav>
  );
}

