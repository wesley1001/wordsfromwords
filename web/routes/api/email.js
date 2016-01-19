var express      = require('express'),
    router       = express.Router(),
    dbService    = null,
    uuid         = require('node-uuid'),
    emailService = require('email-service');

router.get('/exists/:email', function(req, res, next) {
    var email = req.params.email;
    if (!email) {
        return res.send({error: 'Please provide your email address.'});
    }
    dbService.getUuidAndPassword(decodeURIComponent(email), function(err, result) {
        if (err) {
            return res.send({error: err});
        }
        return res.send({exists: result.uuid && result.password});
    });
});

router.post('/create', function(req, res) {
    var email = req.body.email;
    if (!email) {
        return res.send({error: 'Please provide your email address.'});
    }
    dbService.getUuidAndPassword(email, function(err, result) {
        if (err) {
            return res.send({error: err});
        }
        if (result.uuid !== null && result.password !== null) {
            return res.status(400).send('Bad Request');
        }
        var rawCode = '';
        var pool = '0123456789';
        for (var i = 0; i < 12; i++) {
            rawCode += pool.charAt(Math.floor(Math.random() * pool.length));
        }
        if (result.uuid === null) {
            var newUuid = uuid.v4();
            dbService.createEmailUser(newUuid, email, rawCode, function(createErr) {
                if (createErr) {
                    return res.send({error: createErr});
                }
                emailService.sendVerifyCode(email, rawCode);
                return res.send({uuid: newUuid});
            });
        } else {
            // TODO and WYLO 2 .... UPDATE verify_code and verify_code_exp WHERE email = email, then email the verify code using emailService.emailVerifyCode()
        }
    });
});

module.exports = function(databaseService) {
    dbService = databaseService;
    return router;
};
