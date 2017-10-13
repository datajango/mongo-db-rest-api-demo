require('dotenv').config();

const users = require('./users');
const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGOOSE_CONN);

//console.log(users);

users.forEach(function(element, i) {
    console.log(i+1, element);
});


