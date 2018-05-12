const fn_hello = (ctx) => {
    let name = ctx.params.name || 'noname';
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
}

module.exports = {
    "GET /hello/:name": fn_hello
}