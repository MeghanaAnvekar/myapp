var express  = require('express');
var router = express.Router();
var mydb = require('../db');
var mongoose = require('mongoose');

//get all tasks
router.get('/tasks',function(req,res,next){
  mydb.Task.find(function(err,tasks){
    if(err)
    {
      res.send(err);
    }
    res.json(tasks);
  });

});

//get one tasks
router.get('/task:id',function(req,res,next){
  mydb.Task.findOne({_id:mongoose.Types.ObjectId(req.params.id)},function(err,task){
    if(err)
    {
      res.send(err);
    }
    res.json(task);
  });

});

//save a task
router.post('/task',function(req,res,next){
  var task = req.body;

  console.log('in router post');
  if(!task.title || !(task.isDone +''))
  {
    res.status(400);
    res.json({
      "error":"Bad Data"
    });
  }
  else {
  var  data = new mydb.Task(task);
    data.save(function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
  }
});

//delete a task
router.delete('/task:id',function(req,res,next){
  mydb.Task.remove({_id:mongoose.Types.ObjectId(req.params.id)},function(err,task){
    if(err)
    {
      res.send(err);
    }
    res.json(task);
  });

});

//update a task

router.put('/task:id',function(req,res,next){

var task = req.body;
var updTask = {};
if(task.isDone){
  updTask.isDone = task.isDone;
}
if(task.title)
{
  updTask.title = task.title;
}
if(task.date)
{
updTask.date = task.date;
}


if(!task.title)
{
  res.status(400);
  res.json({
    "error":"Bad Data"
  });
}
else {
  mydb.Task.update({_id:mongoose.Types.ObjectId(req.params.id)},updTask,{},function(err,task){
    if(err)
    {
      res.send(err);
    }
    res.json(task);
  });
}



});
module.exports = router;
