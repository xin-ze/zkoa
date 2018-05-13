const koa = require('koa');
const fs = require("fs");
const path = require("path");
const os = require("os");
const koaBody = require("koa-body");
let staticFiles = require('./static-files'); 
//也可以用koa-static实现: const static = require("koa-static"); app.use(static(__dirname, '/static'));
let routerController = require("./controller");

const app =new koa();



const main = (ctx, next) => {
    ctx.response.type = 'html';
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    next();
}

const uploadFile = async ctx => {
    const body = ctx.request.body;
    console.log("> uploadFile", body.files);
    const tmpdir = os.tmpdir();
    console.log("tmpdir:", tmpdir);
    const filePaths = [];
    const files = ctx.request.body.files || {};
    console.log("keys:", Object.keys(files));
    for(let key in files){
        const file = files[key];
        console.log("debug: ", key, file);
        const reader = await fs.createReadStream(file.path);
        const writer = fs.createWriteStream(`./upload/${Date.now()}_file.name`);
        reader.pipe(writer);

    }
    ctx.body = '上传完成';
    
}

app.use(staticFiles('/static/', __dirname+'/static'));
app.use(koaBody({multipart:true}));
app.use(main);
// app.use(route.post('/upload', uploadFile))
app.use(routerController());


app.listen(4000);
console.log(`Server run on port: 4000`);