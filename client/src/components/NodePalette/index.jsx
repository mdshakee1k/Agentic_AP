const nodes = [
  ["Manual Trigger", "trigger"],
  ["Send Gmail", "action"],
  ["Post Slack", "action"],
  ["Append Sheet Row", "action"],
  ["AI Extract Fields", "ai"],
  ["Condition", "logic"]
];

export default function NodePalette({ onAdd }) {
  return (
    <div className="space-y-2">
      {nodes.map(([label, category]) => (
        <button
          key={label}
          onClick={() => onAdd({ label, category })}
          className="w-full rounded-md border border-line bg-panel px-3 py-2 text-left text-sm hover:border-accent"
        >
          <span className="block font-medium">{label}</span>
          <span className="text-xs text-slate-400">{category}</span>
        </button>
      ))}
    </div>
  );
}
