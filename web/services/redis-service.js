var config = require('config'),
    redis  = require('redis').createClient({host: config.get('config.redis.host')});

function RedisService() {}

RedisService.prototype = {
    
    setUser: function(uuid, token, fbUser) {
        redis.hmset(uuid, 'token', token, 'fbUser', fbUser);
        redis.expire(uuid, 60 * 60 * 24 * 60); // 60 days (60s * 60m * 24h * 60d) 
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
