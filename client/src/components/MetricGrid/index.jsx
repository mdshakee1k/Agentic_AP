export default function MetricGrid({ metrics }) {
  const items = [
    ["Total workflows", metrics?.totalWorkflows || 0],
    ["Active workflows", metrics?.activeWorkflows || 0],
    ["Recent executions", metrics?.recentExecutions || 0],
    ["Success rate", `${metrics?.successRate || 0}%`]
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-lg border border-line bg-panel p-4">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
        </div>
      ))}
    </div>
  );
}
