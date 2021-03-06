var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

dotenv.config();        // Load environment variables

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tagListRouter = require('./routes/tagList.routes');

var app = express();

// Connect to the data base.
mongoose.connect(process.env.dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
    console.log('Connected to the database.');
  })
  .catch(err => {
    console.log('Could not connect to MongoDB Atlas.');
    process.exit();
  });

 
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', tagListRouter);
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

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
