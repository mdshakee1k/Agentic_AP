const Workflow = require("../models/Workflow");
const Execution = require("../models/Execution");
const ExecutionLog = require("../models/ExecutionLog");
const orchestrator = require("../agents/orchestrator");
const notificationService = require("./notificationService");
const { EXECUTION_STATUS } = require("../utils/constants");
const { emitExecutionEvent } = require("../config/socket");
const { AppError } = require("../utils/errors");

async function logEvent(execution, event) {
  const row = await ExecutionLog.create({
    execution: execution._id,
    workflow: execution.workflow,
    nodeId: event.metadata?.nodeId,
    agent: event.agent,
    level: event.level,
    eventType: event.eventType,
    message: event.message,
    metadata: event.metadata || {}
  });
  emitExecutionEvent(execution._id.toString(), row);
  return row;
}

async function createRun(owner, workflowId, input = {}) {
  const workflow = await Workflow.findOne({ _id: workflowId, owner });
  if (!workflow) throw new AppError("Workflow not found", 404, "WORKFLOW_NOT_FOUND");
  const execution = await Execution.create({
    owner,
    workflow: workflow._id,
    workflowSnapshot: workflow.toObject(),
    input,
    status: EXECUTION_STATUS.PENDING
  });
  const queue = require("../queues/executionQueue");
  await queue.enqueueExecution(execution._id.toString());
  return execution;
}

async function runExecution(executionId) {
  const execution = await Execution.findById(executionId);
  if (!execution) throw new AppError("Execution not found", 404, "EXECUTION_NOT_FOUND");
  execution.status = EXECUTION_STATUS.RUNNING;
  execution.startedAt = execution.startedAt || new Date();
  await execution.save();

  try {
    const result = await orchestrator.runWorkflow(execution.workflowSnapshot, execution.input, (event) =>
      logEvent(execution, event)
    );
    execution.status = EXECUTION_STATUS.COMPLETED;
    execution.output = result.output;
    execution.completedAt = new Date();
    execution.durationMs = execution.completedAt - execution.startedAt;
    await execution.save();
    await notificationService.create({
      owner: execution.owner,
      workflow: execution.workflow,
      execution: execution._id,
      type: "success",
      title: "Execution completed",
      message: execution.workflowSnapshot.name
    });
    return execution;
  } catch (error) {
    const recovery = await orchestrator.recover(error, (event) => logEvent(execution, event));
    execution.status = recovery.decision === "retry_with_backoff" ? EXECUTION_STATUS.RETRYING : EXECUTION_STATUS.FAILED;
    execution.error = { message: error.message, code: recovery.classification, details: error.details || {} };
    execution.completedAt = new Date();
    execution.durationMs = execution.completedAt - execution.startedAt;
    await execution.save();
    await notificationService.create({
      owner: execution.owner,
      workflow: execution.workflow,
      execution: execution._id,
      type: recovery.decision === "escalate" ? "escalation" : "failure",
      title: "Execution needs attention",
      message: execution.error.code
    });
    return execution;
  }
}

async function list(owner, query) {
  const filter = { owner };
  if (query.status) filter.status = query.status;
  return Execution.find(filter).sort({ createdAt: -1 }).populate("workflow", "name");
}

async function getOwned(owner, id) {
  const execution = await Execution.findOne({ _id: id, owner }).populate("workflow", "name");
  if (!execution) throw new AppError("Execution not found", 404, "EXECUTION_NOT_FOUND");
  return execution;
}

async function timeline(owner, id) {
  const execution = await getOwned(owner, id);
  return ExecutionLog.find({ execution: execution._id }).sort({ createdAt: 1 });
}

async function transition(owner, id, status) {
  const execution = await getOwned(owner, id);
  execution.status = status;
  await execution.save();
  await logEvent(execution, {
    agent: "monitoring",
    level: "info",
    eventType: `EXECUTION_${status}`,
    message: `Execution ${status.toLowerCase()}`,
    metadata: {}
  });
  return execution;
}

module.exports = { createRun, runExecution, list, getOwned, timeline, transition };
