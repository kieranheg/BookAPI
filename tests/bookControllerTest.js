var should = require('should');
var sinon = require('sinon');

describe('Book Controller tests:', function () {
  describe('Post', function () {
    it('should not allow an empty book title on post', function () {
      var Book = function (book) {
        this.save = function () {
          console.log('Saving mock book');
        };
      };
      var req = {
        body: {
          author: 'Kieran'
        }
      };
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var bookController = require('../controllers/bookController')(Book);
      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
