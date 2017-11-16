const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const config = require('../config/database');


//user schema
const UserSchema = mongoose.Schema({
    fname: { type: String},
    lname: { type: String},
    description:{type: String},
    email: {type: String, required: true},
    pwd: {type: String, required: true}
});


const User = module.exports = mongoose.model('User', UserSchema);

