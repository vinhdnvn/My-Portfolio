import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] font-sans">
      <main className="flex flex-col items-center justify-center gap-8 text-center">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">Developer Portfolio</h1>
        <p className="text-lg text-slate-300 mb-8 max-w-md">
          Welcome to my portfolio. View my work, experience, and get in touch.
        </p>
        <Link
          href="/portfolio"
          className="inline-flex items-center rounded-lg bg-indigo-500 px-6 py-3 text-base font-medium text-slate-50 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
        >
          View Portfolio
        </Link>
      </main>
    </div>
  );
}
