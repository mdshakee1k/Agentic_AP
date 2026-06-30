const router = require("express").Router();
const controller = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const { authRateLimiter } = require("../middleware/rateLimiter");
const { registerValidator, loginValidator } = require("../validators/authValidators");

router.post("/register", authRateLimiter, registerValidator, validateRequest, controller.register);
router.post("/login", authRateLimiter, loginValidator, validateRequest, controller.login);
router.get("/me", requireAuth, controller.me);

module.exports = router;
