const fs = require("fs");
const path = require("path");

const addMapping = (router, mapping) => {
    for(var url in mapping) {
        if(url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }else if(url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping POST ${path}`);
        }else{
            console.log(`invalid URL: ${url}`);
        }
    }
}

const addControls = (router, dir) => {
    let files = fs.readdirSync(path.resolve(__dirname, dir));
    let js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for(let f of js_files) {
        let mapping = require(path.resolve(__dirname, dir, f));
        addMapping(router, mapping);
    }
    
}

module.exports = (dir) => {
    let control_dir = dir || 'controllers';
    let router = require('koa-router')();
    addControls(router, control_dir);
    return router.routes();
}