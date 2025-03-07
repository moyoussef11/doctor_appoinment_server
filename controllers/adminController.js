const asyncHandler = require("express-async-handler");
const statusText = require("../utils/statusText");
const jwt = require("jsonwebtoken");

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });
    res.status(200).json({
      status: statusText.success,
      data: { token },
    });
  } else {
    return res.status(404).json({
      status: statusText.error,
      data: { msg: "Invalid credentials" },
    });
  }
});

// todo get all users

// todo get all doctors

// todo get all appointments

module.exports = { loginAdmin };
