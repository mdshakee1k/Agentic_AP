const BaseIntegration = require("./baseIntegration");

class DiscordIntegration extends BaseIntegration {
  constructor() {
    super("discord");
  }

  async execute(operation, config) {
    return { provider: this.provider, operation, simulated: true, config };
  }
}

module.exports = DiscordIntegration;
