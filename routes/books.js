var express = require('express');
var router = express.Router();
var Book = require('../models/bookModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  Book.find(function(err, books) {
    if(err)
      console.log(err);
    else
      res.json(books);
  });
});

module.exports = router;
