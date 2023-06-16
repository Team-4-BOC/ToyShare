require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", function (req, res) {
  res.render("index.html");
});

var port = 3000;
app.listen(port, () => {
  console.log("Server listening on port", port);
});
