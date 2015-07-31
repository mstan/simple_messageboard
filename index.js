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
  var sortKey = req.body.sortKey;


  //This sorting function does not work.
  //List can be ordered if passed as ORDER BY x where x is a static name and not a variable, this works. If x is ? and a variable is passed, it will not sort.
  //Consider building a switch case scenario for each sort-by.
  db.all('SELECT * FROM posts ORDER BY ?', sortKey, function (err, rows) {
  	console.log(rows);
  	console.log(rows[0].id);

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