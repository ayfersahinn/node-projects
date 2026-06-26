const express = require("express");
const User = require("../models/User");

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.UserID });
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
  });
};
