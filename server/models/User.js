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
UserSchema.statics.login = async function(email , password){
    try{
        const user = await this.findOne({email : email})
        if(user){
            const isValidPassword = await bcrypt.compare(password , user.password)
            if(isValidPassword){
                return user
            }else{
                throw Error('wrong Password')
            }
        }else{
            throw Error("Can't find User")
        }
    }catch(error){
        console.log(error)
    }
}

const user = mongoose.model('user',UserSchema)

module.exports = user;