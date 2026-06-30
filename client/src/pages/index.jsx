import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "../stores/authStore";

export default function Home() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) router.replace("/dashboard");
  }, [token, router]);

  return (
    <main className="min-h-screen bg-ink px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center">
        <p className="text-sm uppercase tracking-widest text-accent">Agentic operations automation</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight">Agentflow_AI</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          Describe an automation, generate a visual workflow, and execute it through planner, execution,
          validation, recovery, and monitoring agents.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/login" className="rounded-md bg-accent px-5 py-3 font-semibold text-ink">Login</Link>
          <Link href="/register" className="rounded-md border border-line px-5 py-3 font-semibold">Create account</Link>
        </div>
      </section>
    </main>
  );
}
