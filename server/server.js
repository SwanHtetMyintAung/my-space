const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const USER = require('./models/User')
require('dotenv').config()//to process env file

//necessaries
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json())
//controller

const userController = require('./controllers/userController')

app.get('/',(req,res)=>{
    res.send('hello there');
})
app.post('/signup',userController);
app.get('/signup',(req,res)=>{
    res.send('it workss')
});
app.get('/all-post',(req,res)=>{
    USER.deleteMany({})
    .then(result => res.send('succeed'))
    .catch(err => console.log(err))
})

mongoose.connect(process.env.MONGO_DB_URI)
.then(result => app.listen(process.env.port || 3000 , ()=> console.log("connected to db...")))
.catch(err => console.log(err))