var express  = require('express');
var router = express.Router();
var mydb = require('../db');
router.get('/',function(req,res,next){
  mydb.User.find({},function(err,user){
    if(err)
    {
      console.log(err);
      return res.status(500).json();
    }
    res.json(user);
  });

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
console.log('in register api.............');

/*  mydb.User.findOne({username:user.username},function(err,user){
    if(err)
    {
      console.log(err);
      return res.status(500).json();
    }
    if (!user)
    {*/
      user.save(function(err,savedUser){
        if(err)
          {
            console.log(err);
            return res.status(500).send();
          }
          console.log(savedUser);
          return res.status(200).send();
      //});
         }
       );
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
      return res.json({username:'nobody',password:'nobody',name:'nobody',email:'nobody'});
    }

    return res.status(200).send();

  });
});
module.exports = router;
