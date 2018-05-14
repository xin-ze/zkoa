const defaultConfig = './config-default.js';
const testConfig = './config-test.js';
const overrideConfig = './config-override.js';

const fs = require('fs');

var config = null;

if(process.env.NODE_ENV === 'test'){
    console.log(`load ${testConfig}`);
    config = require(testConfig);
}else{
    console.log(`load ${defaultConfig}`);
    config = require(defaultConfig);
    try {
        if(fs.statSync(__dirname + 'config-override.js').isFile()){
            console.log(`load ${overrideConfig}`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${overrideConfig}`);
    }
}

moduel.exports = config;