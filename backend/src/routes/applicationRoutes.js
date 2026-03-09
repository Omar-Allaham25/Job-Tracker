const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const applicationController = require("../controllers/applicationController");
const { validateApplication } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware.protect,
  validateApplication,
  applicationController.createApplication
);
router.get(
  "/",
  authMiddleware.protect,
  applicationController.getMyApplications
);
router.patch(
  "/update/:id",
  authMiddleware.protect,
  applicationController.updateApplication
);
router.delete(
  "/:id",
  authMiddleware.protect,
  applicationController.deleteApplication
);
module.exports = router;
