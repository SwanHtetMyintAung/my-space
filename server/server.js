//modules from node
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config()//to process env file

//models
const USER = require('./models/User');
const TASK = require('./models/Task');
const NOTE = require('./models/Note');

//controller

const userControllers = require('./controllers/userControllers')
const uploadControllers = require('./controllers/uploadControllers');
const getControllers = require('./controllers/getController');
const idControllers = require('./controllers/idControllers');

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



// routes
app.get('/',(req,res)=>{
    res.send('hello there');
})
app.get('/task',getControllers.getTasks)
app.get('/profile',getControllers.getProfile)
app.get('/note',getControllers.getNotes)

app.post('/signup',userControllers.signUp);
app.post('/login' , userControllers.login)
app.post('/task',uploadControllers.uploadNewTask)
app.post('/task/:id',idControllers.checkTask)
app.post('/note',uploadControllers.uploadNewNote)

app.delete('/task/:id',idControllers.deleteOneTask)
app.delete('/logout',userControllers.logout)


mongoose.connect(process.env.MONGO_DB_URI)
.then(result => app.listen(process.env.port || 3000 , ()=> console.log("connected to db...")))
.catch(err => console.log(err))