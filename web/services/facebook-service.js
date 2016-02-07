var https = require('https');

function FacebookService() {}

FacebookService.prototype = {
    
    /*
        For reference, this is what Facebook returns from https://graph.facebook.com/debug_token
        
             {
                 "data": {
                     "app_id": "1720156654870532",
                     "application": "Words From Words",
                     "expires_at": 1459742153,
                     "is_valid": true,
                     "issued_at": 1454558153,
                     "metadata": {
                         "auth_type": "rerequest",
                         "sso": "ios"
                     },
                     "scopes": [
                        "public_profile"
                     ],
                     "user_id": "10153905045409771"
                 }
             }
     */
    
    getUserByToken: function(token, appConfig, callback) {
        var result = '';
        var options = {
            host: 'graph.facebook.com',
            path: '/debug_token?input_token='+token+'&access_token='+appConfig.id+'|'+appConfig.secret
        };
        var request = https.request(options, function(response) {
            response.setEncoding('utf8');
            response.on('data', function(chunk) {
                result += chunk;
            });
            response.on('end', function() {
                try {
                    result = JSON.parse(result);
                    callback(result);
                } catch (error) {
                    callback(error + result);
                }
            });
        });
        request.on('error', function(error) {
            callback({error: error.message});
        });
        request.end();
    },
    
    isValidUser: function(user, fbId, appConfig) {
        return user.data &&
               user.data.user_id === fbId &&
               user.data.app_id === appConfig.id &&
               user.data.expires_at &&
               user.data.expires_at > Date.now();
    }
    
};

module.exports = new FacebookService();
