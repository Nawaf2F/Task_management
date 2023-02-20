const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
// Schema
const schema = new mongoose.Schema({
    username:{type: String, required: true},
    password:{type: String},
}) 
schema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', schema)