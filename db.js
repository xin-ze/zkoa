const Sequelize = require('sequelize');
const config = require('./config');
const uuidv4 = require('uuid/v4');

let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

let generateId = () => {
    return uuidv4();
};

let ID_TYPE = Sequelize.STRING(50);

let defineModel = (name, attributes) => {
    let attrs = {};
    for(let key in attributes){
        let value = attributes[key];
        if(typeof value == 'object' && value[type]) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }else{
            attrs[key] = {
                type: value,
                allowNull: false
            }
        }
    }

    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    }
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    }

    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: obj => {
                let now = Date.now();
                if(obj.isNewRecord){
                    console.log('will create entity...'+obj);
                    if(!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                }else{
                    console.log('will update entity...');
                    obj.updatedAt = now;
                    obj.version++;
                }
            }
        }
    })
}

let exp = {
    defineModel: defineModel,
    sync: ()=>{
        if(process.env.NODE_ENV !== 'production'){
            Sequelize.sync({force: true});
        }else{
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
for(let type of TYPES) {
     exp[type] = Sequelize[type];
}

exp.generateId = generateId; 


module.exports = exp;