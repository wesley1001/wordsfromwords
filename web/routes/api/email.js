var express      = require('express'),
    router       = express.Router(),
    dbService    = null,
    uuid         = require('node-uuid'),
    bcrypt       = require('bcrypt'),
    emailService = require('../../services/email-service'),
    redisService = require('../../services/redis-service.js'),
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
        var rawCode = emailService.createVerifyCode();
        if (result.uuid === null) {
            var newUuid = uuid.v4();
            
            // TODO .... Use the first part of the email address as the display_name
            
            dbService.createEmailUser(newUuid, email, rawCode, function(createErr) {
                if (createErr) {
                    return res.send({error: createErr});
                }
                emailService.sendVerifyCode(email, rawCode, transport);
                return res.send({uuid: newUuid});
            });
        } else {
            dbService.updateCodeAndExp(rawCode, result.uuid, function(updateErr) {
                if (updateErr) {
                    return res.send({error: updateErr});
                }
                emailService.sendVerifyCode(email, rawCode, transport);
                return res.send({uuid: result.uuid});
            });
        }
    });
});

router.post('/passwords', function(req, res) {
    var clientUuid = req.body.uuid;
    var code = req.body.code;
    var password1 = req.body.password1;
    var password2 = req.body.password2;
    var email = req.body.email;
    if (!clientUuid || !code || !password1 || !password2 || !email || (password1 !== password2) || password1.length > 512) {
        return res.send({error: 'invalid data'});
    }
    dbService.getCodeAndExp(clientUuid, function(err, result) {
        if (err) {
            return res.send({error: err});
        }
        if (result.code !== code) {
            return res.send({error: 'code'});
        }
        if (!result.expired) {
            var emailToken = uuid.v4();
            dbService.setPassword(password1, emailToken, clientUuid, function(setPasswordErr) {
                if (setPasswordErr) {
                    return res.send({error: setPasswordErr});
                }
                redisService.setUser(clientUuid, emailToken, false);
                return res.send({uuid: clientUuid, token: emailToken});
            });
        } else {
            var rawCode = emailService.createVerifyCode();
            dbService.updateCodeAndExp(rawCode, clientUuid, function(updateErr) {
                if (updateErr) {
                    return res.send({error: updateErr});
                }
                emailService.sendVerifyCode(email, rawCode, transport);
                return res.send({error: 'expired'});
            });
        }
    });
});

router.post('/validate', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password || password.length < 8) {
        return res.send({error: 'invalid data'});
    }
    dbService.getUuidAndPassword(email, function(err, result) {
        if (err) {
            return res.send({error: err});
        }
        if (!result.uuid || !result.password) {
            return res.send({error: 'unknown error'});
        }
        bcrypt.compare(password, result.password, function(passwordErr, match) {
            if (passwordErr) {
                return res.send({error: passwordErr});
            }
            if (match) {
                // TODO and WYLO .... Generate a new email_token and email_token_exp and UPDATE this user.
            } else {
                return res.send({authenticated: false});
            }
        });
    });
});

router.post('/forgot', function(req, res) {
    var clientUuid = req.body.uuid;
    var email = req.body.email;
    if (!clientUuid) {
        return res.send({error: 'invalid data'});
    }
    if (!email) {
        return res.send({error: 'Please provide your email address.'});
    }
    dbService.getCodeAndExp(clientUuid, function(err, result) {
        if (err) {
            return res.send({error: err});
        }
        if (!result.expired) {
            return res.send({notExpired: true});
        } else {
            var rawCode = emailService.createVerifyCode();
            dbService.updateCodeAndExp(rawCode, clientUuid, function(updateErr) {
                if (updateErr) {
                    return res.send({error: updateErr});
                }
                emailService.sendPasswordReset(email, rawCode, transport);
                return res.send({codeEmailed: true});
            });
        }
    });
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
