const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  mongoUri: process.env.MONGO_URI || "",
  mongoDnsServers: (process.env.MONGO_DNS_SERVERS || "")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean),
  jwtSecret: process.env.JWT_SECRET || "dev-only-jwt-secret-change-me",
  credentialEncryptionKey:
    process.env.CREDENTIAL_ENCRYPTION_KEY || "dev-only-credential-key-change-me",
  redisUrl: process.env.REDIS_URL || "",
  openRouterApiKey: process.env.OPENROUTER_API_KEY || "",
  geminiApiKey: process.env.GEMINI_API_KEY || ""
};

module.exports = env;
