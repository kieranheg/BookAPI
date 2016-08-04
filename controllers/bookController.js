var bookController = function (Book) {

  var post = function (req, res) {
    var book = new Book(req.body);

    if (!book.title) {
      res.status(400);
      res.send('Title is required');
    }
    else {
      book.save();
      res.status(201);
      res.send(book);
    }
  };

  var get = function (req, res) {
    var query = applyQueryFilter(req.query);
    Book.find(query, function (err, books) {
      if (err)
        res.status(500).send(err);
      else
        res.json(books);
    });
  };

  return {
    post: post,
    get: get
  }
};

function applyQueryFilter(queryParam) {
  var query = {};
  if (queryParam.genre) {
    query.genre = queryParam.genre;
  }
  return query;
}

module.exports = bookController;
