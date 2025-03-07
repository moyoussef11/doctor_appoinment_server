const mongoose = require("mongoose");
const bcrypt = require("bcrypt");




const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },
    publicIdImg: {
      type: String,
      default: "none",
    },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    fees: { type: Number, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
    available: { type: Boolean, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true, minimize: false }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

doctorSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = { Doctor };
