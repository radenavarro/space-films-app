var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sequelize = require('sequelize');

var models = require('./models');

var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');
var actorsRouter = require('./routes/actors');

var app = express();
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')

app.use(cookieParser());
app.use(session({ secret: 'spacecat', resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(sequelize);

app.use(logger('dev'));

// Passport config
require('./config/passport')(passport, models.User);

// Routing
app.use('/', indexRouter);
app.use('/movies', passport.authenticate('jwt', { session: false }), moviesRouter);
app.use('/actors', passport.authenticate('jwt', { session: false }), actorsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
