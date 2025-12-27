const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authmiddleware = require("../middlewares/authMiddleware");

router.post("/add", authmiddleware.protect, companyController.addCompany);
router.get("/", authmiddleware.protect, companyController.getCompanies);
module.exports = router;
