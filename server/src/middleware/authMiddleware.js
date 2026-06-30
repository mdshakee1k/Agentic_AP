const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../models/User");
const { AppError } = require("../utils/errors");

async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) throw new AppError("Authentication required", 401, "AUTH_REQUIRED");
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.sub);
    if (!user) throw new AppError("User not found", 401, "AUTH_REQUIRED");
    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new AppError("Invalid session", 401, "INVALID_TOKEN"));
  }
}

function requireRole(...roles) {
  return (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden", 403, "FORBIDDEN"));
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
