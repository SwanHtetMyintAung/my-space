const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
            text:{
                type:String,
                required:true
            }
},{timestamps:true})

const note = mongoose.model('note',NoteSchema)

module.exports = note;