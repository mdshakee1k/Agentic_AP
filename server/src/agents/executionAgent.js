const integrationService = require("../services/integrationService");

async function executeNode(node, context) {
  const config = node.data?.config || {};
  const provider = config.provider;
  if (provider && provider !== "system") {
    const result = await integrationService.execute(provider, config.operation || "execute", config);
    return { nodeId: node.id, result };
  }
  return {
    nodeId: node.id,
    result: {
      label: node.data?.label,
      category: node.data?.category,
      input: context.output
    }
  };
}

module.exports = { executeNode };
