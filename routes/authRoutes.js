const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const {
  validationRegisterSchema,
  validationLoginSchema,
} = require("../middlewares/validationSchema");

router.post("/register", validationRegisterSchema(), register);
router.post("/login", validationLoginSchema(), login);

module.exports = router;
