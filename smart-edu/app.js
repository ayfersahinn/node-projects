const express = require("express");
const pageRoute = require("./routes/pageRoutes");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", pageRoute);
const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda çalışıyor`);
});
