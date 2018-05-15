const Sequelize = require("sequelize");
const config = require('./config');

(async() => {
    // 第一步 创建一个sequelize对象实例:
    var sequelize = await new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    })

    console.log("-------");
    // 第二步 定义模型:
    var Pet = sequelize.define('user', {
        email: {
            type: Sequelize.STRING(20),
            unique: true
        },
        name: Sequelize.STRING(50),
        createdAt: Sequelize.BIGINT,
        updatedAt: Sequelize.BIGINT,
        version: Sequelize.BIGINT
    }, {
        timestamps: false
    });

    let now = Date.now();


    sequelize.sync().then(() => {
        console.log("-----sync ok....");
    })

    // Pet.create({
    //     email: '1173425790@qq.com',
    //     name: 'hmz',
    //     createdAt: now,
    //     updatedAt: now,
    //     version: 0
    // }).then((p) => {
    //     console.log("created." + JSON.stringify(p));
    // }).catch((e) => {
    //     console.log("failed: " + e);
    // })
})()