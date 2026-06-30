const { validationResult } = require("express-validator");

function validateRequest(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  return res.status(422).json({
    error: {
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      details: result.array()
    }
  });
}

module.exports = validateRequest;
