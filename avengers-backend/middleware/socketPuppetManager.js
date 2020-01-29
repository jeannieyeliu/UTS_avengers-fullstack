const Redis = require("ioredis");
const redis_host = process.env.REDIS_HOST || "127.0.0.1"; //this means redis will be 192.168.1.1
const redis_port = process.env.REDIS_PORT || 6379;
const redis = new Redis(redis_port, redis_host); // 192.168.1.1:6379

async function setSocketPuppet(ip) {
  // calculate if the last two logined user's logined time are less than five mins
  const lastUserId = await redis.lindex(ip, -1); //the last user Id
  const lastLoginTime = await redis.hget(ip, `loginTime${lastUserId}`);

  const secondUserId = await redis.lindex(ip, redis.llen(ip) - 2); //the second last user Id
  const secondLstLoginTime = await redis.hget(ip, `loginTime${secondUserId}`);

  const timeGap = (lastLoginTime - secondLstLoginTime) / 1000 / 60;

  if (timeGap < 5) {
    // less than 5 mins
    await redis.hset(
      "socketPuppet",
      ip,
      redis.hget(ip, `username${lastUserId}:`)
    );
    await redis.hset(
      "socketPuppet",
      ip,
      redis.hget(ip, `username${secondUserId}:`)
    );
  }
}

module.exports = async function socketPuppet(req, res, next) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  //if this user doesn't exist, save them into hash table and list
  if (await !redis.hexists(ip, `username${req.user._id}:`)) {
    await redis.hset(ip, `username${req.user._id}:`, req.user.username);
    await redis.hset(ip, `email:${req.user._id}:`, req.user.email);
    await redis.hset(ip, `loginTime${req.user._id}:`, Date.now());
    await redis.rpush(ip, req.user._id);

    setSocketPuppet(ip);
  } else {
    // update the newest login time
    await redis.hset(ip, `loginTime${req.user._id}:`, Date.now());
    if ((await redis.lindex(ip, -1)) !== req.user._id) {
      await redis.lrem(ip, 0, req.user._id);
      await redis.rpush(ip, req.user._id);
    }
    await setSocketPuppet(ip);
  }
  next();
};
