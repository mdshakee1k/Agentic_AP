export default function NodeConfigPanel({ node, onChange }) {
  if (!node) return <p className="text-sm text-slate-400">Select a node to configure it.</p>;
  const config = node.data?.config || {};

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-slate-400">Label</label>
        <input
          className="mt-1 w-full rounded-md border border-line bg-ink px-3 py-2 text-sm"
          value={node.data.label}
          onChange={(event) => onChange({ ...node, data: { ...node.data, label: event.target.value } })}
        />
      </div>
      <div>
        <label className="text-xs text-slate-400">Provider</label>
        <input
          className="mt-1 w-full rounded-md border border-line bg-ink px-3 py-2 text-sm"
          value={config.provider || ""}
          onChange={(event) => onChange({ ...node, data: { ...node.data, config: { ...config, provider: event.target.value } } })}
        />
      </div>
    </div>
  );
}
