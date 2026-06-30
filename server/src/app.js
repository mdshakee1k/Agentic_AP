const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const env = require("./config/env");
const { requireAuth } = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workflows", requireAuth, require("./routes/workflowRoutes"));
app.use("/api/executions", requireAuth, require("./routes/executionRoutes"));
app.use("/api/integrations", requireAuth, require("./routes/integrationRoutes"));
app.use("/api/notifications", requireAuth, require("./routes/notificationRoutes"));

app.use(errorHandler);

module.exports = app;
