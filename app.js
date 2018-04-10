var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/*Modelos DB*/
var models = require('./models/index');

/*enlace de rutas*/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var semilleros = require('./routes/semilleros');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*uso de rutas*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/semilleros', semilleros);

/*Sincroninzacion DB*/
models.sequelize.sync()
.then(
  function(){
    console.log("Se conectó a la DB");
  }
).catch(
  function(error){
    console.log("Error en la conexion: "+error);
  }
);

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
  res.render('error');
});

module.exports = app;
