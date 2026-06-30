const dns = require("dns");
const mongoose = require("mongoose");
const env = require("./env");
const logger = require("../utils/logger");

async function connectDb() {
  if (!env.mongoUri) {
    logger.warn("MONGO_URI is not configured. API will run without MongoDB persistence.");
    return { connected: false, fallback: "memory" };
  }

  if (env.mongoDnsServers.length > 0) {
    dns.setServers(env.mongoDnsServers);
    logger.info("MongoDB DNS servers configured", { servers: env.mongoDnsServers });
  }

  await mongoose.connect(env.mongoUri);
  logger.info("MongoDB connected");
  return { connected: true };
}

module.exports = connectDb;
