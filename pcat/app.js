const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = new express();

// template engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.get("/", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "temp/index.html"));   //statik gönderim
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add-photo", (req, res) => {
  res.render("add-photo");
});
const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda çalışıyor.`);
});
