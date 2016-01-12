var express = require('express');
var router = express.Router();
var dbService = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

module.exports = function(databaseService) {
    dbService = databaseService;
    return router;
};
