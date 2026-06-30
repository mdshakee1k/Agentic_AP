const { body } = require("express-validator");

const registerValidator = [
  body("name").trim().isLength({ min: 2 }),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 })
];

const loginValidator = [body("email").isEmail().normalizeEmail(), body("password").notEmpty()];

module.exports = { registerValidator, loginValidator };
