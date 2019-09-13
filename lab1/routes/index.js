const tasksRoutes = require("./tasks");
const express = require("express");

const constructorMethod = app => {
  app.use(function(req, res, next) {
    let method = req.method;
    let route = req.originalUrl;
      console.log(`${method}` + " " + `${req.protocol}` + "://" + req.get('host') +  `${route}` + " " + JSON.stringify(req.body));
 next();
});
const pathsAccessed = {};
app.use(function(req, res, next) {
  if (!pathsAccessed[req.path]) {
     pathsAccessed[req.path] = 0;
  }
  pathsAccessed[req.path]++;
  console.log( "There have now been " + pathsAccessed[req.path] + " requests made to " + req.path);
  next();
});
  app.use("/api", tasksRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};


module.exports = constructorMethod;
