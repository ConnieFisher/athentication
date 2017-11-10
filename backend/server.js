
const bodyParser = require ('body-parser');
const cors = require('cors');
const path = 3000;
preflight = require('preflight');
const mongoose = require('mongoose');
const express = require ('express');
const app = express();

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