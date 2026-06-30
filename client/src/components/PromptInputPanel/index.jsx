import { Wand2 } from "lucide-react";

export default function PromptInputPanel({ prompt, setPrompt, onGenerate, loading }) {
  return (
    <div className="rounded-lg border border-line bg-panel p-4">
      <textarea
        className="h-32 w-full resize-none rounded-md border border-line bg-ink p-3 text-sm outline-none focus:border-accent"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Describe the automation..."
      />
      <button
        onClick={onGenerate}
        disabled={loading}
        className="mt-3 flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink disabled:opacity-60"
      >
        <Wand2 className="h-4 w-4" />
        {loading ? "Generating" : "Generate workflow"}
      </button>
    </div>
  );
}
