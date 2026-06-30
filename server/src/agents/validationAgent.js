async function validateNode(node, output) {
  const requiredFields = node.data?.config?.requiredFields || [];
  const missing = requiredFields.filter((field) => output?.result?.[field] === undefined);
  return {
    valid: missing.length === 0,
    missingFields: missing
  };
}

module.exports = { validateNode };
