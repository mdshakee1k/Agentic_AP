const { body } = require("express-validator");

const executeWorkflowValidator = [body("input").optional().isObject()];

module.exports = { executeWorkflowValidator };
