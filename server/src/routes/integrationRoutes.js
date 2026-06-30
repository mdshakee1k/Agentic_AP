const router = require("express").Router();
const controller = require("../controllers/integrationController");
const validateRequest = require("../middleware/validateRequest");
const { providerParamValidator, integrationUpsertValidator } = require("../validators/integrationValidators");

router.get("/", controller.list);
router.get("/status", controller.status);
router.get("/oauth/error", controller.oauthError);
router.get("/oauth/:provider/start", providerParamValidator, validateRequest, controller.oauthStart);
router.get("/oauth/:provider/callback", providerParamValidator, validateRequest, controller.oauthCallback);
router.post("/", integrationUpsertValidator, validateRequest, controller.upsert);

module.exports = router;
