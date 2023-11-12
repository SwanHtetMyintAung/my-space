const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        min:4,
        max:20
    },
    email:{
        type:String,
        unique:true,
        required:true,
        min:7,
        max:320
    },
    password:{
        type:String,
        required:true,
        min:8,
    }

},{timestamps:true})

UserSchema.pre('save',async function(next){
    if (!this.isModified('password')) {
        return next();
      }
    try{
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password , salt);
        next();
    }catch(err){
        return next(err);
    }
})

const user = mongoose.model('user',UserSchema)

module.exports = user;