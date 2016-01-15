var express = require('express');
var router = express.Router();
var dbService = null;

router.get('/exists/:email', function(req, res, next) {
    var email = req.params.email;
    if (!email) {
        return res.send({error: 'Please provide your email address.'});
    }
    dbService.emailExists(decodeURIComponent(email), function(err, result) {
        if (err) {
            return res.send({error: err});
        }
        return res.send({exists: result});
    });
});

module.exports = function(databaseService) {
    dbService = databaseService;
    return router;
};
