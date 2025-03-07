const { User } = require("../models/User");
const Jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const statusText = require("../utils/statusText");

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: statusText.error, msg: errors.array() });
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .json({ status: statusText.error, msg: "Email already exists" });
  }
  const newUser = new User(req.body);
  await newUser.save();
  res
    .status(201)
    .json({ status: statusText.success, msg: "Registration Successful" });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: statusText.error, msg: errors.array() });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ status: statusText.error, msg: "User Not Found" });
  }
  const passwordMatched = await user.comparePassword(password);
  if (!passwordMatched) {
    return res
      .status(400)
      .json({ status: statusText.fail, msg: "Password invalid" });
  }
  const token = Jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );
  res.status(200).json({
    status: statusText.success,
    data: { user, token, msg: "login Successful" },
  });
});

module.exports = { register, login };
