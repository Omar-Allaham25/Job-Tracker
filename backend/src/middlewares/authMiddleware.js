const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "Not authorized,user not found",
        });
      }
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        status: "failed",
        message: "Not authorized ,Invalid Token",
      });
    }
  }
  if (!token) {
    return res.status(401).json({
      message: "Not authorized, please login",
    });
  }
};
