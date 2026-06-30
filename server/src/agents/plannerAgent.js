async function plan(workflow) {
  const ordering = workflow.nodes.map((node) => node.id);
  return {
    ordering,
    confidence: ordering.length ? 0.86 : 0.2,
    message: `Planned ${ordering.length} nodes`
  };
}

module.exports = { plan };
