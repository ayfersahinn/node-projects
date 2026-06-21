const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejs = require("ejs");
const Post = require("./models/Post");

const app = new express();
mongoose
  .connect("mongodb://localhost:27017/cleanblog-test-db")
  .then(() => console.log("connected mongodb"))
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  }),
);
app.get("/", async (req, res) => {
  // res.sendFile(path.resolve(__dirname, "temp/index.html"));
  const posts = await Post.find({});
  res.render("index", {
    posts,
  });
});
app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post,
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.post("/posts", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});

app.get("/posts/edit/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit", {
    post,
  });
});
app.put("/posts/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/posts/${req.params.id}`);
});
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
