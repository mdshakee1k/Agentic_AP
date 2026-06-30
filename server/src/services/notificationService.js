const Notification = require("../models/Notification");

async function list(owner) {
  return Notification.find({ owner }).sort({ createdAt: -1 }).limit(50);
}

async function create(payload) {
  return Notification.create(payload);
}

module.exports = { list, create };
