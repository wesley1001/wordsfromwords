var express   = require('express'),
    router    = express.Router(),
    fbService = require('../../services/facebook-service'),
    uuid      = require('node-uuid'),
    dbService = null;

router.post('/relogin', function(req, res) {
    var clientUuid = req.body.uuid;
    var token = req.body.token;
    if (!clientUuid || !token) {
        return res.send({error: 'Invalid data'});
    }
    // TODO and WYLO .... Call your new getTokensByUuid() service and do what launch.txt says.
});

module.exports = function(databaseService) {
    dbService = databaseService;
    return router;
};
