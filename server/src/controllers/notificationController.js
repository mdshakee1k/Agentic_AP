const notificationService = require("../services/notificationService");

async function list(req, res, next) {
  try {
    res.json(await notificationService.list(req.user._id));
  } catch (error) {
    next(error);
  }
}

module.exports = { list };
