const USER = require('../models/User');
const jwt = require('jsonwebtoken');
const createToken = require('./createToken')
require('dotenv').config();

const MAX_AGE =  parseInt(process.env.MAX_AGE);

function signUp(req,res){
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //console.log(res.getHeaders())
    const data = req.body;
    // console.log(data)
    const newUser = new USER({
        name : data.name ,
        email:data.email ,
        password:data.password 
    })
    newUser.save()
    .then(result => {
        const token = createToken(result._id , MAX_AGE * 24);
        res.cookie('user', result._id ,
        {
            maxAge : MAX_AGE *24
        }
        )
        res.cookie('JWT' , token , { 
            httpOnly : true ,
            maxAge : MAX_AGE * 24,
        })
        res.json({message : MAX_AGE})
    })
    .catch(err => console.log(err));

}
module.exports = signUp