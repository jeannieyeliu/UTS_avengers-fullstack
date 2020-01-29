const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = async function authUser(req, res, next) {
  let token = req.header("Authorization");
  if (!token) res.status(401).json({ token: "no token in the header" });
  try {
    const encoded = await jwt.verify(token, config.key);
    req.user = encoded;
    next();
  } catch (error) {
    return res.redirect("http://localhost:3000/signin");
    // return res.status(401).send(error);
  }
};
