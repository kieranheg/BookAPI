var express = require('express');
var router = express.Router();
var Book = require('../models/bookModel');

/* GET home page. */
router
  .post('/', function (req, res) {
    var book = new Book(req.body);
    book.save();
    res.status(201).send(book);
  })
  .get('/', function (req, res) {
    var query = applyQueryFilter(req.query);
    Book.find(query, function (err, books) {
      if (err)
        res.status(500).send(err);
      else
        res.json(books);
    });
  });

router.use('/:bookId', function (req, res, next) {
  Book.findById(req.params.bookId, function (err, book) {
    if (err)
      res.status(500).send(err);
    else if (book) {
      req.book = book;
      next();
    }
    else {
      res.status(404).send('No book found!');
      ;
    }
  });
});

router
  .get('/:bookId', function (req, res) {
    res.json(req.book);
  })
  .put('/:bookId', function (req, res) {
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.genre = req.body.genre;
    req.book.read = req.body.read;
    req.book.save(function (err) {
      if (err)
        res.status(500).send(err);
      else
        res.json(req.book);
    });
  })
  .patch('/:bookId', function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    for (var p in req.body) {
      req.book[p] = req.body[p];
    }
    req.book.save(function (err) {
      if (err)
        res.status(500).send(err);
      else
        res.json(req.book);
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
