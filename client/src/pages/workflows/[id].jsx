import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import ProtectedRoute from "../../components/ProtectedRoute";
import WorkflowCanvas from "../../components/WorkflowCanvas";
import WorkflowToolbar from "../../components/WorkflowToolbar";
import NodePalette from "../../components/NodePalette";
import NodeConfigPanel from "../../components/NodeConfigPanel";
import { workflowService } from "../../services/workflowService";

export default function WorkflowEditor() {
  const router = useRouter();
  const { id } = router.query;
  const [workflow, setWorkflow] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (id) workflowService.get(id).then(setWorkflow);
  }, [id]);

  const handleCanvasChange = useCallback((graph) => setWorkflow((current) => ({ ...current, ...graph })), []);

  function addNode(data) {
    setWorkflow((current) => ({
      ...current,
      nodes: [
        ...(current.nodes || []),
        {
          id: `node-${Date.now()}`,
          type: "workflowNode",
          position: { x: 120, y: 120 },
          data: { ...data, config: {} }
        }
      ]
    }));
  }

  function updateNode(node) {
    setSelectedNode(node);
    setWorkflow((current) => ({ ...current, nodes: current.nodes.map((item) => (item.id === node.id ? node : item)) }));
  }

  async function save() {
    setWorkflow(await workflowService.update(id, workflow));
  }

  async function execute() {
    await workflowService.execute(id);
  }

  if (!workflow) return <ProtectedRoute><AppShell title="Workflow">Loading...</AppShell></ProtectedRoute>;

  return (
    <ProtectedRoute>
      <AppShell title={workflow.name} actions={<WorkflowToolbar onSave={save} onExecute={execute} />}>
        <div className="grid gap-4 xl:grid-cols-[220px_1fr_280px]">
          <aside className="rounded-lg border border-line bg-panel p-4"><NodePalette onAdd={addNode} /></aside>
          <WorkflowCanvas nodes={workflow.nodes} edges={workflow.edges} onChange={handleCanvasChange} onSelect={setSelectedNode} />
          <aside className="rounded-lg border border-line bg-panel p-4"><NodeConfigPanel node={selectedNode} onChange={updateNode} /></aside>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
