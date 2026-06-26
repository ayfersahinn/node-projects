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

    if (same) {
      req.session.UserID = user._id;
    } else {
      return res.status(400).send("Wrong password");
    }

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
