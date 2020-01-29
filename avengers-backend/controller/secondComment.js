const SecondComment = require("../model/secondCommentModel");

class SecondCommentCtl {
  async find(req, res, next) {
    const { per_page = 10 } = req.query;
    const page = Math.round(Math.max(req.query.page * 1, 1)) - 1;
    //为了字符串转数字，所以*1
    const perPage = Math.round(Math.max(per_page * 1, 1));
    const { postId, commentId } = req.params;
    const secondComments = await SecondComment.find({
      images_url: new RegExp(req.query.imageUrl),
      postId,
      commentId
    })
      .limit(perPage)
      .skip(page * perPage)
      .populate("commentator"); //populate the whole object refer to this Model
    return res.status(200).json(secondComments);
  }

  async checkSecondCommentExist(req, res, next) {
    const secondComment = await SecondComment.findById(
      req.params.secondCommentId
    );
    if (!secondComment)
      res.status(404).json({ result: "secondComment not exist" });
    req.secondComment = secondComment;
    next();
  }

  async checkIsCommentatorMatch(req, res, next) {
    if (req.secondComment.commentator.toString() !== req.user._id)
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
    const secondComment = await SecondComment.findById(
      req.params.secondCommentId
    ).select(selectFields);
    if (secondComment) return res.status(200).json(secondComment);
    return res.status(404).json({ result: "secondComment not exist" });
  }
  async create(req, res, next) {
    const secondComment = await new SecondComment({
      postId: req.params.postId,
      commentId: req.params.commentId,
      commentator: req.user._id,
      images_url: req.body.images_url
    }).save();
    if (secondComment) return res.status(200).json(secondComment);
  }

  async update(req, res, next) {
    const secondComment = await SecondComment.findByIdAndUpdate(
      req.params.secondCommentId,
      { images_url: req.body.images_url }
    );
    if (secondComment)
      //更新前得second comment
      return res.status(200).json(secondComment);
  }

  async deleteOneSecondComment(req, res, next) {
    const result = await SecondComment.deleteOne({
      _id: req.params.secondCommentId
    });
    if (result) return res.status(200).json({ result: "delete succeed" });
  }
}

module.exports = new SecondCommentCtl();
