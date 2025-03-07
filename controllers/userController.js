const { User } = require("../models/User");
const asyncHandler = require("express-async-handler");
const statusText = require("../utils/statusText");
const { uploadImage, destroyImage } = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { Doctor } = require("../models/Doctor");
const { Appointment } = require("../models/Appointment");

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, { __v: false });
  res.status(200).json({
    status: statusText.success,
    data: { users },
  });
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id, { __v: false });
  if (!user) {
    return res
      .status(404)
      .json({ status: statusText.error, msg: "User Not Found" });
  }
  res.status(200).json({
    status: statusText.success,
    data: { user },
  });
});

const editUser = asyncHandler(async (req, res) => {
  let hashedPassword;
  const { id } = req.params;
  const { name, password, gender, datebirth, phone } = req.body;
  const user = await User.findById(id, { __v: false });
  if (!user) {
    return res
      .status(404)
      .json({ status: statusText.error, msg: "User Not Found" });
  }
  if (!req.file) {
    return res
      .status(400)
      .json({ status: statusText.error, msg: "please provide img" });
  }
  const result = await uploadImage(req.file.path);
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      password: hashedPassword,
      image: result.secure_url,
      publicIdImg: result.public_id,
      gender,
      datebirth,
      phone,
    },
    { new: true }
  ).select("-password");

  res.status(200).json({
    status: statusText.success,
    data: { user: updatedUser, msg: "Updated successfully" },
  });
  fs.unlinkSync(req.file.path);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res
      .status(404)
      .json({ status: statusText.error, msg: "User Not Found" });
  }
  await destroyImage(user.publicIdImg);
  res.status(200).json({
    status: statusText.success,
    data: { user, msg: "Deleted successfully" },
  });
});

const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate("userId")
    .populate("docId");
  res.status(200).json({
    status: statusText.success,
    data: { appointments },
  });
});

const getMyAppointments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.find({ userId: id }).populate("docId");

  if (!appointments) {
    return res.status(400).json({
      status: statusText.fail,
      msg: "your appointment is empty go appointment",
    });
  }

  res.status(200).json({
    status: statusText.success,
    data: { appointments },
  });
});

// API To book appointment
const bookAppointment = asyncHandler(async (req, res) => {
  const { docId, slotDate, slotTime } = req.body;
  const docData = await Doctor.findById(docId).select("-password");
  if (!docData.available) {
    return res.status(400).json({
      status: statusText.error,
      data: { msg: "Doctor not available" },
    });
  }

  let slots_booked = docData.slots_booked;

  if (slots_booked[slotDate]) {
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.status(400).json({
        status: statusText.error,
        data: { msg: "Slot not available" },
      });
    } else {
      slots_booked[slotDate].push(slotTime);
    }
  } else {
    slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);
  }

  const appointmentData = {
    userId: req.user.id,
    docId,
    amount: docData.fees,
    slotTime,
    slotDate,
    data: Date.now(),
  };

  const newAppointment = await Appointment.create(appointmentData);

  // save new slots data in docData
  await Doctor.findByIdAndUpdate(docId, { slots_booked });

  res.status(200).json({
    status: statusText.success,
    data: { appointment: newAppointment, msg: "Booking successfully" },
  });
});

// cancelAppointment

const cancelAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  const { slotDate, slotTime } = appointment;
  if (!appointment) {
    return res.status(404).json({
      status: statusText.error,
      data: { msg: "Appointment not found" },
    });
  }
  appointment = await Appointment.findByIdAndUpdate(
    id,
    { cancelled: true },
    { new: true }
  ).populate("docId");
  // appointment.docId.slots_booked
  let doctor = await Doctor.findById(appointment.docId._id);
  // console.log(doctor.slots_booked[slotDate]);
  const updateSlots = doctor.slots_booked[slotDate].filter(
    (slot) => slot !== slotTime
  );

  if (updateSlots.length === 0) {
    delete doctor.slots_booked[slotDate];
  } else {
    doctor.slots_booked[slotDate] = updateSlots;
  }
  appointment = await Appointment.findByIdAndDelete(id);
  res.status(200).json({
    status: statusText.success,
    data: { appointment: appointment, msg: "cancelled successfully" },
  });
});

module.exports = {
  allUsers,
  getUser,
  editUser,
  deleteUser,
  getAppointments,
  getMyAppointments,
  bookAppointment,
  cancelAppointment,
};
