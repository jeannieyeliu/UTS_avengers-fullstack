const express = require("express");
const router = express.Router();
const {
  find,
  findById,
  create,
  update,
  checkPostExist,
  checkIsUserMatch,
  deleteOnePost
} = require("../controller/post");
const authUser = require("../middleware/authUser");

router.get("/", find);
router.post("/", authUser, create);
router.get("/:id", findById);
router.patch("/:id", authUser, checkPostExist, checkIsUserMatch, update);
router.delete(
  "/:id",
  authUser,
  checkPostExist,
  checkIsUserMatch,
  deleteOnePost
);

module.exports = router;
