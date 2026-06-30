const integrationService = require("../services/integrationService");

async function list(req, res, next) {
  try {
    res.json(await integrationService.list(req.user._id));
  } catch (error) {
    next(error);
  }
}

async function status(req, res, next) {
  try {
    res.json(await integrationService.status(req.user._id));
  } catch (error) {
    next(error);
  }
}

async function oauthStart(req, res, next) {
  try {
    const result = integrationService.oauthStart(req.params.provider);
    res.redirect(result.redirectUrl);
  } catch (error) {
    next(error);
  }
}

async function oauthCallback(req, res, next) {
  try {
    await integrationService.oauthCallback(req.user?._id, req.params.provider, req.query);
    res.redirect("/integrations");
  } catch (error) {
    next(error);
  }
}

async function oauthError(req, res) {
  res.status(400).json({ error: { code: "OAUTH_ERROR", details: req.query } });
}

async function upsert(req, res, next) {
  try {
    res.json(await integrationService.upsert(req.user._id, req.body));
  } catch (error) {
    next(error);
  }
}

module.exports = { list, status, oauthStart, oauthCallback, oauthError, upsert };
