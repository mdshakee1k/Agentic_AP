const Integration = require("../models/Integration");
const { encryptCredentialSet } = require("./credentialService");
const GmailIntegration = require("../integrations/gmailIntegration");
const SlackIntegration = require("../integrations/slackIntegration");
const DiscordIntegration = require("../integrations/discordIntegration");
const GoogleSheetsIntegration = require("../integrations/googleSheetsIntegration");

const providers = {
  gmail: new GmailIntegration(),
  slack: new SlackIntegration(),
  discord: new DiscordIntegration(),
  "google-sheets": new GoogleSheetsIntegration()
};

async function list(owner) {
  const connected = await Integration.find({ owner });
  return Object.keys(providers).map((provider) => {
    const row = connected.find((item) => item.provider === provider);
    return {
      provider,
      status: row?.status || "disconnected",
      enabled: row?.enabled ?? false,
      scopes: row?.scopes || [],
      expiresAt: row?.expiresAt,
      lastError: row?.lastError
    };
  });
}

async function status(owner) {
  const items = await list(owner);
  return items.map((item) => ({
    ...item,
    healthy: item.status === "connected" && item.enabled
  }));
}

function oauthStart(provider) {
  return providers[provider].oauthStart();
}

async function oauthCallback(owner, provider, query) {
  return Integration.findOneAndUpdate(
    { owner, provider },
    {
      status: query.error ? "disconnected" : "connected",
      lastError: query.error || "",
      enabled: !query.error
    },
    { new: true, upsert: true }
  );
}

async function upsert(owner, payload) {
  const credentials = encryptCredentialSet(payload);
  return Integration.findOneAndUpdate(
    { owner, provider: payload.provider },
    {
      ...credentials,
      status: payload.accessToken ? "connected" : payload.status || "disconnected",
      scopes: payload.scopes || [],
      expiresAt: payload.expiresAt,
      enabled: payload.enabled ?? true
    },
    { new: true, upsert: true }
  );
}

async function execute(provider, operation, config) {
  return providers[provider].execute(operation, config);
}

module.exports = { list, status, oauthStart, oauthCallback, upsert, execute };
