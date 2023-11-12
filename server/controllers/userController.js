const USER = require('../models/User');

function signUp(req,res){
    const data = req.body;
    // console.log(data)
    const newUser = new USER({
        name : data.name ,
        email:data.email ,
        password:data.password 
    })
    newUser.save()
    .then(result => res.redirect('/'))
    .catch(err => console.log(err))
}
module.exports = signUp