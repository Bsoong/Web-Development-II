const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require('redis');
const bluebird = require('bluebird')
const app = express();

// Create Redis Client
// let client = redis.createClient();
//
// client.on('connect', function(){
//   console.log('Connected to Redis...');
// });

const configRoutes = require("./routes");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
