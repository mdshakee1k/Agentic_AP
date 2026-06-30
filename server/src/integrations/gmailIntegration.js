const BaseIntegration = require("./baseIntegration");

class GmailIntegration extends BaseIntegration {
  constructor() {
    super("gmail");
  }

  async execute(operation, config) {
    return { provider: this.provider, operation, simulated: true, config };
  }
}

module.exports = GmailIntegration;
