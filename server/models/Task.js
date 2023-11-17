const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    text : String
},{timestamps:true})

const task = mongoose.model('task',TaskSchema)

module.exports = task