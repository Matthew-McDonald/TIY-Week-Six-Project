const express = require('express');
const models = require("./models");
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//HOME GETS AND POSTS***************************************

router.get('/', function(req, res) {
  if (req.session && req.session.authenticated) {
    var user = models.logintable.findOne({
      where: {
        username: req.session.username,
      }
    }).then(function(currentUser) {
      models.messagetable.findAll({

        include: [
          {
            model: models.logintable,
            as: 'login'
          }
        ]

      }).then(function(textcontent, login, displayname){ res.render('home', {messages: textcontent, user: currentUser, login: user.displayname})
      })
    })
  } else {
    res.redirect('/login')
  }
})

router.post('/', function(req, res) {
models.logintable.findOne({
  where: {
    username: req.session.username
    }
}).then(function(user) {
  const message = models.messagetable.build({
    textcontent: req.body.message,
    userid: user.id
  })
    message.save()
    res.redirect('/')

  })
})

//LOGIN GETS AND POSTS****************************************

router.get('/login', function(req, res) {
  res.render('welcome2gabble')
})
router.post('/login', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let displayname = req.body.displayname;
  models.logintable.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (user.password == password) {
      req.session.username = username;
      req.session.displayname = displayname;
      req.session.authenticated = true;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  })
})

//LOGOUT GETS AND POSTS *************************************

router.get('/logout', function(req, res) {
  console.log("user session destroyed");
  req.session.destroy();
  res.redirect('/')
})

//SIGNUP GETS AND POSTS*************************************

router.get('/signup', function(req, res) {
  res.render('signup');
})

router.post('/signup', function(req, res) {
  const user = models.logintable.build({
    displayname: req.body.displayname,
    username: req.body.username,
    password: req.body.password
  })

  user.save().then(function(user) {
    req.session.username = user.username;
    req.session.authenticated = true;
    res.redirect('/')
  })
})

//DELETE POST**********************************

router.post('/delete', function (req, res){

  //if the req.session.username = current user, then allow delete.
    console.log('deleting');
    console.log(req.body);
    console.log(req.body.deletebuttonid);
    models.messagetable.destroy({
        where: {
            id: req.body.deletebuttonid
        }
    }).then(function(postnow){
        res.redirect('/');
    })
})

//LIKE POST ***********************************

router.post('/like', function (req, res) {
  // models.logintable.findOne({
  //   where: {
  //     username: req.session.username
  //     }
  // }).then(function(user) {
  //   let newLike = models.liketable.build({
  //     userid : user.id,
  //     postid : req.body.likebutton
  //   })
  //   newLike.save();
  //   res.redirect('/');
  // })
  res.send('If you want to like something, go to Twitter.')
});


module.exports = router;
