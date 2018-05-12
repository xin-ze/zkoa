const koa = require('koa');
const koaBody = require("koa-body");

const app = new koa();

const main = (ctx) => {
    console.log(ctx.request.body);
}

app.use(koaBody());
app.use(main)

app.listen(4000);