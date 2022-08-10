const express = require("express");
const router = express.Router();
const {
  create,
  update,
  getAll,
  deleteUser,
} = require("../controllers/private");
const { protect } = require("../middleware/auth");

router.route("/user/:id").delete(protect, deleteUser);
router.route("/user/:id").put(protect, update);
router.route("/users").get(protect, getAll);
router.route("/user").post(protect, create);
router.route("/").get(protect, getAll);

module.exports = router;
