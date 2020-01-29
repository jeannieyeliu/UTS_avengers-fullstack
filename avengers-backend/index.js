const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const cors = require("cors");
const user = require("./routers/userRoute");
const topic = require("./routers/topicRoute");
const post = require("./routers/postRoute");
const comment = require("./routers/commentRoute");
const secondComment = require("./routers/secondCommentRoute");
const qiniu = require("./routers/qiniuRoute");
const leaderboard = require("./routers/leaderBoardRoute");
const getMostPostUser = require("./redisUtility/leaderBoard/getMostPostUser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);
app.use("/topic", topic);
app.use("/post", post);
app.use("/post", comment);
app.use("/post", secondComment);
app.use("/qiniu", qiniu);
app.use("/leaderboard", leaderboard);

app.use((error, req, res, next) => {
  res.json({ error });
});

getMostPostUser();

app.get("/health-check", (req, res) => {
  return res.status(200).send("healthy...");
});

const mongo_host = process.env.MONGO_HOST || "localhost";
const mongo_port = process.env.MONGO_PORT || 27017;
const mongo_database = process.env.MONGO_DB || "Avengers";

mongoose
  .connect(`mongodb://${mongo_host}:${mongo_port}/${mongo_database}`, {
    useNewUrlParser: true, //removing warning
    useCreateIndex: true //removing warning
  })
  .then(() => console.log("connected to db..."))
  .catch(err => console.log(err));

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`listening to port:${port}...`));
