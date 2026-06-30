const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");

const nodeCatalog = {
  triggers: ["manual", "gmail.new_email", "slack.event"],
  actions: ["gmail.send_email", "slack.post_message", "discord.post_message", "sheets.append_row"],
  ai: ["ai.extract_fields", "ai.summarize", "ai.classify"],
  logic: ["logic.condition", "logic.delay"]
};

function fallbackGraph(prompt) {
  const text = prompt.toLowerCase();
  const nodes = [
    {
      id: "trigger-1",
      type: "workflowNode",
      position: { x: 0, y: 80 },
      data: { label: "Manual Trigger", category: "trigger", config: { mode: "manual" } }
    }
  ];
  const edges = [];

  function addNode(id, label, category, config) {
    const node = {
      id,
      type: "workflowNode",
      position: { x: nodes.length * 240, y: 80 },
      data: { label, category, config }
    };
    edges.push({ id: `edge-${nodes[nodes.length - 1].id}-${id}`, source: nodes[nodes.length - 1].id, target: id, animated: true });
    nodes.push(node);
  }

  if (text.includes("email") || text.includes("gmail")) {
    addNode("gmail-1", text.includes("read") ? "Read Gmail" : "Send Gmail", "action", {
      provider: "gmail",
      operation: text.includes("read") ? "read" : "send"
    });
  }
  if (text.includes("invoice") || text.includes("extract")) {
    addNode("ai-1", "Extract Fields", "ai", { fields: ["vendor", "amount", "dueDate"] });
  }
  if (text.includes("sheet")) {
    addNode("sheets-1", "Append Google Sheet Row", "action", { provider: "google-sheets", operation: "append" });
  }
  if (text.includes("slack")) {
    addNode("slack-1", "Post Slack Message", "action", { provider: "slack", operation: "postMessage" });
  }
  if (text.includes("discord")) {
    addNode("discord-1", "Post Discord Message", "action", { provider: "discord", operation: "postMessage" });
  }
  if (nodes.length === 1) {
    addNode("ai-1", "Reason About Request", "ai", { task: prompt });
    addNode("notify-1", "Create Notification", "action", { provider: "system", operation: "notify" });
  }

  return {
    name: prompt.slice(0, 60) || "Generated Workflow",
    description: `Generated from prompt: ${prompt}`,
    nodes,
    edges,
    trigger: { type: "manual" },
    tags: ["generated"],
    generator: "deterministic",
    nodeCatalog
  };
}

async function generateWithOpenRouter(prompt) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: "Return only JSON for a workflow graph with name, description, nodes, edges, trigger, tags." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    },
    { headers: { Authorization: `Bearer ${env.openRouterApiKey}` } }
  );
  return { ...JSON.parse(response.data.choices[0].message.content), generator: "openrouter", nodeCatalog };
}

async function generateWithGemini(prompt) {
  const genAI = new GoogleGenerativeAI(env.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(`Return only JSON for a workflow graph: ${prompt}`);
  return { ...JSON.parse(result.response.text()), generator: "gemini", nodeCatalog };
}

async function generate(prompt) {
  if (env.openRouterApiKey) {
    try {
      return await generateWithOpenRouter(prompt);
    } catch (_error) {
      if (!env.geminiApiKey) return fallbackGraph(prompt);
    }
  }
  if (env.geminiApiKey) {
    try {
      return await generateWithGemini(prompt);
    } catch (_error) {
      return fallbackGraph(prompt);
    }
  }
  return fallbackGraph(prompt);
}

module.exports = { generate, fallbackGraph, nodeCatalog };
