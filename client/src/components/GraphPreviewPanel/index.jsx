export default function GraphPreviewPanel({ workflow }) {
  return (
    <div className="rounded-lg border border-line bg-panel p-4">
      <h2 className="font-semibold">{workflow?.name || "Workflow preview"}</h2>
      <p className="mt-1 text-sm text-slate-400">{workflow?.description || "Generated graph details appear here."}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-md bg-ink p-3">Nodes: {workflow?.nodes?.length || 0}</div>
        <div className="rounded-md bg-ink p-3">Edges: {workflow?.edges?.length || 0}</div>
      </div>
    </div>
  );
}
