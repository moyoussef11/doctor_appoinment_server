const Jwt = require("jsonwebtoken");
const statusText = require("../utils/statusText");

const requireAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: statusText.error,
        msg: "Unauthorized",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        status: statusText.error,
        msg: "no token provided",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(400).json({
      status: statusText.error,
      msg: "Invalid token",
    });
  }
};

const requireAuthAndAdmin = async (req, res, next) => {
  return requireAuth(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: statusText.fail,
        msg: "only admin",
      });
    }
    next();
  });
};

const requireAuthAndUserHimself = async (req, res, next) => {
  return requireAuth(req, res, () => {
    const loggedUser = req.user.id;
    const { id } = req.params;
    if (loggedUser !== id) {
      return res.status(403).json({
        status: statusText.fail,
        msg: "Forbidden only user himself",
      });
    }
    next();
  });
};

module.exports = {
  requireAuth,
  requireAuthAndAdmin,
  requireAuthAndUserHimself,
};
