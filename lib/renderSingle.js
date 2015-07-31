module.exports = function (req,res) {
  var id = req.query.id;

  db.get('SELECT * FROM posts WHERE id = ?', id , function (err, row) {
    var post = row;

    res.render('post', {post: post})
  });
};