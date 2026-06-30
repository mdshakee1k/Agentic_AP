const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const env = require("../config/env");
const { AppError } = require("../utils/errors");

function issueToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtSecret, { expiresIn: "7d" });
}

function serializeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt
  };
}

async function register(payload) {
  const existing = await User.findOne({ email: payload.email });
  if (existing) throw new AppError("Email is already registered", 409, "DUPLICATE_EMAIL");
  const password = await bcrypt.hash(payload.password, 12);
  const user = await User.create({ name: payload.name, email: payload.email, password });
  return { token: issueToken(user), user: serializeUser(user) };
}

async function login(payload) {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  const valid = await bcrypt.compare(payload.password, user.password);
  if (!valid) throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  user.lastLoginAt = new Date();
  await user.save();
  return { token: issueToken(user), user: serializeUser(user) };
}

module.exports = { register, login, serializeUser };
