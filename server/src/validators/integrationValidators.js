const { body, param } = require("express-validator");

const providerParamValidator = [
  param("provider").isIn(["gmail", "slack", "discord", "google-sheets"])
];

const integrationUpsertValidator = [
  body("provider").isIn(["gmail", "slack", "discord", "google-sheets", "openrouter", "gemini"]),
  body("accessToken").optional().isString(),
  body("refreshToken").optional().isString()
];

module.exports = { providerParamValidator, integrationUpsertValidator };
