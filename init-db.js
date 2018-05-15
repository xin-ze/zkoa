const model = require("./model");
console.log("before sync");
model.sync();

console.log('init db ok.');
process.exit(0);