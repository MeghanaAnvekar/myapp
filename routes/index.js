var express  = require('express');
var router = express.Router();
var mydb = require('../db');
router.get('/',function(req,res,next){
  res.render('index.html');
});

router.post('/register',function(req,res){
  var username = req.body.username;
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  var user = new mydb.User();
  user.username = username;
  user.name = name;
  user.password = password;
  user.email = email;

  mydb.User.findOne({username:user.username},function(err,user){
    if(err)
    {
      console.log(err);
      return res.status(500).send();
    }
    if (!user)
    {
      user.save(function(err,savedUser){
        if(err)
          {
            console.log(err);
            return res.status(500).send();
          }
          return res.json(savedUser);
      });
    }
  });
});

router.post('/login',function(req,res){
  var username = req.body.username;
  var password = req.body.password;

  mydb.User.findOne({username:username,password:password},function(err,user){
    if(err)
    {
      console.log(err);
      return res.status(500).send();
    }
    if (!user)
    {
      return res.status(404).send();
    }

    return res.status(200).send();

  });
});
module.exports = router;
