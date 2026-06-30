import { Background, Controls, MiniMap, ReactFlow, addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import { useCallback, useEffect } from "react";

function WorkflowNode({ data }) {
  return (
    <div className="min-w-44 rounded-lg border border-slate-600 bg-panel px-3 py-2 shadow-xl">
      <p className="text-xs uppercase text-slate-400">{data.category}</p>
      <p className="text-sm font-semibold text-white">{data.label}</p>
    </div>
  );
}

const nodeTypes = { workflowNode: WorkflowNode };

export default function WorkflowCanvas({ nodes: initialNodes = [], edges: initialEdges = [], onChange, onSelect }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => setNodes(initialNodes), [initialNodes, setNodes]);
  useEffect(() => setEdges(initialEdges), [initialEdges, setEdges]);
  useEffect(() => onChange?.({ nodes, edges }), [nodes, edges, onChange]);

  const onConnect = useCallback((params) => setEdges((items) => addEdge({ ...params, animated: true }, items)), [setEdges]);

  return (
    <div className="h-[620px] overflow-hidden rounded-lg border border-line bg-[#11181d]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_event, node) => onSelect?.(node)}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
