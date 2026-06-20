const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const methodOverride = require("method-override");
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
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  }),
);

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
app.get("/photos/edit/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render("edit-photo", {
    photo,
  });
});
app.put("/photos/:id", async (req, res) => {
  await Photo.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/photos/${req.params.id}`);
});

app.delete("/photos/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/public" + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda çalışıyor.`);
});
