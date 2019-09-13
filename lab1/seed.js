const dbConnection = require("./config/mongoConnection");
const data = require("./data/");
const tasks = data.tasks;

const main = async () => {
const db = await dbConnection();
await db.dropDatabase();

let t1 = await tasks.create("testes" , "oop, oop", 13, false, [])
for(let i = 0; i < 100; i++) {
  let count = i;
  let temp = await tasks.create("test" +i, "one two", 11, true, [])
}

let t2 = await tasks.createComment(t1._id,"ooga", "booga booga")
await db.serverConfig.close();
};

main().catch(console.log);
