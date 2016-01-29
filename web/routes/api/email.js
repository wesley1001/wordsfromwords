var express      = require('express'),
    router       = express.Router(),
    dbService    = null,
    uuid         = require('node-uuid'),
    emailService = require('../../services/email-service'),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    transport = null;

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
                emailService.sendVerifyCode(email, rawCode, transport);
                return res.send({uuid: newUuid});
            });
        } else {
            // TODO .... UPDATE verify_code and verify_code_exp WHERE email = email, then email the verify code using emailService.emailVerifyCode()
        }
    });
});

router.post('/passwords', function(req, res) {
    var uuid = req.body.uuid;
    var code = req.body.code;
    var password1 = req.body.password1;
    var password2 = req.body.password2;
    if (!uuid || !code || !password1 || !password2) {
        return res.send({error: 'Invalid data'});
    }
    // TODO and WYLO 1 .... Make a call to dbService.getCodeAndExp(uuid, function) to see if the code matches and is not expired.
});

module.exports = function(databaseService, emailConfig) {
    dbService = databaseService;
    transport = nodemailer.createTransport(smtpTransport({
        host: 'mail.wordsfromwords.com',
            // TODO .... Get an SSL certificate so you can send secure emails.
        port: 26,
        secure: false,
        tls: {
            rejectUnauthorized: false
        },
            // TODO .... Get an SSL certificate so you can send secure emails.
        auth: {
            user: emailConfig.user,
            pass: emailConfig.password
        }
    }));
    return router;
};
