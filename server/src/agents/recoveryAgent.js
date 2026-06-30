function classify(error) {
  const code = error.code || error.message || "";
  if (code.includes("AUTH")) return "AUTH_EXPIRED";
  if (code.includes("RATE")) return "RATE_LIMIT";
  if (code.includes("MISSING")) return "MISSING_FIELDS";
  if (code.includes("INTEGRATION")) return "API_FAILURE";
  return "TRANSIENT";
}

async function recover(error) {
  const classification = classify(error);
  return {
    classification,
    decision: ["RATE_LIMIT", "TRANSIENT"].includes(classification) ? "retry_with_backoff" : "escalate"
  };
}

module.exports = { classify, recover };
