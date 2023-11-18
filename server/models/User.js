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
    },
    tasks:{
        type:Array,
        default:[]
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
UserSchema.statics.findUser = async function(id){
    const userId = id
    if(!mongoose.Types.ObjectId.isValid(userId)) return;
    try{
        const user = await this.findOne({userId});
        if(!user) throw Error('User Not Found');
        return user;
    }catch{
        throw Error('Not working')
    }
}

const user = mongoose.model('user',UserSchema)

module.exports = user;