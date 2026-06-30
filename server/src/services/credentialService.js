const { encrypt, decrypt } = require("../utils/crypto");

function encryptCredentialSet({ accessToken, refreshToken }) {
  return {
    encryptedAccessToken: accessToken ? encrypt(accessToken) : undefined,
    encryptedRefreshToken: refreshToken ? encrypt(refreshToken) : undefined
  };
}

function decryptIntegration(integration) {
  return {
    accessToken: decrypt(integration.encryptedAccessToken),
    refreshToken: decrypt(integration.encryptedRefreshToken)
  };
}

module.exports = { encryptCredentialSet, decryptIntegration };
