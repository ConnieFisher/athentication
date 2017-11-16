const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const bcrypt = require('bcrypt-nodejs');
// const bcrypt = require('bcrypt');
const config = require('../config/database');


//user schema
const UserSchema = mongoose.Schema({
    fname: { type: String},
    lname: { type: String},
    description:{type: String},
    email: {type: String, required: true},
    pwd: {type: String, required: true}
});

 UserSchema.pre('save', function(next) {
    const user = this;  
    const saltRounds = 10;

    if(!user.isModified('pwd')) return next();
    
    bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(user.pwd, salt, function(err, hash) {
            if(err)return next(err)
            user.pwd = hash;
            next();

        });
    });
    

    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //          bcrypt.hash(user.pwd, salt, function(err, hash) {
    //              console.log(hash);
                
    //          });
    //      });

}); 

const User = module.exports = mongoose.model('user', UserSchema);

