//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var userSchema = new mongoose.Schema({
  username: {type : String, unique : true},
  password :{ type: String},
  name : String,
  email : String
});

var User = mongoose.model('users',userSchema);

var taskSchema = new mongoose.Schema({
  username:{type : String},
  title : String,
  isDone : Boolean,
  date : Date
});

var Task = mongoose.model('tasks',taskSchema);

module.exports = {User, Task,db};
