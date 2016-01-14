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
    
    emailExists: function(email) {
        // TODO and WYLO 2 .... Use your new email_exists() stored function!
    },
    
    end: function() {
        pg.end();
    }
    
};
