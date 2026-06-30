import { Play, Save } from "lucide-react";

export default function WorkflowToolbar({ onSave, onExecute }) {
  return (
    <div className="flex gap-2">
      <button onClick={onSave} className="flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm">
        <Save className="h-4 w-4" />
        Save
      </button>
      <button onClick={onExecute} className="flex items-center gap-2 rounded-md bg-good px-3 py-2 text-sm font-semibold text-ink">
        <Play className="h-4 w-4" />
        Execute
      </button>
    </div>
  );
}
