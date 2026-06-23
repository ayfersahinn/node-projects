const express = require("express");
const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const postperPage = 4;
  const totalPost = await Post.find().countDocuments();

  const posts = await Post.find()
    .sort("-createdAt")
    .skip((page - 1) * postperPage)
    .limit(postperPage);
  res.render("index", {
    posts,
    current: page,
    pages: Math.ceil(totalPost / postperPage),
  });
};
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post,
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
};

exports.updatePost = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
