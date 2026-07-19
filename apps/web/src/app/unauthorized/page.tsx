import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white">
          401
        </h1>

        <p className="mt-4 text-slate-400">
          You need to sign in to access this page.
        </p>

        <Link
          href="/login"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}