import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import ProtectedRoute from "../components/ProtectedRoute";
import { integrationService } from "../services/integrationService";

export default function Integrations() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    integrationService.list().then(setItems);
  }, []);

  return (
    <ProtectedRoute>
      <AppShell title="Integrations">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.provider} className="rounded-lg border border-line bg-panel p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold capitalize">{item.provider.replace("-", " ")}</h2>
                <span className={`h-2.5 w-2.5 rounded-full ${item.status === "connected" ? "bg-good" : "bg-bad"}`} />
              </div>
              <p className="mt-2 text-sm text-slate-400">{item.status}</p>
              <a href={integrationService.oauthStartUrl(item.provider)} className="mt-5 inline-block rounded-md border border-line px-3 py-2 text-sm">
                {item.status === "connected" ? "Reconnect" : "Connect"}
              </a>
            </article>
          ))}
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
