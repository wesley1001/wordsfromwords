var express   = require('express'),
    router    = express.Router(),
    fbService = require('../../services/facebook-service'),
    dbService = null;

router.post('/relogin', function(req, res) {
    var uuid = req.body.uuid;
    var token = req.body.token;
    if (!uuid || !token) {
        return res.send({authenticated: false});
    }
    dbService.getTokensByUuid(uuid, function(err, result) {
        var currentTime = Date.now();
        if (token === result.fbToken) {
            if (!result.fbTokenExp || (currentTime >= new Date(result.fbTokenExp).getTime())) {
                return res.send({authenticated: false});
            }
            return res.send({authenticated: true, fbUser: true});
        } else if (token === result.emailToken) {
            if (!result.emailTokenExp || (Date.now() >= new Date(result.emailTokenExp).getTime())) {
                return res.send({authenticated: false});
            }
            return res.send({authenticated: true, fbUser: false});
        } else {
            return res.send({authenticated: false});
        }
    });
});

module.exports = function(databaseService) {
    dbService = databaseService;
    return router;
};
