const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Photo = require("./models/Photo");
const fs = require("fs");

const app = new express();

mongoose.connect("mongodb://localhost:27017/pcat-test-db").then(() => {
  console.log("MongoDB connected");
});
// template engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.get("/", async (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "temp/index.html"));   //statik gönderim
  const photos = await Photo.find().sort("-dateCreated");
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
  // await Photo.create(req.body);
  // res.redirect("/");
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdir(uploadDir, (err) => {
      if (err) console.log(err);
    });
  }
  let uploadImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadImage.name,
    });
    res.redirect("/");
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda çalışıyor.`);
});
