function event(agent, level, eventType, message, metadata = {}) {
  return { agent, level, eventType, message, metadata };
}

module.exports = { event };
