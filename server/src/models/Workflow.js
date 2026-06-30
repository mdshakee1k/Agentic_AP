const mongoose = require("mongoose");

const workflowSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["draft", "active", "paused", "archived"], default: "draft" },
    trigger: { type: Object, default: {} },
    nodes: { type: Array, default: [] },
    edges: { type: Array, default: [] },
    tags: { type: [String], default: [] },
    version: { type: Number, default: 1 },
    lastExecutedAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workflow", workflowSchema);
