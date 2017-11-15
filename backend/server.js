const bodyParser = require ('body-parser');
const cors = require('cors');
const path = 3000;
preflight = require('preflight');
const mongoose = require('mongoose');
const express = require ('express');
const app = express();
const config = require('./config/database');
const User = require('./models/Users');
const jwt = require('jwt-simple');

mongoose.Promise = Promise;

//Connect to Database
mongoose.connect(config.database, { useMongoClient: true });

//On Connection
mongoose.connection.on('connected', () => {
  console.log('connected to database ' +config.database);
});

//on error
mongoose.connection.on('error', (err) => {
  console.log('error to database ' +err);
});

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

app.options('*', cors());
//app.use(cors());


const posts = [
    {message: 'hello'},
    {message: 'hi'},
];

app.use(cors());

app.get('/posts', cors(), (req,res) => {
    res.send(posts);
});

app.get('/users', async(req,res) => {
    const users = await User.find({}, '-pwd');
    res.send(users);
});

app.post('/register', cors(), (req,res) => {
    const userData = req.body;

    const user = new User(userData);
    // console.log(userData.email);

    user.save((err, result)=>{
        if(err) console.log('saving error');
        res.sendStatus(200);
    });
    
});

app.post('/login', cors(), async(req,res) => {
    const userData = req.body;
    const user = await User.findOne({email: userData.email});
    if(!user)return res.status(401).send({message: 'Email or Password invalid'});

    if(userData.pwd !== user.pwd) return res.status(401).send({message: 'Email or Password Do not match'});

    let payload = {};

    let token = jwt.encode(payload, config.secret);

    console.log(token);
    res.status(200).send({token});
    
});

app.listen(path);