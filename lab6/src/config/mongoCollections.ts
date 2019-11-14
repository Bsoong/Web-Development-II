const dbConnection = require("./mongoConnection");
const getCollectionFn = collection => Promise<any> =>  {
  let _col: Promise<any> = undefined;
  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
  tasks: getCollectionFn("Soong_Brandon_Lab6")
};
