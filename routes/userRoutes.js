const router = require("express").Router();
const {
  allUsers,
  getUser,
  editUser,
  deleteUser,
  bookAppointment,
  getMyAppointments,
  getAppointments,
  cancelAppointment,
} = require("../controllers/userController");
const {
  requireAuth,
  requireAuthAndAdmin,
  requireAuthAndUserHimself,
} = require("../middlewares/auth");
const uploadImg = require("../middlewares/uploadImage");
const { validationId } = require("../middlewares/validationId");

router.route("/").get(requireAuthAndAdmin, allUsers);
router.route("/appointments").get(requireAuthAndAdmin, getAppointments);
router.route("/appointments/:id").get(requireAuth, cancelAppointment);

router
  .route("/:id/my-appointments")
  .get(requireAuth, requireAuthAndUserHimself, getMyAppointments);
// book appointment
router.route("/book-appointment").post(requireAuth, bookAppointment);

router
  .route("/:id")
  .get(validationId, getUser)
  .post(
    validationId,
    requireAuthAndUserHimself,
    uploadImg.single("image"),
    editUser
  )
  .delete(validationId, requireAuthAndUserHimself, deleteUser);

module.exports = router;
