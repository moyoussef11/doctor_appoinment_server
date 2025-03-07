const { body } = require("express-validator");

const validationRegisterSchema = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3 })
      .withMessage("name at least is 3 digits")
      .trim(),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .trim(),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .trim()
      .isLength({ min: 8 })
      .withMessage("password at least is 8 digits"),
  ];
};

const validationLoginSchema = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .trim(),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .trim()
      .isLength({ min: 8 })
      .withMessage("password at least is 8 digits"),
  ];
};

const validationAddDoctorSchema = () => {
  return [
    body("name").notEmpty().withMessage("name is required").trim(),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .trim(),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .trim()
      .isLength({ min: 8 })
      .withMessage("password at least is 8 digits"),
    body("speciality").notEmpty().withMessage("speciality is required").trim(),
    body("degree").notEmpty().withMessage("degree is required").trim(),
    body("fees").notEmpty().withMessage("fees is required").trim(),
    body("experience").notEmpty().withMessage("experience is required").trim(),
    body("about").notEmpty().withMessage("about is required").trim(),
    body("available")
      .notEmpty()
      .withMessage("available is required")
      .trim()
      .isBoolean(),
    body("address").notEmpty().withMessage("address is required").trim(),
    body("phone").notEmpty().withMessage("phone is required").trim(),
    body("image").notEmpty().withMessage("image is required"),
  ];
};

module.exports = {
  validationRegisterSchema,
  validationLoginSchema,
  validationAddDoctorSchema,
};
