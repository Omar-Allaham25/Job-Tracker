const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authmiddleware = require("../middlewares/authMiddleware");
const { validateCompany } = require("../middlewares/validationMiddleware");

router.post(
  "/add",
  authmiddleware.protect,
  validateCompany,
  companyController.addCompany
);
router.get("/", authmiddleware.protect, companyController.getCompanies);
module.exports = router;
