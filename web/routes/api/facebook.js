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
                dbService.createFbUser(userUuid, fbId, fbToken, new Date(user.data.expires_at * 1000).toISOString(), displayName, function(createErr) {
                    if (createErr) {
                        return res.send({error: createErr});
                    }
                    return res.send({uuid: userUuid});
                });
            } else {
                userUuid = result.uuid;
                // TODO .... The user has logged in via Facebook again (not their first time), so UPDATE fbToken WHERE uuid = userUuid
                return res.send({uuid: userUuid});
            }
        });
    });
});

module.exports = function(databaseService, appConfiguration) {
    dbService = databaseService;
    appConfig = appConfiguration;
    return router;
};
