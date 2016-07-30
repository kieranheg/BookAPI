var express = require('express');
var router = express.Router();
var Book = require('../models/bookModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = applyQueryFilter(req.query);
  Book.find(query, function(err, books) {
    if(err)
      res.status(err).send(err);
    else
      res.json(books);
  });
});

router.get('/Books/:bookId', function (req, res, next) {
  Book.findById(req.params.bookId, function(err, book) {
    if(err)
      res.status(err).send(err);
    else
      res.json(book);
  });
});

function applyQueryFilter(queryParam) {
  var query = {};
  if (queryParam.genre) {
    query.genre = queryParam.genre;
  }
  return query;
}

module.exports = router;
