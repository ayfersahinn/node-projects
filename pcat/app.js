const express = require("express");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageControllers");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI).then(() => {
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
app.use("/uploads", express.static("public/uploads"));

app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about", pageController.getAboutPage);
app.get("/add-photo", pageController.getAddPage);

app.get("/photos/edit/:id", pageController.getEditPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda çalışıyor.`);
});

// Request
//    ↓
// Route
//    ↓
// Controller
//    ↓
// Model (MongoDB)
//    ↓
// Response (EJS / Redirect)
