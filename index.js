const koa = require('koa');
const fs = require("fs");
const path = require("path");
const os = require("os");
const koaBody = require("koa-body");
const views = require("koa-views");
let routerController = require("./controller");

const app =new koa();

const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime(), execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}`);
})

// static file support:
if(!isProduction){
    let staticFiles = require('./static-files'); //也可以用koa-static实现: const static = require("koa-static"); app.use(static(__dirname, '/static'));
    app.use(staticFiles('/static/', __dirname+'/static'));
}

// parse request body
app.use(koaBody({multipart:true}));

// add nunjucks as view:
// app.use(templating('views', {
//     noCache: !isProduction,
//     watch: !isProduction
// }));
var handlebars = require('handlebars');
var layouts = require('handlebars-layouts');
// Register helpers 
handlebars.registerHelper(layouts(handlebars));
// Register partials 
handlebars.registerPartial('layout', fs.readFileSync(__dirname + '/views/base.hbs', 'utf8'));

app.use(views(path.join(__dirname, 'views'), {map: {html: 'handlebars'}}));

// add controller:
app.use(routerController());

app.listen(4000);
console.log(`Server run on port: 4000...`);