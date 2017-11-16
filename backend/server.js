const bodyParser = require('body-parser');
const cors = require('cors');
const path = 3000;
preflight = require('preflight');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('./config/database');
const User = require('./models/Users');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');


mongoose.Promise = Promise;

//Connect to Database
mongoose.connect(config.database, {
    useMongoClient: true
});

//On Connection
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

//on error
mongoose.connection.on('error', (err) => {
    console.log('error to database ' + err);
});

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json 
app.use(bodyParser.json())

app.options('*', cors());
//app.use(cors());


const posts = [{
        message: 'hello'
    },
    {
        message: 'hi'
    },
];

app.use(cors());

app.get('/posts', cors(), (req, res) => {
    res.send(posts);
});

app.get('/users', async(req, res) => {
    try {
        const users = await User.find({}, '-pwd -__v');
        res.send(users);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);

    }
    const users = await User.find({}, '-pwd -__v');
    res.send(users);
});

app.get('/profile/:id', async(req, res) => {
    console.log(req.params.id);
    try {
        const user = await User.findById(req.params.id, '-pwd -__v');
        res.send(user);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);

    }
    const users = await User.find({}, '-pwd -__v');
    res.send(users);
});

app.post('/register', cors(), (req, res) => {
    const userData = req.body;

    const user = new User(userData);
    // console.log(userData.email);

    user.save((err, result) => {
        if (err) console.log('saving error');
        res.sendStatus(200);
    });

});

app.post('/login', cors(), async(req, res) => {
    const loginData = req.body;

    const user = await User.findOne({
        email: loginData.email
    });

    bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
        if (!isMatch)
            return res.status(401).send({
                message: 'Email or Password invalid'
            });

        const payload = {};
        const token = jwt.encode(payload, config.secret);
        res.status(200).send({
            token
        });
    });
})

app.listen(path);