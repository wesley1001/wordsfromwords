var pg = require('pg').native;

module.exports = {
    
    init: function(dbConfig) {
        var username = dbConfig.get('username');
        var password = dbConfig.get('password');
        var hostname = dbConfig.get('hostname');
        var database = dbConfig.get('database');
        this.connectionString = 'postgres://'+username+':'+password+'@'+hostname+'/'+database;
        return this;
    },
    
    emailExists: function(email, callback) {
        pg.connect(this.connectionString, function(err, client, done) {
            if (err) {
                callback('Error getting client connection: ' + err);
                return;
            }
            client.query({
                name: 'email_exists_query',
                text: 'SELECT email_exists($1)',
                values: [email]
            },
            function (err, result) {
                if (err) {
                    callback('Error performing email_exists() query: ' + err);
                    return;
                }
                if (result && result.rows && result.rows[0] && result.rows[0].email_exists) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            });
        });
    },
    
    end: function() {
        pg.end();
    }
    
};
