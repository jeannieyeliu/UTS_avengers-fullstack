const express = require("express");
const router = express.Router();
const Redis = require("ioredis");
const redis_host = process.env.REDIS_HOST || "127.0.0.1"; //this means redis will be 192.168.1.1
const redis_port = process.env.REDIS_PORT || 6379;
const redis = new Redis(redis_port, redis_host); // 192.168.1.1:6379

router.get("/most-post-user", async (req, res) => {
  //return the most post user and post numbers
  const result = await redis.zrange("most-post-user", -5, -1, "WITHSCORES");
  for (let i = 0; i < result.length; i += 2) {
    userObject[result[i]] = result[i + 1];
  }
  return res.status(200).json(userObject);
});

module.exports = router;
