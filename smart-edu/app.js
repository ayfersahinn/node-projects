const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const pageRoute = require("./routes/pageRoutes");
const courseRoute = require("./routes/courseRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const userRoute = require("./routes/userRoute");
const app = express();

mongoose
  .connect("mongodb://localhost/smartedu-db")
  .then(() => console.log("connected mongodb"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

global.userIN = null;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use((req, res, next) => {
  res.locals.userIN = req.session.UserID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda çalışıyor`);
});
