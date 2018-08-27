var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var session = require('express-session');
var flash = require('connect-flash');

//const fileUpload = require('express-fileupload');
 
// default options


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dbproducts',{ useNewUrlParser: true });
require("./models/input");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
//app.use(fileUpload());

app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
 app.use(flash());


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler


// error handler


app.use(fileUpload({preserveExtension: true}));

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./public/files/input.csv', function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
    //res.redirect('/');
  });
});

// fs.readFile('./public/files/sample.json', 'utf8', function (err, data) {
//   if (err) throw err;
//   console.log(data);
//   var json = JSON.parse(data);
  
//   db.configurations.insert(json, function(err, doc) {
//       console.log(data);
//   if(err) throw err;
//   });

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;