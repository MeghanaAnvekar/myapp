var express  = require('express');
var router = express.Router();
router.get('/events',function(req,res,next){
  res.send('EVENTS API');
});

module.exports = router;
