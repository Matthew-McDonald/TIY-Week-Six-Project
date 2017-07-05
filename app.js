const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const path = require('path');
const mustacheExpress = require('mustache-express');
const models = require("./models");

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



//HOME GETS AND POSTS***************************************

app.get('/', function(req, res) {
  if (req.session && req.session.authenticated) {
    var user = models.logintable.findOne({
      where: {
        username: req.session.username,
        // include: displayname
      }
    }).then(function(currentUser) {
      models.messagetable.findAll({

        include: [
          {
            model: models.logintable,
            as: 'login'
          }
        ]

      }).then(function(textcontent, login, displayname){ res.render('home', {messages: textcontent, user: currentUser, login: displayname})
      })

    })
  } else {
    res.redirect('/login')
  }
})

app.post('/', function(req, res) {
  // let username = req.body.username;
  // let password = req.body.password;
  //
  // models.logintable.findOne({
  //   where: {
  //     username: username
  //   }
  // }).then(user => {
  //   if (user.password == password) {
  //     req.session.username = username;
  //     req.session.authenticated = true;
  //     res.redirect('/');
  //   } else {
  //     res.redirect('/login');
  //   }
  // })
  const message = models.messagetable.build({
    textcontent: req.body.message,
    userid: req.session.userid
  })
  message.save().then(function(message) {
    res.redirect('/')
  });

})

//LOGIN GETS AND POSTS****************************************

app.get('/login', function(req, res) {
  res.render('welcome2gabble')
})
app.post('/login', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  models.logintable.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (user.password == password) {
      req.session.username = username;
      req.session.authenticated = true;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  })
})


//LOGOUT GETS AND POSTS *************************************

app.get('/logout', function(req, res) {
  console.log("user session destroyed");
  req.session.destroy();
  res.redirect('/')
})

//SIGNUP GETS AND POSTS*************************************

app.get('/signup', function(req, res) {
  res.render('signup');
})

app.post('/signup', function(req, res) {
  const user = models.logintable.build({
    name: req.body.displayname,
    username: req.body.username,
    password: req.body.password
  })

  user.save().then(function(user) {
    req.session.username = user.username;
    req.session.authenticated = true;
    res.redirect('/')
  })
})

//APP LISTEN **********************************************

app.listen(3000, function () {
  console.log('Hey! No mistakes!');
});


//Create session for logins
//Create authentication for checking the database for users data
//create homepage for if you visit '/' it recognizes you are logged in and redirects you to homepage, if not logged in, redirects you to log in page
//create database for comments/likes
//a user can have many comments and many likes but each like and comment can only have 1 user. Change relations between tables in models
//Create form on homepage that submits comments and pushes them to the comments database
//create a way to track likes
