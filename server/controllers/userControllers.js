const USER = require('../models/User');
const jwt = require('jsonwebtoken');
const createToken = require('./createToken')
require('dotenv').config();

const MAX_AGE =  parseInt(process.env.MAX_AGE);

async function signUp(req,res){
    const data = req.body;
    const userData = {
        name : data.name ,
        email: data.email ,
        password: data.password 
    }
    try{
        const addNewUser = new USER(userData);
        const newUser = await addNewUser.save();
        if(newUser){
            const token = createToken(newUser._id , MAX_AGE * 24);
            res.cookie('user' , newUser._id , { maxAge : MAX_AGE * 60 * 24} );
            res.cookie('JWT' , token , { httpOnly : true , maxAge : MAX_AGE * 60 * 24 })
            res.json({message : newUser})
        }else{
            throw Error("couldn't add User");
        }
    }catch(error){
        throw Error(error);
    }
}

async function login(req,res){
    const data = req.body;
    const email = data.email;
    const password = data.password;
    try{
        const newUser = await USER.login(email , password)
        if(newUser){
            const token = createToken(newUser._id , MAX_AGE * 24);
            res.cookie('user' , newUser._id , { maxAge : MAX_AGE * 60 * 24} );
            res.cookie('JWT' , token , { httpOnly : true , maxAge : MAX_AGE * 60 * 24 })
            res.json({message : newUser})
        }else{
            throw Error("Couldn't Find User");
        }
    }catch(error){
        throw Error(error);
    }
}
module.exports = {
    signUp , login
}