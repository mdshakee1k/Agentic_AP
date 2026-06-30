const BaseIntegration = require("./baseIntegration");

class GoogleSheetsIntegration extends BaseIntegration {
  constructor() {
    super("google-sheets");
  }

  async execute(operation, config) {
    return { provider: this.provider, operation, simulated: true, config };
  }
}

module.exports = GoogleSheetsIntegration;
