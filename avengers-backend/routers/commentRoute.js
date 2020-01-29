const express = require("express");
const router = express.Router();
const {
  find,
  findById,
  create,
  update,
  deleteOneComment,
  checkCommentExist,
  checkIsCommentatorMatch
} = require("../controller/comment");
const authUser = require("../middleware/authUser");

router.get("/:postId/comment", find);
router.post("/:postId/comment", authUser, create);
router.get("/:postId/comment/:commentId", checkCommentExist, findById);
router.patch(
  "/:postId/comment/:commentId",
  authUser,
  checkCommentExist,
  checkIsCommentatorMatch,
  update
);
router.delete(
  "/:postId/comment/:commentId",
  authUser,
  checkCommentExist,
  checkIsCommentatorMatch,
  deleteOneComment
);

module.exports = router;
