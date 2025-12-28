const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const applicationController = require("../controllers/applicationController");

const router = express.Router();

router.post(
  "/create",
  authMiddleware.protect,
  applicationController.createApplication
);
router.get(
  "/",
  authMiddleware.protect,
  applicationController.getMyApplications
);
module.exports = router;
