const importedData = require('./import.json');

getById = ((id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // find project
        if (id > 0 && id <= importedData.length) {
            resolve(importedData[id - 1]);
        } else {
            reject(new Error("Timedout. Make sure it is a proper ID"));
        }}, 5000);
      });
})

module.exports ={
  getById
}
