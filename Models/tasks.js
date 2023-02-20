const mongoose = require('mongoose')

// Schema
const schema = new mongoose.Schema({
    title:{type: String, required: true},
    owner:{type: mongoose.Schema.Types.ObjectId,
            ref: "User"},
    description:{type: String},
    level:{type: String},
}) 
module.exports = mongoose.model('Task', schema)