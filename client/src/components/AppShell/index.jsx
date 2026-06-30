import Link from "next/link";
import { useRouter } from "next/router";
import { Bell, LayoutDashboard, Network, Plug, PlayCircle, Settings, Wand2, LogOut } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import NotificationsDrawer from "../NotificationsDrawer";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workflows/builder", label: "Builder", icon: Wand2 },
  { href: "/executions", label: "Executions", icon: PlayCircle },
  { href: "/integrations", label: "Integrations", icon: Plug },
  { href: "/settings", label: "Settings", icon: Settings }
];

export default function AppShell({ children, title, actions }) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-panel p-4 lg:block">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
          <Network className="h-5 w-5 text-accent" />
          Agentflow_AI
        </Link>
        <nav className="mt-8 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${active ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink/95 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-xs text-slate-400">{user?.role || "operator"}</p>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <NotificationsDrawer trigger={<button className="rounded-md border border-line p-2"><Bell className="h-4 w-4" /></button>} />
            <button
              className="rounded-md border border-line p-2 text-slate-300"
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <div className="p-5">{children}</div>
      </main>
    </div>
  );
}
