const bcrypt = require("bcryptjs");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "there is missing feild",
      });
    }
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "this email is already exists",
      });
    }
    // if (!(password === confirmPassword)) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "the passwords not same !!",
    //   });
    // }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create(name, email, hashPassword);
    res.status(201).json({
      status: "success",
      message: "User Registered successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "fail",
      message: "server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "there is missing feild",
      });
    }
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      status: "success",
      message: "login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
