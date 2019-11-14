const express = require('express');
const router = express.Router();
const data = require('../data/data.js');
const redis = require('redis');
const client = redis.createClient();
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let ret = [];
router.get('/history', async (req, res) => {
  let temp = [];
  for(let i = 0; i < ret.length; i++) {
    temp.push(await client.getAsync(ret[i]));
  }
  res.send(ret);
});

//Need to work on later
router.get('/:id', async (req, res) => {
  const rId = req.params.id;
  let cacheVal = await client.getAsync(rId);
  if(!cacheVal) {
    try {
      let dataCall = await data.getById(rId);
      res.send(dataCall);
      cacheVal = await client.setAsync(rId, JSON.stringify(dataCall));
      ret.unshift(rId);
      if(ret.length > 20) {
        ret.pop();
      }
    } catch(e) {
      console.log(e);
      res.status(404).json("404 Person not found.")
    }
  } else {
    try {
      res.send(JSON.stringify(cacheVal));
      ret.unshift(cacheVal);
      if(ret.length > 20) {
        ret.pop();
      }


    } catch(e) {
      console.log(e)
      res.status(500).json("Uh oh Something went wrong!")
    }
  }
});

module.exports = router;
