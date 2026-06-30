const mongoose = require("mongoose");
const { EXECUTION_STATUS } = require("../utils/constants");

const executionSchema = new mongoose.Schema(
  {
    workflow: { type: mongoose.Schema.Types.ObjectId, ref: "Workflow", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    workflowSnapshot: { type: Object, required: true },
    status: { type: String, enum: Object.values(EXECUTION_STATUS), default: EXECUTION_STATUS.PENDING },
    currentNodeId: String,
    input: { type: Object, default: {} },
    output: { type: Object, default: {} },
    error: { type: Object, default: null },
    retryCount: { type: Number, default: 0 },
    startedAt: Date,
    completedAt: Date,
    durationMs: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Execution", executionSchema);
