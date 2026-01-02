const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const {
  validateLogin,
  validateRegister,
} = require("../middlewares/validationMiddleware");

router.post("/register", validateRegister, authController.register);
module.exports = router;
router.post("/login", validateLogin, authController.login);
