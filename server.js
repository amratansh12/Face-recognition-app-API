const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./containers/signin.js');
const register = require('./containers/register.js');
const image = require('./containers/image.js');
const profile = require('./containers/profile.js');

const db = knex({
    client: 'postgresql',
    connection: {
        host : '127.0.0.1',
        port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    db.select('*').from('users')
    .then(response=>{
        res.json('Server working on port 3000');
    }).catch(err => res.status(400).json('Error'))
})

app.post('/signin', (req,res) => {signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req,res)=> {profile.handleProfile(req, res, db)})

app.put('/image', (req,res)=> {image.handleImage(req, res, db)})

app.listen('3000', ()=>{
    console.log('app is running on port 3000');
})