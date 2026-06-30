const plannerAgent = require("./plannerAgent");
const executionAgent = require("./executionAgent");
const validationAgent = require("./validationAgent");
const recoveryAgent = require("./recoveryAgent");
const monitoringAgent = require("./monitoringAgent");

function langGraphStatus() {
  try {
    require("@langchain/langgraph");
    return "available";
  } catch (_error) {
    return "not-installed";
  }
}

async function runWorkflow(workflow, input, onEvent) {
  const context = { input, output: {}, langGraph: langGraphStatus() };
  const emit = async (payload) => {
    if (onEvent) await onEvent({ ...payload, langGraph: context.langGraph });
  };

  const plan = await plannerAgent.plan(workflow);
  await emit(monitoringAgent.event("planner", "info", "PLAN_CREATED", plan.message, plan));

  for (const nodeId of plan.ordering) {
    const node = workflow.nodes.find((item) => item.id === nodeId);
    await emit(monitoringAgent.event("execution", "info", "NODE_STARTED", `Running ${node.data?.label || node.id}`, { nodeId }));
    const nodeOutput = await executionAgent.executeNode(node, context);
    const validation = await validationAgent.validateNode(node, nodeOutput);
    if (!validation.valid) {
      const error = new Error("MISSING_FIELDS");
      error.details = validation;
      throw error;
    }
    context.output[nodeId] = nodeOutput;
    await emit(monitoringAgent.event("validation", "success", "NODE_VALIDATED", `Validated ${node.data?.label || node.id}`, { nodeId }));
  }

  await emit(monitoringAgent.event("monitoring", "success", "WORKFLOW_COMPLETED", "Workflow completed", { output: context.output }));
  return context;
}

async function recover(error, onEvent) {
  const result = await recoveryAgent.recover(error);
  if (onEvent) {
    await onEvent(monitoringAgent.event("recovery", "error", "RECOVERY_DECISION", result.decision, result));
  }
  return result;
}

module.exports = { runWorkflow, recover, langGraphStatus };
