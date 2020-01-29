const Topic = require("../model/topicModel");
const Post = require("../model/postModel");

class TopicCtl {
  async find(req, res, next) {
    const { per_page = 10 } = req.query;
    const page = Math.round(Math.max(req.query.page * 1, 1)) - 1;
    //为了字符串转数字，所以*1
    const perPage = Math.round(Math.max(per_page * 1, 1));
    const topics = await Topic.find({ name: new RegExp(req.query.topicName) })
      .limit(perPage)
      .skip(page * perPage);
    return res.status(200).json(topics);
  }

  async findById(req, res, next) {
    const { fields = "" } = req.query;
    //return those hidden fields by adding fields= from query
    const selectFields = fields
      .split(";")
      .filter((f) => f)
      .map((f) => " +" + f)
      .join("");
    const topic = await Topic.findById(req.params.id).select(selectFields);
    //select is for which property you want to response back, _id is always back,
    // add "+" will response back extrl property that aren't meant to be back
    if (topic) return res.status(200).json(topic);

    return res.status(404).json({ result: "topic not exist" });
  }
  async create(req, res, next) {
    const topic = await new Topic(req.body).save();
    if (topic) return res.status(201).json(topic);
    return res.status(500).json({ result: "create failed" });
  }
  async update(req, res, next) {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body);
    if (!topic)
      //更新前得topic
      return res.status(404).json({ result: "topic not exist" });
    return res.status(201).json({ topic: "update succeeded" });
  }

  async listPosts(req, res, next) {
    const posts = await Post.find({ topics: req.params.id });
    return res.status(200).json(posts);
  }

  async deleteOneTopic(req, res, next) {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ result: "topic not exist" });
    await Topic.deleteOne({ _id: req.params.id });
    return res.status(200).json({ topic: "delete succeeded" });
  }
}

module.exports = new TopicCtl();
