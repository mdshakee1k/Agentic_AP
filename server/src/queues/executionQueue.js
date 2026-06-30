const env = require("../config/env");
const logger = require("../utils/logger");

let queue;
let worker;

async function enqueueExecution(executionId) {
  if (queue) {
    await queue.add("execute-workflow", { executionId }, { attempts: 3, backoff: { type: "exponential", delay: 2000 } });
    return;
  }
  setTimeout(() => require("../services/executionService").runExecution(executionId), 0);
}

function initQueue() {
  if (!env.redisUrl) {
    logger.warn("REDIS_URL is not configured. Using in-memory execution fallback.");
    return { mode: "memory" };
  }
  const { Queue, Worker } = require("bullmq");
  const IORedis = require("ioredis");
  const connection = new IORedis(env.redisUrl, { maxRetriesPerRequest: null });
  queue = new Queue("executions", { connection });
  worker = new Worker(
    "executions",
    async (job) => require("../services/executionService").runExecution(job.data.executionId),
    { connection }
  );
  return { mode: "redis", queue, worker };
}

module.exports = { initQueue, enqueueExecution };
