const router = require("express").Router();
const controller = require("../controllers/workflowController");
const validateRequest = require("../middleware/validateRequest");
const { workflowValidator, generateWorkflowValidator } = require("../validators/workflowValidators");
const { executeWorkflowValidator } = require("../validators/executionValidators");

router.get("/dashboard", controller.dashboard);
router.get("/", controller.list);
router.post("/", workflowValidator, validateRequest, controller.create);
router.post("/generate", generateWorkflowValidator, validateRequest, controller.generate);
router.get("/:id", controller.get);
router.put("/:id", workflowValidator, validateRequest, controller.update);
router.post("/:id/duplicate", controller.duplicate);
router.post("/:id/execute", executeWorkflowValidator, validateRequest, controller.execute);
router.delete("/:id", controller.remove);

module.exports = router;
