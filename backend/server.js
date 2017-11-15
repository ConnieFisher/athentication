
const bodyParser = require ('body-parser');
const cors = require('cors');
const path = 3000;
preflight = require('preflight');
const mongoose = require('mongoose');
const express = require ('express');
const app = express();
const config = require('./config/database')

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

app.listen(path);