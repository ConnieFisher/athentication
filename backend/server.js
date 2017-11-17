const express = require ('express');
const cors = require('cors');
port =(3000);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./models/Users');
const preflight = require('preflight');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');


mongoose.Promise = Promise;

var app = express();


//connection to mongoose
const config = require('./config/database');
mongoose.connect(config.database,{ useMongoClient: true }, (err) =>{
    if(!err){
        console.log('connected to mongo');
    }else{
        console.log('error in connecting' + err);
    }

});

let posts = [
    {message: 'hello'},
    {message: 'hi'},
]

//preflight for cors()
//app.options('*', cors());
//cors middleware
app.use(cors());
app.use(preflight());
//bodyparser middleware
//app.use(bodyParser.text());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//routing
app.get('/posts', cors(), (req, res) => {
    res.send(posts);
})

//routing
app.get('/users', cors(), async(req, res) => {

        const users = await User.find({}, '-pwd -__v')
        res.send(users);
   
        console.error(error);
        res.sendStatus(500).send('Internal Error')
    });
 


//routing
app.get('/profile/:id', cors(), async(req, res) => {
    try {
        var user = await User.findById(req.params.id, '-pwd -__v');
        res.send(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(500).send('Internal Error');
    }
 
})
app.post('/post', (req,res) => {
    var postData = req.body
    postData.author = '59a365c26da2112b202b002e'

    var post = new Post(postData)

    post.save((err, result) => {
        if (err) {
            console.error('saving post error')
            return res.status(500).send({message: 'saving post error'})
        }

        res.sendStatus(200)
    })
})

app.post('/register',cors(), (req, res) => {
    var userData = req.body

    var user = new User(userData)

    user.save((err, result) => {
        if (err)
            console.log('saving user error')

        res.sendStatus(200)
    })
});
    
    
    
app.post('/login', cors(), async (req, res) =>{
    const loginData = req.body;

    const user = await User.findOne({email: loginData.email});

    bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) =>{
        if(!isMatch) 
        return res.status(401).send({message: 'Email or Password invalid'});

        const payload = {};
        const token = jwt.encode(payload, config.secret);
        res.status(200).send({token});
    });
})

    

//Set Static Files
//app.use(express.static(path.join(__dirname,'public')));


//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});