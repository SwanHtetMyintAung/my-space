const jwt = require('jsonwebtoken');
require('dotenv').config();
//jwt sign function to create a toke for user , read their documents for details 
function createToken(id , maxAge){
    return jwt.sign({id}, process.env.SECRET_KEY , {
        expiresIn : maxAge
    })
}
module.exports = createToken;