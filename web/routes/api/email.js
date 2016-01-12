var express = require('express');
var router = express.Router();
var dbService = null;

router.get('/exists', function(req, res, next) {
    if (!req.body.email) {
        return res.send({error: 'Please provide your email address.'});
    }
    // TODO .... Look up the uuid and password WHERE email = email
    return res.send({exists: false});
});

module.exports = function(databaseService) {
    dbService = databaseService;
    return router;
};
