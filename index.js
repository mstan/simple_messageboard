//packages and dependencies
var express = require('express');
var ejs = require('ejs');
var sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');

//personal lib deps
var newPostPOST = require('./lib/newPostPOST.js'); //My written function to handle new, incoming posts
var newPostGET = require('./lib/newPostGET.js');
var renderAll = require('./lib/renderAll.js'); //My written function to handle new, incoming posts
var renderIndex = require('./lib/index.js');
var renderSingle = require('./lib/renderSingle.js');

//initialize express
var app = express();

//set view engine
app.set('view engine', 'ejs');

//dir loading
app.use(express.static(__dirname + '/views'));

//setup my db
var dbFile = './db/db.sqlite';
var db = new sqlite3.Database(dbFile);

//middleware
  //let's bind database to request so any external references can find it.
app.use(function (req,res,next) {
  req.db = db; //bind it to request for all to use

  next(); //this is middleware, so let's keep going!
});

app.use(bodyParser.urlencoded({extended: false})); //Body parser middleware setting

//Routes
  //GET Index
app.get('/', renderIndex);

  //Render a single post by ID
app.all('/post', renderSingle);

  //Render all posts stored in the database
app.all('/all', renderAll);

  //View page to submit new posts to db
app.get('/new', newPostGET);

  //Accept new post and pass it to database
app.post('/new', newPostPOST);


//listen on port
app.listen(3000);