const mongoose = require("mongoose");

const agentMemorySchema = new mongoose.Schema(
  {
    workflow: { type: mongoose.Schema.Types.ObjectId, ref: "Workflow" },
    execution: { type: mongoose.Schema.Types.ObjectId, ref: "Execution" },
    agent: String,
    key: String,
    value: { type: Object, default: {} },
    confidence: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("AgentMemory", agentMemorySchema);
