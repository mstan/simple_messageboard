//packages and dependencies
var express = require('express');
var ejs = require('ejs');
var sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');

//initialize express
var app = express();

//Set view engine
app.set('view engine', 'ejs');

//Let's body parse our document
app.use(bodyParser.urlencoded({extended: false}));

//dir loading
app.use(express.static(__dirname + '/views'));

//setup my db
var dbFile = './db/db.sqlite';
var db = new sqlite3.Database(dbFile);

//Routes
  //Index
app.get('/', function (req,res) {
  res.render('index.ejs');
});


  //Render a single post by ID
app.all('/post', function (req,res) {
  var id = req.query.id;

  db.get('SELECT * FROM posts WHERE id = ?', id , function (err, row) {
    var post = row;
    //post.creator = author
    //post.content = body
    //post.id = ID
    //post.created = date post made
    //post.updated = last modification on

    res.render('post', {post: post})
  });
});


 //Render all posts stored in the database
app.all('/all', function (req,res) {
	//Arbitrary input sort parameters in
  var sortKey = req.body.sortKey;
  var sortDirection = req.body.sortDirection;

  //SQLite3 cannot take a direct input function of 'ORDER BY ?' where ? is input value. Must build the string before passing.
  var funcIn = 'SELECT * FROM posts ORDER BY ' + sortKey + " " + sortDirection;


  //Default case, sort by ID
  db.all(funcIn, function (err, rows) {

    var posts = rows;
    res.render('all', {posts: posts})
  });
});

  //View page to submit new posts to db
app.get('/new', function (req,res) {
	res.render('new', {msg: null});
});


  //accept data and post it to db
app.post('/new', function (req,res) {
  var creator = req.body.author;
  var content = req.body.content;
  var created = new Date().getTime() / 1000 >> 0; //in ms. convert to s. bit shift to drop float val.

  var dbIn = [creator, created, created, content];

  db.run('INSERT INTO posts (creator,created,updated,content) VALUES(?,?,?,?) ', dbIn, function (err) {
    console.log(err);

    var msg = "Success!"; //later change to output depending on status

    res.render('new', {msg: msg});


  });
});


//listen on port
app.listen(3000);