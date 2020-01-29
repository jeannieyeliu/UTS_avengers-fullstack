const express = require("express");
const router = express.Router();
const {
  find,
  findById,
  create,
  update,
  listPosts,
  deleteOneTopic
} = require("../controller/topic");
const authUser = require("../middleware/authUser");

//get all topics
router.get("/", find);

//add a topic
router.post("/", authUser, create);

//get a topic
router.get("/:id", findById);

//update a topic
router.patch("/:id", authUser, update);

//get all post under a topic
router.get("/:id/posts", listPosts);

//delete a topic
router.delete("/:id", authUser, deleteOneTopic);

module.exports = router;
