const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const path = require('path');
const mustacheExpress = require('mustache-express');
const models = require("./models");
const routes = require("./routes");

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static('./public'));;

//STARTING SESSIONS

app.use(session({
  secret: 'chocolate dog',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//'extended: false' parses strings and arrays.
//'extended: true' parses nested objects

app.use(expressValidator());
app.use(routes);




app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



//New list------------------
//Add associations for likes
//Add like function




//Create session for logins
//Create authentication for checking the database for users data
//create homepage for if you visit '/' it recognizes you are logged in and redirects you to homepage, if not logged in, redirects you to log in page
//create database for comments/likes
//a user can have many comments and many likes but each like and comment can only have 1 user. Change relations between tables in models
//Create form on homepage that submits comments and pushes them to the comments database
//create a way to track likes
