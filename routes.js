const express = require("express");
const models = require("./models");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//HOME GET***************************************

router.get("/", function(req, res) {
  if (req.session && req.session.authenticated) {
    var user = models.logintable
      .findOne({
        where: {
          username: req.session.username
        }
      })
      .then(function(currentUser) {
        models.messagetable
          .findAll({
            include: [
              {
                model: models.logintable,
                as: "login"
              }
            ]
          })
          .then(function(textcontent, login, displayname) {
            res.render("home", {
              messages: textcontent,
              user: currentUser,
              login: user.displayname
            });
          });
      });
  } else {
    res.redirect("/login");
  }
});

//HOME POST********************************************

router.post("/", function(req, res) {
  models.logintable
    .findOne({
      where: {
        username: req.session.username
      }
    })
    .then(function(user) {
      const message = models.messagetable.build({
        textcontent: req.body.message,
        userid: user.id
      });
      message.save();
      res.redirect("/");
    });
});

//LOGIN GET****************************************

router.get("/login", function(req, res) {
  res.render("Welcome2Gabble");
});

//LOGIN POST****************************************

router.post("/login", function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let displayname = req.body.displayname;
  models.logintable
    .findOne({
      where: {
        username: username
      }
    })
    .then(user => {
      if (user.password == password) {
        req.session.username = username;
        req.session.displayname = displayname;
        req.session.authenticated = true;
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    });
});

//LOGOUT GET *************************************

router.get("/logout", function(req, res) {
  console.log("user session destroyed");
  req.session.destroy();
  res.redirect("/");
});

//SIGNUP GET*************************************

router.get("/signup", function(req, res) {
  res.render("signup");
});

//SIGNUP POST***************************************

router.post("/signup", function(req, res) {
  const user = models.logintable.build({
    displayname: req.body.displayname,
    username: req.body.username,
    password: req.body.password
  });

  user.save().then(function(user) {
    req.session.username = user.username;
    req.session.authenticated = true;
    res.redirect("/");
  });
});

//DELETE POST**********************************

router.post("/delete", function(req, res) {
  //if the req.session.username = current user, then allow delete.
  console.log("deleting");
  console.log(req.body);
  console.log(req.body.deletebuttonid);
  models.messagetable
    .destroy({
      where: {
        id: req.body.deletebuttonid
      }
    })
    .then(function(postnow) {
      res.redirect("/");
    });
});

//LIKE POST ***********************************

router.post("/like", function(req, res) {
    models.liketable.findAll({
      include: [
        {
          model: models.liketable,
          as: 'likes',
            include: [
                {
                  model: models.logintable,
                  as: 'likesLogin'
                }
              ]
        }
      ]
    }).then(function(messagetable) {
    for (i = 0; i < messagetable.length; i++) {
        if (messagetable[i].userId === req.session.user.id) {
          messagetable[i].postedByMe = true;
        }
        let likers = "";
        for (j = 0; j < messagetable[i].likes.length; j++) {
            likers += messagetable[i].likes[j].user.first_name + " " + messagetable[i].likes[j].user.last_name + "<br />";
            if (messagetable[i].likes[j].userId === req.session.user.id) {
              messagetable[i].likedByMe = true;
            }
        }
        messagetable[i].likers = likers;
    }
    res.render('home', {
      userData: req.session.user,
      feed: messagetable
    })
  })
});

module.exports = router;
