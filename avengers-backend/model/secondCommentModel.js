const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const secondCommentSchema = new Schema(
  {
    commentator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images_url: [{ type: String, required: true }],
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment", required: true }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = model("SecondComment", secondCommentSchema);
