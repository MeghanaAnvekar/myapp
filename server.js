var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 3000;
var app = express();

//view engine
app.set('views', path.join(__dirname,'/mytasklist/dist'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);


app.use(express.static(path.join(__dirname,'/mytasklist/dist')));

//body parser middle-ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/user',index);
app.use('/api', tasks);

app.use(function (req, res, next) {

// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', "*");

//"http://webresumeproject-bofcarbon1.c9users.io:8080");
//"http://webresumemaintproject-bofcarbon1.c9users.io:8080");

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Headers', 'application/json');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
});
app.listen(port, function(){
	console.log('Server started on port '+port);

});
