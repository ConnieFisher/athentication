const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const config = require('../config/database')

mongoose.Promise = Promise



//user schema
const UserSchema = mongoose.Schema({
    fname: { type: String},
    lname: { type: String},
    description:{type: String},
    email: {type: String, required: true},
    pwd: {type: String, required: true}
});

 UserSchema.pre('save', function(next) {
    const user = this    

    if(!user.isModified('pwd')) return next()
    bcrypt.hash(user.pwd, null, null, function(err, hash){
        if(err) return next(err)
        user.pwd = hash
        next()
    })
})  

module.exports = mongoose.model('User', UserSchema)
 