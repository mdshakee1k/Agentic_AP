import AppShell from "../components/AppShell";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuthStore } from "../stores/authStore";

export default function Settings() {
  const user = useAuthStore((state) => state.user);

  return (
    <ProtectedRoute>
      <AppShell title="Settings">
        <section className="max-w-2xl rounded-lg border border-line bg-panel p-5">
          <h2 className="font-semibold">Profile</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="rounded-md bg-ink p-3">Name: {user?.name}</div>
            <div className="rounded-md bg-ink p-3">Email: {user?.email}</div>
            <div className="rounded-md bg-ink p-3">Role: {user?.role}</div>
            <div className="rounded-md bg-ink p-3">Credential encryption: configured on server</div>
            <div className="rounded-md bg-ink p-3">Theme: dark operator console</div>
          </div>
        </section>
      </AppShell>
    </ProtectedRoute>
  );
}
