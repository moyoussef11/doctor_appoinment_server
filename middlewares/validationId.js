const mongoose = require("mongoose");
const statusText = require("../utils/statusText");
const validationId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ status: statusText.error, msg: "Invalid ID" });
  }
  next();
};

module.exports = { validationId };
