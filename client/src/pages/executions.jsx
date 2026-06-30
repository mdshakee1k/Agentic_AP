import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import ProtectedRoute from "../components/ProtectedRoute";
import { executionService } from "../services/executionService";
import { useExecutionSocket } from "../hooks/useSocket";
import { agentColors } from "../utils/constants";
import { formatDate } from "../utils/formatters";

export default function Executions() {
  const [executions, setExecutions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    executionService.list().then(setExecutions);
  }, []);

  useEffect(() => {
    if (selected) executionService.timeline(selected._id).then(setTimeline);
  }, [selected]);

  useExecutionSocket(selected?._id, (event) => setTimeline((items) => [...items, event]));

  return (
    <ProtectedRoute>
      <AppShell title="Executions">
        <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
          <section className="rounded-lg border border-line bg-panel">
            {executions.map((execution) => (
              <button
                key={execution._id}
                onClick={() => setSelected(execution)}
                className="flex w-full items-center justify-between border-b border-line p-4 text-left hover:bg-slate-800"
              >
                <span>
                  <span className="block font-medium">{execution.workflow?.name || execution.workflowSnapshot?.name}</span>
                  <span className="text-sm text-slate-400">{formatDate(execution.createdAt)}</span>
                </span>
                <span className="rounded-md border border-line px-2 py-1 text-xs">{execution.status}</span>
              </button>
            ))}
          </section>
          <section className="rounded-lg border border-line bg-panel p-4">
            <h2 className="font-semibold">Live timeline</h2>
            <div className="mt-4 space-y-3">
              {timeline.map((item) => (
                <article key={item._id || `${item.eventType}-${Math.random()}`} className="rounded-md bg-ink p-3">
                  <span className={`rounded px-2 py-1 text-xs text-ink ${agentColors[item.agent] || "bg-slate-400"}`}>{item.agent}</span>
                  <p className="mt-2 text-sm font-medium">{item.message}</p>
                  <p className="text-xs text-slate-400">{item.eventType}</p>
                </article>
              ))}
              {!timeline.length && <p className="text-sm text-slate-400">Select an execution to view events.</p>}
            </div>
          </section>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
