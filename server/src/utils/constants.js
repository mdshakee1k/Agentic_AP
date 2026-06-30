const EXECUTION_STATUS = {
  PENDING: "PENDING",
  RUNNING: "RUNNING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  RETRYING: "RETRYING",
  PAUSED: "PAUSED",
  CANCELLED: "CANCELLED"
};

const AGENTS = ["planner", "execution", "validation", "recovery", "monitoring"];

module.exports = { EXECUTION_STATUS, AGENTS };
