const USER = require('../models/User');
const jwt = require('jsonwebtoken');
const createToken = require('./createToken')
require('dotenv').config();

//turn the max age into integer from .env;
const MAX_AGE =  parseInt(process.env.MAX_AGE);

async function signUp(req,res){
    const data = req.body;

    //format the data from user
    const userData = {
        name : data.name ,
        email: data.email ,
        password: data.password 
    }
    try{
        //try to add new USER document
        const addNewUser = new USER(userData);
        const newUser = await addNewUser.save();//save it
        //if saving succeed
        if(newUser){
            //create the json token by calling module from outside
            const token = createToken(newUser._id , MAX_AGE * 24);
            //assign the cookies accordingly
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
    const email = data.email;//destruct the data 
    const password = data.password;
    try{
        //try to use the login middleware from USER document
        const newUser = await USER.login(email , password);
        //if we succeed
        if(newUser){
            //same as sign up , create a new JWT token 
            const token = createToken(newUser._id , MAX_AGE * 24);
            //and save the cookies
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

function logout(req,res){
    
    try{
        //delete the function by calling the function
        const result = deleteCookies(res);
        //if succeed send this message
        if(result){
            res.status(200).json({message : "log out successfully!"})
        }else{ 
            //send "bad request" if we failed
            res.status(400).json({message : "Bad Request"})
        }
    }catch(error){
        res.status(500).json({message : "Internal Server"})
    }
}
//clear the value of cookies and set their max_age to 1 mili-second
function deleteCookies(res){
    try{
        res.cookie('user',"",{maxAge:1});
        res.cookie("JWT","",{maxAge:1});
        return true;
    }catch(error){
        return false;
    }
    
}
module.exports = {
    signUp , login , logout
}