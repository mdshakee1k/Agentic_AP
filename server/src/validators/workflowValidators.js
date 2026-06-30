const { body } = require("express-validator");

const workflowValidator = [
  body("name").trim().isLength({ min: 2 }),
  body("nodes").optional().isArray(),
  body("edges").optional().isArray()
];

const generateWorkflowValidator = [body("prompt").trim().isLength({ min: 5 })];

module.exports = { workflowValidator, generateWorkflowValidator };
