var config = require('config'),
    redis  = require('redis').createClient({host: config.get('config.redis.host')});

function RedisService() {}

RedisService.prototype = {
    
    setUser: function(uuid, token, fbUser) {
        redis.hmset(uuid, 'token', token, 'fbUser', fbUser);
        // TODO and WYLO .... Set EXPIRES to some new value (you'll have to pass it in from email.js and facebook.js).
    },
    
    getUser: function(uuid, callback) {
        redis.hgetall(uuid, function(err, reply) {
            if (err) {
                console.log('Error getting user by UUID from redis:', err);
            }
            callback(reply);
        });
    }
    
};

module.exports = new RedisService();
