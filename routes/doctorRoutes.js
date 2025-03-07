const router = require("express").Router();
const {
  addDoctor,
  getDoctors,
  getDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");
const { requireAuthAndAdmin } = require("../middlewares/auth");
const uploadImg = require("../middlewares/uploadImage");
const { validationId } = require("../middlewares/validationId");

router
  .route("/")
  .get(getDoctors)
  .post(requireAuthAndAdmin, uploadImg.single("image"), addDoctor);
router
  .route("/:id")
  .get(validationId, getDoctor)
  .delete(validationId, requireAuthAndAdmin, deleteDoctor);

module.exports = router;
