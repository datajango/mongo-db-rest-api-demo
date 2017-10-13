require('dotenv').config();
const UserModel = require('../models/user');
const users = require('./users');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

async function connect() {
    try {
        await mongoose.connect(process.env.MONGOOSE_CONN);
    } catch(err) {
        console.log('error', err);
    }
}

async function add(data, i) {
    try {
        const new_user = new UserModel(data);
        console.log(i, new_user);
        const user = await new_user.save();
        console.log('success', i);        
    } catch(err) {
        console.log('error', err);
    }
}

function seed() {
    console.log('started');

    connect();

    console.log('connected');

    //users.forEach(add);
    add(users[0],0);
    add(users[1],1);
    add(users[2],2);
    add(users[3],3);
    add(users[4],4);
    add(users[5],5);
    add(users[6],6);
    add(users[7],7);
    add(users[8],8);

    //process.exit(0);
}

seed();


