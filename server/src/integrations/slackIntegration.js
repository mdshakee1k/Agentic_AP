const BaseIntegration = require("./baseIntegration");

class SlackIntegration extends BaseIntegration {
  constructor() {
    super("slack");
  }

  async execute(operation, config) {
    return { provider: this.provider, operation, simulated: true, config };
  }
}

module.exports = SlackIntegration;
