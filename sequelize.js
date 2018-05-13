const Sequelize = require("sequelize");
const config = require('./config');

(async() => {
    // 第一步 创建一个sequelize对象实例:
    var sequelize = await new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    })

    console.log("-------");
    // 第二步 定义模型:
    var Pet = sequelize.define('pet', {
        id: {
            type: Sequelize.STRING(50),
            primaryKey: true
        },
        name: Sequelize.STRING(100),
        gender: Sequelize.BOOLEAN,
        birth: Sequelize.STRING(10),
        createdAt: Sequelize.BIGINT,
        updateAt: Sequelize.BIGINT,
        version: Sequelize.BIGINT
    }, {
        timestamps: false
    });

    let now = Date.now();

    Pet.create({
        id: 'g-' + now,
        name: 'Gaffey',
        gender: false,
        birth: '2008-05-12',
        createdAt: now,
        updateAt: now,
        version: 0
    }).then((p) => {
        cosole.log("created." + JSON.stringify(p));
    }).catch((e) => {
        console.log("failed: " + e);
    })
})()