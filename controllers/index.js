const fs = require("fs");

const fn_signin = async (ctx) => {
    let {email='koa', password="123"} = ctx.request.body;
    console.log(`signin with name: ${email}, password: ${password}`);
    // ctx.response.body = `welcome ${user}`;
    if(email === '1173425790@qq.com' && password === '123456'){
        console.log("signin ok!");
        await ctx.render('signin-ok.html', {
            title: 'Sign In Ok',
            name: email
        })
    }else{
        console.log("signin failed!");
        await ctx.render('signin-failed.html', {
            title: 'Sign In Failed.'
        })
    }
}
const fn_upload = async (ctx) => {
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

module.exports = {
    "GET /": async (ctx) => {
        await ctx.render("index.html", {});
    },
    "POST /signin": fn_signin,
    "POST /upload": fn_upload
}