module.exports = function (req,res) {
  var creator = req.body.author;
  var content = req.body.content;
  var subject = req.body.subject;
  var msg = null;
  var created = new Date().getTime() / 1000 >> 0; //in ms. convert to s. bit shift to drop float val.

  var dbIn = [creator, created, created, content, subject];

  req.db.run('INSERT INTO posts (creator,created,updated,content,subject) VALUES(?,?,?,?,?) ', dbIn, function (err) {
    console.log(err);

    msg = "Success!"; //later change to output depending on status

    res.render('new', {msg: msg});


  });
};
