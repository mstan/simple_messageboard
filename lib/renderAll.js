module.exports = function (req,res) {
	//Arbitrary input sort parameters in
  var sortKey = req.body.sortKey || 'id'; //For when page is accessed via GET, this is undefined. If undefined, default to id
  var sortDirection = req.body.sortDirection || 'ASC';; //For whne page is accessed via GET, this is undefined. If undefined, default to asc.


  //SQLite3 cannot take a direct input function of 'ORDER BY ?' where ? is input value. Must build the string before passing.
  var funcIn = 'SELECT * FROM posts ORDER BY ' + sortKey + ' ' + sortDirection;

  //Default case, sort by ID
  req.db.all(funcIn, function (err, rows) {

    var posts = rows;
    res.render('all', {posts: posts})
  });
};