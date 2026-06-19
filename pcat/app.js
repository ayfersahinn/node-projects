const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Photo = require("./models/Photo");
const app = new express();

mongoose.connect("mongodb://localhost:27017/pcat-test-db").then(() => {
  console.log("MongoDB connected");
});
// template engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", async (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "temp/index.html"));   //statik gönderim
  const photos = await Photo.find({});
  res.render("index", {
    photos,
  });
});
app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo-detail", {
    photo,
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add-photo", (req, res) => {
  res.render("add-photo");
});

app.post("/photos", async (req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});
const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda çalışıyor.`);
});
