const MongoClient = require("mongodb").MongoClient;

let _connection = undefined;
let _db = undefined;

const mongoConfig = {
  serverUrl: "mongodb://localhost:27017/",
  database: "Tasks"
};

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect("mongodb://localhost:27017/Soong-Brandon-CS554-lab1", { useNewUrlParser: true,  useUnifiedTopology: true})
    _db = await _connection.db(mongoConfig.database);
  }
  return _db;
};
