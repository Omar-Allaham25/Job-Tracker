const { body, validationResult } = require("express-validator");

const checkErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

exports.validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("The passwords are not the same");
    }
    return true;
  }),
  checkErrors,
];
exports.validateLogin = [
  body("email").isEmail().withMessage("Must be a vaild email"),
  body("password").notEmpty().withMessage("password is required"),
  checkErrors,
];
exports.validateCompany = [
  body("name").notEmpty().withMessage("Company name is required"),
  checkErrors,
];
exports.validateApplication = [
  body("job_title").notEmpty().withMessage("Job title is required"),
  body("company_id").isInt().withMessage("Company ID must be a number"),
  body("status").optional().isIn(["Applied", "Interview", "Offer", "Rejected"]),
  checkErrors,
];
