const model = require('./model');

let Pet = model.Pet,
    User = model.User;

(asycn () => {
    await Pet.create({
        name: 'stunk',
        gender: true,
        birth: '2008-05-12',
    })
    console.log('create a pet...');
    await User.create({
        email: '1173425790@qq.com',
        passwd: '123456',
        gender: false,
        name: 'hmz'
    })
    console.log('create a user...');
    
    process.exit(0);
})()