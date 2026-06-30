const http = require("http");
const app = require("./app");
const env = require("./config/env");
const connectDb = require("./config/db");
const { initSocket } = require("./config/socket");
const { initQueue } = require("./queues/queueWorker");
const logger = require("./utils/logger");

async function start() {
  await connectDb();
  const server = http.createServer(app);
  initSocket(server, env.clientUrl);
  initQueue();
  server.listen(env.port, () => {
    logger.info(`Server listening on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  logger.error("Server failed to start", { message: error.message });
  process.exit(1);
});
