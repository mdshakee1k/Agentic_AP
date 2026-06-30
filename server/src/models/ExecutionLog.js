const mongoose = require("mongoose");

const executionLogSchema = new mongoose.Schema(
  {
    execution: { type: mongoose.Schema.Types.ObjectId, ref: "Execution", required: true },
    workflow: { type: mongoose.Schema.Types.ObjectId, ref: "Workflow", required: true },
    nodeId: String,
    agent: { type: String, enum: ["planner", "execution", "validation", "recovery", "monitoring"] },
    level: { type: String, enum: ["info", "warning", "error", "success"], default: "info" },
    eventType: String,
    message: String,
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExecutionLog", executionLogSchema);
