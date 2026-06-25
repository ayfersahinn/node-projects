const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoutes");
const courseRoute = require("./routes/courseRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const app = express();

mongoose
  .connect("mongodb://localhost/smartedu-db")
  .then(() => console.log("connected mongodb"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda çalışıyor`);
});
