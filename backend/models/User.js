const mongoose = require('mongoose');
const Schema = mongoose.Schema;



module.exports = mongoose.model('User', {
    first: String,
    last: String,
    email: String,
    pwd: String,
    description: String
})
