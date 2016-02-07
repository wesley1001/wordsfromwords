var express   = require('express'),
    router    = express.Router(),
    fbService = require('../../services/facebook-service'),
    uuid      = require('node-uuid'),
    dbService = null,
    appConfig = null;

router.post('/validate', function(req, res) {
    var fbId = req.body.fbId;
    var displayName = req.body.displayName;
    var fbToken = req.body.fbToken;
    if (!fbId || !fbToken) {
        return res.send({error: 'Invalid data'});
    }
    fbService.getUserByToken(fbToken, appConfig, function(user) {
        if (!fbService.isValidUser(user, fbId, appConfig)) {
            if (user.error) {
                console.log('Error:', user.error);
            } else {
                console.log('Unknown error:', user);
            }
            return res.send({error: 'Invalid app or user'});
        }
        dbService.getUuidByFbToken(fbToken, function(err, result) {
            if (err) {
                return res.send({error: err});
            }
            var userUuid = '';
            if (result.uuid === null) {
                userUuid = uuid.v4();
                // TODO and WYLO 1 .... Use dbService.createFbUser() to INSERT userUuid, fbId, fbToken, fbTokenExp, displayName
                //
                //                      For the value of fbTokenExp, do this: new Date(user.expires_at * 1000).toISOString()
            } else {
                userUuid = result.uuid;
                // TODO and WYLO 3 .... UPDATE fbToken WHERE uuid = userUuid
            }
            return res.send({uuid: userUuid});
        });
    });
});

module.exports = function(databaseService, appConfiguration) {
    dbService = databaseService;
    appConfig = appConfiguration;
    return router;
};
