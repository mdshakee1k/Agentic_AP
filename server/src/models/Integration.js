const mongoose = require("mongoose");

const integrationSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: {
      type: String,
      enum: ["gmail", "slack", "google-sheets", "discord", "openrouter", "gemini"],
      required: true
    },
    status: { type: String, enum: ["connected", "disconnected", "expired"], default: "disconnected" },
    scopes: { type: [String], default: [] },
    encryptedAccessToken: String,
    encryptedRefreshToken: String,
    expiresAt: Date,
    providerAccountId: String,
    lastError: String,
    enabled: { type: Boolean, default: true }
  },
  { timestamps: true }
);

integrationSchema.index({ owner: 1, provider: 1 }, { unique: true });

module.exports = mongoose.model("Integration", integrationSchema);
