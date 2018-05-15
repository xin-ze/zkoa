const db = require("../db");

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(20),
        unique: true
    },
    passwd: db.STRING(50),
    gender: db.BOOLEAN,
    name: db.STRING(50)
})