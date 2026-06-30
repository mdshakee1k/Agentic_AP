const Workflow = require("../models/Workflow");
const Execution = require("../models/Execution");
const { AppError } = require("../utils/errors");

async function dashboard(owner) {
  const [total, active, recent, executions] = await Promise.all([
    Workflow.countDocuments({ owner }),
    Workflow.countDocuments({ owner, status: "active" }),
    Workflow.find({ owner }).sort({ updatedAt: -1 }).limit(5),
    Execution.find({ owner }).sort({ createdAt: -1 }).limit(8).populate("workflow", "name")
  ]);
  const completed = executions.filter((item) => item.status === "COMPLETED").length;
  return {
    metrics: {
      totalWorkflows: total,
      activeWorkflows: active,
      recentExecutions: executions.length,
      successRate: executions.length ? Math.round((completed / executions.length) * 100) : 0
    },
    recentWorkflows: recent,
    recentExecutions: executions
  };
}

async function list(owner, query) {
  const filter = { owner };
  if (query.search) filter.name = new RegExp(query.search, "i");
  if (query.status) filter.status = query.status;
  return Workflow.find(filter).sort({ updatedAt: -1 });
}

async function create(owner, payload) {
  return Workflow.create({
    owner,
    name: payload.name,
    description: payload.description,
    trigger: payload.trigger || {},
    nodes: payload.nodes || [],
    edges: payload.edges || [],
    tags: payload.tags || [],
    status: payload.status || "draft"
  });
}

async function getOwned(owner, id) {
  const workflow = await Workflow.findOne({ _id: id, owner });
  if (!workflow) throw new AppError("Workflow not found", 404, "WORKFLOW_NOT_FOUND");
  return workflow;
}

async function update(owner, id, payload) {
  const workflow = await getOwned(owner, id);
  Object.assign(workflow, payload);
  workflow.version += 1;
  return workflow.save();
}

async function duplicate(owner, id) {
  const workflow = await getOwned(owner, id);
  return create(owner, {
    name: `${workflow.name} Copy`,
    description: workflow.description,
    trigger: workflow.trigger,
    nodes: workflow.nodes,
    edges: workflow.edges,
    tags: workflow.tags,
    status: "draft"
  });
}

async function remove(owner, id) {
  const workflow = await getOwned(owner, id);
  await workflow.deleteOne();
  return { deleted: true };
}

module.exports = { dashboard, list, create, getOwned, update, duplicate, remove };
