const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const ejs = require("ejs");
const Post = require("./models/Post");
const PostController = require("./controllers/PostController");
const PageController = require("./controllers/PageControllers");

dotenv.config();
const app = new express();

// db connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected mongodb"))
  .catch((err) => console.log(err));

//middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  }),
);

app.get("/", PostController.getAllPosts);
app.get("/posts/:id", PostController.getPost);
app.post("/posts", PostController.createPost);
app.put("/posts/:id", PostController.updatePost);
app.delete("/posts/:id", PostController.deletePost);

app.get("/about", PageController.getAboutPage);
app.get("/add_post", PageController.getAddPage);
app.get("/posts/edit/:id", PageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
