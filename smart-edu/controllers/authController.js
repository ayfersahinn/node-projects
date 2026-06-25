const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const same = await bcrypt.compare(password, user.password);

    if (!same) {
      return res.status(400).send("Wrong password");
    }

    res.status(200).send("You are logged in");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      error,
    });
  }
};
