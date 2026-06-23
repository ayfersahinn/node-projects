const Photo = require("../models/Photo");
const fs = require("fs");
const path = require("path");

exports.getAllPhotos = async (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "temp/index.html"));   //statik gönderim

  const page = req.query.page || 1;
  const photosPerPage = 3;
  const totalPhotos = await Photo.find().countDocuments();
  const photos = await Photo.find()
    .sort("-dateCreated")
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);
  res.render("index", {
    photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo-detail", {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  // await Photo.create(req.body);
  // res.redirect("/");
  const uploadDir = path.join(__dirname, "../public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  let uploadImage = req.files.image;
  let uploadPath = path.join(__dirname, "../public/uploads", uploadImage.name);
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadImage.name,
    });
    res.redirect("/");
  });
};

exports.updatePhoto = async (req, res) => {
  await Photo.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/../public" + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
