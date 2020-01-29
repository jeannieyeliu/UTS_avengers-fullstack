const Post = require("../../model/postModel");

const Redis = require("ioredis");
const redis_host = process.env.REDIS_HOST || "127.0.0.1"; //this means redis will be 192.168.1.1
const redis_port = process.env.REDIS_PORT || 6379;
const redis = new Redis(redis_port, redis_host); // 192.168.1.1:6379

module.exports = async function() {
  const posts = await Post.find().populate("post_owner");

  // clear user post number
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].post_owner) {
      //post_owner is not null
      redis.zadd("most-post-user", 0, posts[i].post_owner["username"]);
    }
  }

  // traverse each post and calculate how many post have been posted for each user
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].post_owner) {
      //post_owner is not null
      redis.zincrby("most-post-user", 1, posts[i].post_owner["username"]);
    }
  }
};
