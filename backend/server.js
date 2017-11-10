
const bodyParser = require ('body-parser');
const cors = require('cors');
const path = 3000;
preflight = require('preflight');
const mongoose = require('mongoose');
const express = require ('express');
const app = express();
const config = require('./config/database');
const User = require('./models/User');

mongoose.Promise = Promise;

app.options('*', cors());
//app.use(cors());

mongoose.connect(config.database, { useMongoClient: true });

mongoose.connection.on('connected', () => {
    console.log('connected to database ' +config.database);
  });
  
  //on error
  mongoose.connection.on('error', (err) => {
    console.log('error to database ' +err);
  });

const posts = [
    {message: 'hello'},
    {message: 'hi'},
];

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());


app.get('/posts', cors(), (req,res) => {
    res.send(posts);
});

app.post('/register', cors(), (req,res) => {
    const userData = req.body;
    const user = new User(userData)
    // console.log(userData.email);

    user.save((err, result) =>{
        if(err)
        console.log('connected to mongo')
    })
    res.sendStatus(200);
});


app.listen(path);