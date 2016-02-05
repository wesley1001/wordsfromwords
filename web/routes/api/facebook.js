var express   = require('express'),
    router    = express.Router(),
    fbService = require('../../services/facebook-service'),
    uuid      = require('node-uuid'),
    dbService = null,
    appConfig = null;

router.post('/validate', function(req, res) {
    var fbId    = req.body.fbId;
    var fbToken = req.body.fbToken;
    if (!fbId || !fbToken) {
        return res.send({error: 'Invalid data'});
    }
    fbService.getUserByToken(fbToken, appConfig, function(result) {
        if (!result.data || result.data.app_id !== appConfig.id || result.data.user_id !== fbId) {
            if (result.error) {
                console.log('Error:', result.error);
            } else {
                console.log('Unknown error:', result);
            }
            return res.send({error: 'Invalid app or user'});
        }
        // TODO and WYLO .... Look up the uuid WHERE fbToken = fbToken, then INSERT (or UPDATE)
        console.log('Houston, the Eagle has landed!');
        return res.send({uuid: '12345678'});
    });
});

module.exports = function(databaseService, appConfiguration) {
    dbService = databaseService;
    appConfig = appConfiguration;
    return router;
};
