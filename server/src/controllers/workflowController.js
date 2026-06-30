const workflowService = require("../services/workflowService");
const aiGenerationService = require("../services/aiGenerationService");
const executionService = require("../services/executionService");

async function dashboard(req, res, next) {
  try {
    res.json(await workflowService.dashboard(req.user._id));
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    res.json(await workflowService.list(req.user._id, req.query));
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    res.status(201).json(await workflowService.create(req.user._id, req.body));
  } catch (error) {
    next(error);
  }
}

async function generate(req, res, next) {
  try {
    res.json(await aiGenerationService.generate(req.body.prompt));
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    res.json(await workflowService.getOwned(req.user._id, req.params.id));
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    res.json(await workflowService.update(req.user._id, req.params.id, req.body));
  } catch (error) {
    next(error);
  }
}

async function duplicate(req, res, next) {
  try {
    res.status(201).json(await workflowService.duplicate(req.user._id, req.params.id));
  } catch (error) {
    next(error);
  }
}

async function execute(req, res, next) {
  try {
    res.status(202).json(await executionService.createRun(req.user._id, req.params.id, req.body.input));
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await workflowService.remove(req.user._id, req.params.id));
  } catch (error) {
    next(error);
  }
}

module.exports = { dashboard, list, create, generate, get, update, duplicate, execute, remove };
