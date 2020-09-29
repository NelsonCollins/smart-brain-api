const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : 'process.env.DATABASE_URL',
    ssl: true,
  }
});

db.select('*').from('users').then(data =>{
	console.log(data);
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{res.send('It is working')})
app.post('/signin', (req, res)=>{signin.handleSignin(req, res, db, bcrypt)})

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})


app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})

app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=>{image.handleApicall(req, res)})
	



// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(process.env.PORT ||3000, () =>{
	console.log(`App is running on port 3000 ${process.env.PORT}`);
})














/*
Root route : res with This is working 
Signing - POST req: respond with either success/fail
Register: POST req: Add data to database i.e new user object
Home: GET req:Profile: optional params of user_idto access the proifle of the user such that each user will have thier own screen. 
Therefore we need a get request
We want to keep score of the user activity:  user and image post which is a PUT since
the user exist

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST =user
/profile/:userid --> GET =user
/image = PUT --> user
*/