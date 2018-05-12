const fs = require('fs');
const path = require("path");
const files = fs.readdirSync(path.join(__dirname, 'public'));

console.log("files: ", files);

var file = require('./testPost');
console.log("file:", file);