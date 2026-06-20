import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="max-w-md rounded-lg border border-line bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-muted">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-ink">Seite nicht gefunden</h1>
        <p className="mt-3 text-sm leading-6 text-muted">Der angeforderte Bereich ist in dieser Anwendung nicht vorhanden.</p>
        <Link href="/" className="mt-6 inline-flex rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">
          Zur Anwendung
        </Link>
      </div>
    </main>
  );
}
