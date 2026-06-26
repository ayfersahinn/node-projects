const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.UserID);

    if (!user) {
      return res.redirect("/login");
    }

    next();
  } catch (error) {
    return res.redirect("/login");
  }
};
