const { AppError } = require("../utils/errors");

class BaseIntegration {
  constructor(provider) {
    this.provider = provider;
  }

  oauthStart() {
    return {
      redirectUrl: `/api/integrations/oauth/error?provider=${this.provider}&reason=not_configured`
    };
  }

  async execute() {
    throw new AppError(`${this.provider} integration is not connected`, 400, "INTEGRATION_NOT_CONNECTED");
  }
}

module.exports = BaseIntegration;
