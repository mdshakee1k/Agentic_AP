import { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../services/authService";
import { apiError } from "../services/api";
import { useAuthStore } from "../stores/authStore";

export default function Register() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      const session = await authService.register(form);
      setSession(session);
      router.push("/dashboard");
    } catch (err) {
      setError(apiError(err));
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink p-6">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-line bg-panel p-6">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <input className="mt-5 w-full rounded-md border border-line bg-ink px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="mt-3 w-full rounded-md border border-line bg-ink px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="mt-3 w-full rounded-md border border-line bg-ink px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="mt-3 text-sm text-bad">{error}</p>}
        <button className="mt-5 w-full rounded-md bg-accent py-2 font-semibold text-ink">Register</button>
      </form>
    </main>
  );
}
