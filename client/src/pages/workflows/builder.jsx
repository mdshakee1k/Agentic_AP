import { useCallback, useState } from "react";
import AppShell from "../../components/AppShell";
import ProtectedRoute from "../../components/ProtectedRoute";
import PromptInputPanel from "../../components/PromptInputPanel";
import GraphPreviewPanel from "../../components/GraphPreviewPanel";
import WorkflowCanvas from "../../components/WorkflowCanvas";
import WorkflowToolbar from "../../components/WorkflowToolbar";
import { workflowService } from "../../services/workflowService";

export default function Builder() {
  const [prompt, setPrompt] = useState("");
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(null);

  async function generate() {
    setLoading(true);
    try {
      setWorkflow(await workflowService.generate(prompt));
    } finally {
      setLoading(false);
    }
  }

  const handleCanvasChange = useCallback((graph) => {
    setWorkflow((current) => (current ? { ...current, ...graph } : current));
  }, []);

  async function save() {
    if (!workflow) return;
    setSaved(await workflowService.create(workflow));
  }

  async function execute() {
    const row = saved || (workflow ? await workflowService.create(workflow) : null);
    if (row) await workflowService.execute(row._id);
  }

  return (
    <ProtectedRoute>
      <AppShell title="Prompt-to-workflow builder" actions={<WorkflowToolbar onSave={save} onExecute={execute} />}>
        <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
          <div className="space-y-5">
            <PromptInputPanel prompt={prompt} setPrompt={setPrompt} onGenerate={generate} loading={loading} />
            <GraphPreviewPanel workflow={workflow} />
          </div>
          <WorkflowCanvas nodes={workflow?.nodes || []} edges={workflow?.edges || []} onChange={handleCanvasChange} />
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
