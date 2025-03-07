const mongoose = require("mongoose");

async function connect(url) {
  try {
    await mongoose.connect(url);
    console.log("connected successfully DP");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connect;
