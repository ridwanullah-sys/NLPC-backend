const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const verifyAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ err: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await adminModel.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    return res.status(400).json({ err: err.messge });
  }
};

module.exports = verifyAuth;
