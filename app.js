const express = require('express');
const mustacheExpress = require('mustache-express');
const models = require('./models');
const expressValidator = require('express-validator')
const bodyParser = require('body-parser');
const session = require('express-session')

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//'extended: false' parses strings and arrays.
//'extended: true' parses nested objects
app.use(expressValidator());


app.get('/', function(req, res) {
  res.render('welcome2gabble');
})

app.get('/signup', function(req, res){
  res.render('signup');
})

app.post('/signup', function(req, res) {
  const login = models.logintable.build({
    username:req.body.name,
    password:req.body.password,
    displayname:req.body.displayname,
  })
  console.log(login);
  login.save();
  res.redirect('/');
})

app.listen(3000, function () {
  console.log('Successfully started express application!');
});

//add displayname column in users(for display purposes)"Hello Matt".
//Create session for logins
//Create authentication for checking the database for users data
//create homepage for if you visit '/' it recognizes you are logged in and redirects you to homepage, if not logged in, redirects you to log in page
//create database for comments/likes
//a user can have many comments and many likes but each like and comment can only have 1 user. Change relations between tables in models
//Create form on homepage that submits comments and pushes them to the comments database
//create a way to track likes
