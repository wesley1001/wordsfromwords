var https = require('https');

function FacebookService() {}

FacebookService.prototype = {
    
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
    }
    
};

module.exports = new FacebookService();
