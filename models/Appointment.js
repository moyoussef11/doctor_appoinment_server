const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    docId: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Number },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = { Appointment };
