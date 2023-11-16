//modules from node
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config()//to process env file

// app.use((req, res, next) => {
//     //console.log('Request Headers:', req.headers);
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     //console.log('Response Headers:', res.getHeaders());
//     next();
//   })
//necessaries
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:3001',
    credentials:true
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
  });
//models
const USER = require('./models/User');

//controller

const userController = require('./controllers/userController')

// routes
app.get('/',(req,res)=>{
    res.send('hello there');
})
app.post('/signup',userController);


app.get('/all-post',(req,res)=>{
    USER.deleteMany({})
    .then(result => res.send('succeed'))
    .catch(err => console.log(err))
})

mongoose.connect(process.env.MONGO_DB_URI)
.then(result => app.listen(process.env.port || 3000 , ()=> console.log("connected to db...")))
.catch(err => console.log(err))