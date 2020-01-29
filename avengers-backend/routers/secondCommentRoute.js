const express = require("express");
const router = express.Router();

const {
  find,
  findById,
  create,
  update,
  checkSecondCommentExist,
  checkIsCommentatorMatch,
  deleteOneSecondComment
} = require("../controller/secondComment");
const authUser = require("../middleware/authUser");

//find all second comments
router.get("/:postId/comment/:commentId/secondComment", find);
//create a second comment
router.post("/:postId/comment/:commentId/secondComment", authUser, create);
//get one particular second comment
router.get(
  "/:postId/comment/:commentId/secondComment/:secondCommentId",
  findById
);
//update image urls for a paticular second comment
router.patch(
  "/:postId/comment/:commentId/secondComment/:secondCommentId",
  authUser,
  checkSecondCommentExist,
  checkIsCommentatorMatch,
  update
);
//delete a paticular second comment
router.delete(
  "/:postId/comment/:commentId/secondComment/:secondCommentId",
  authUser,
  checkSecondCommentExist,
  checkIsCommentatorMatch,
  deleteOneSecondComment
);

module.exports = router;
