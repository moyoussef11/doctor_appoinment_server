const asyncHandler = require("express-async-handler");
const statusText = require("../utils/statusText");
const fs = require("fs");
const { validationResult } = require("express-validator");
const { uploadImage, destroyImage } = require("../utils/cloudinary");
const { Doctor } = require("../models/Doctor");

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().select("-password");
  res.status(200).json({
    status: statusText.success,
    data: { doctors },
  });
});

const getDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id).select("-password");
  res.status(200).json({
    status: statusText.success,
    data: { doctor },
  });
});

const addDoctor = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: statusText.error, msg: errors.array() });
  }
  const {
    name,
    email,
    password,
    speciality,
    degree,
    fees,
    experience,
    about,
    available,
    address,
    phone,
  } = req.body;
  const result = await uploadImage(req.file.path);

  const docData = {
    name,
    email,
    password,
    speciality,
    degree,
    fees,
    experience,
    about,
    date: Date.now(),
    available,
    address,
    phone,
    image: result.secure_url,
    publicIdImg: result.public_id,
  };

  await Doctor.create(docData);

  res.status(201).json({
    status: statusText.success,
    data: { msg: "Added Doctor successfully" },
  });
  fs.unlinkSync(req.file.path);
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findByIdAndDelete(id);
  await destroyImage(doctor.publicIdImg);
  res.status(200).json({
    status: statusText.success,
    data: { msg: "Deleted successfully" },
  });
});

module.exports = { getDoctors, getDoctor, addDoctor, deleteDoctor };
