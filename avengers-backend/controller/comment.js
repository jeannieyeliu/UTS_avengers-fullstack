const Comment = require("../model/commentModel");

class CommentCtl {
  async find(req, res, next) {
    const { per_page = 10 } = req.query;
    const page = Math.round(Math.max(req.query.page * 1, 1)) - 1;
    //为了字符串转数字，所以*1
    const perPage = Math.round(Math.max(per_page * 1, 1));
    const comments = await Comment.find({
      postId: req.params.postId
    })
      .limit(perPage)
      .skip(page * perPage);
    return res.status(200).json(comments);
  }

  async checkCommentExist(req, res, next) {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) res.status(404).json({ comment: "comment not exist" });
    req.comment = comment;
    next();
  }

  async checkIsCommentatorMatch(req, res, next) {
    if (req.comment.commentator.toString() !== req.user._id)
      return res.status(403).json({ error: "Forbidden" });
    next();
  }

  async findById(req, res, next) {
    const { fields = "" } = req.query;
    const selectFields = fields
      .split(";")
      .filter((f) => f)
      .map((f) => " +" + f)
      .join("");
    const comment = await Comment.findById(req.params.commentId).select(
      selectFields
    );
    if (comment) return res.status(200).json(comment);
    return res.status(404).json({ comment: "comment not exist" });
  }
  async create(req, res, next) {
    const comment = await new Comment({
      postId: req.params.postId,
      commentator: req.user._id,
      images_url: req.body.images_url
    }).save();
    if (comment) return res.status(200).json(comment);
    return res.status(400).json({ comment: "create failed" });
  }
  async update(req, res, next) {
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body
    );
    if (comment)
      //更新前得topic
      return res.status(200).json(comment);
  }

  async deleteOneComment(req, res, next) {
    await Comment.deleteOne({ _id: req.params.commentId });
    res.status(200).json({ result: "delete succeeded" });
  }
}

module.exports = new CommentCtl();
