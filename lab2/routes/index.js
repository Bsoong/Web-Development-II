const express = require("express");
const static = express.static(__dirname + "../public");
const app = express();
app.use("../public", static);

const constructorMethod = app => {
  app.get("/", (req, res) => {
    res.sendfile("home.html" , {root: __dirname + "/../public"});
  });

  app.use("*", (req, res) => {
    res.status(404).json({error: "Not found"});
  });

};

module.exports = constructorMethod;
