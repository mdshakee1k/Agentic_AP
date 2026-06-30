const executionService = require("../services/executionService");
const { EXECUTION_STATUS } = require("../utils/constants");

async function list(req, res, next) {
  try {
    res.json(await executionService.list(req.user._id, req.query));
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    res.json(await executionService.getOwned(req.user._id, req.params.id));
  } catch (error) {
    next(error);
  }
}

async function timeline(req, res, next) {
  try {
    res.json(await executionService.timeline(req.user._id, req.params.id));
  } catch (error) {
    next(error);
  }
}

async function pause(req, res, next) {
  try {
    res.json(await executionService.transition(req.user._id, req.params.id, EXECUTION_STATUS.PAUSED));
  } catch (error) {
    next(error);
  }
}

async function resume(req, res, next) {
  try {
    res.json(await executionService.transition(req.user._id, req.params.id, EXECUTION_STATUS.RUNNING));
  } catch (error) {
    next(error);
  }
}

async function cancel(req, res, next) {
  try {
    res.json(await executionService.transition(req.user._id, req.params.id, EXECUTION_STATUS.CANCELLED));
  } catch (error) {
    next(error);
  }
}

module.exports = { list, get, timeline, pause, resume, cancel };
