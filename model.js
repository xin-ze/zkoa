const fs = require('fs');

const exp = {};

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter(item => item.endsWith('.js'));

for(let f of js_files){
    let name = f.substring(0, f.length - 3);
    exp[name] = require(__dirname + '/models/' + f);
}

exp.sync = () => {
    db.sync();
}

module.exports = exp;
