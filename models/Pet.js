const db = require('../db.js');

module.exports = db.defineModel('pets', {
    // ownid: db.STRING(50),
    name: db.STRING(100),
    gender: db.BOOLEAN,
    birth: db.STRING(10)
})

