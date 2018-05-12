const fs = require("fs");

const fn_index = async (ctx) => {
    ctx.response.body = fs.createReadStream('./public/form.html');
}
const fn_signin = async (ctx) => {
    // let user = ctx.request.body.user || 'koa';
    // let pass = ctx.request.body.pass || '123';
    let {user='koa', pass="123"} = ctx.request.body;
    console.log(`signin with name: ${user}, password: ${pass}`);
    ctx.response.body = `welcome ${user}`;
}

module.exports = {
    "GET /": fn_index,
    "POST /signin": fn_signin
}