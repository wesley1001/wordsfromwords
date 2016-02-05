var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var appConfig = require('config');
var dbService = require('./services/db-service').init(appConfig.get('config.db'));
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
app.use(session({secret: 'shift left logical'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/*passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    dbService.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
function(username, password, done) {
    dbService.verifyUser(username, password, function(err, user) {
        if (err) return done(err);
        if (!user) {
            return done(null, false);
        } else {
            return done(null, user);
        }
    });
}
));*/

var index = require('./routes/index')(dbService);

/* APIs */
var email    = require('./routes/api/email')(dbService, appConfig.get('config.email.noreply'));
var facebook = require('./routes/api/facebook')(dbService, appConfig.get('config.app'));

app.use('/', index);
app.use('/api/email', email);
app.use('/api/facebook', facebook);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
