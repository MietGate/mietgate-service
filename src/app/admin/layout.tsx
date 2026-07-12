export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-slate-900 text-white p-6">

        <h1 className="text-2xl font-bold">
          MietGate Admin
        </h1>

        <nav className="mt-10 space-y-4">

          <a href="/admin/dashboard" className="block">
            Dashboard
          </a>

          <a href="/admin/kunden" className="block">
            Kunden
          </a>

          <a href="/admin/bewerbungen" className="block">
            Bewerbungen
          </a>

          <a href="/admin/einstellungen" className="block">
            Einstellungen
          </a>

        </nav>

      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}