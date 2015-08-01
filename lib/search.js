module.exports = function (req,res) {
  var sortKey = req.body.sortKey;
  var query = req.body.query;

  var paramsIn = 'SELECT * FROM posts WHERE ' + sortKey + ' = ' + "'" +  query + "'";

  req.db.all(paramsIn, function (err, rows) {

    res.render('search', {posts: rows});
  });
};