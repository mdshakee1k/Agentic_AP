const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    workflow: { type: mongoose.Schema.Types.ObjectId, ref: "Workflow" },
    execution: { type: mongoose.Schema.Types.ObjectId, ref: "Execution" },
    type: { type: String, enum: ["success", "failure", "escalation", "info"], default: "info" },
    title: String,
    message: String,
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
