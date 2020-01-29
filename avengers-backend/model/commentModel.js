const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    commentator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    images_url: [{ type: String, required: true }]
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = model("Comment", commentSchema);
