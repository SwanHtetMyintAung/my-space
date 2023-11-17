const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(id , maxAge){
    return jwt.sign({id}, process.env.SECRET_KEY , {
        expiresIn : maxAge
    })
}
module.exports = createToken;