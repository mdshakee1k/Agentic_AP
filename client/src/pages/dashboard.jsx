import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import MetricGrid from "../components/MetricGrid";
import ProtectedRoute from "../components/ProtectedRoute";
import { workflowService } from "../services/workflowService";
import { formatDate } from "../utils/formatters";

export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    workflowService.dashboard().then(setData).catch(() => setData({ metrics: {} }));
  }, []);

  return (
    <ProtectedRoute>
      <AppShell title="Dashboard">
        <MetricGrid metrics={data?.metrics} />
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <section className="rounded-lg border border-line bg-panel p-4">
            <h2 className="font-semibold">Recent workflows</h2>
            <div className="mt-4 space-y-3">
              {data?.recentWorkflows?.map((workflow) => (
                <article key={workflow._id} className="rounded-md bg-ink p-3">
                  <p className="font-medium">{workflow.name}</p>
                  <p className="text-sm text-slate-400">v{workflow.version} - {workflow.status}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-line bg-panel p-4">
            <h2 className="font-semibold">AI activity</h2>
            <div className="mt-4 space-y-3">
              {data?.recentExecutions?.map((execution) => (
                <article key={execution._id} className="rounded-md bg-ink p-3">
                  <p className="font-medium">{execution.workflow?.name || "Workflow"}</p>
                  <p className="text-sm text-slate-400">{execution.status} - {formatDate(execution.createdAt)}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
