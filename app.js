
/**
 * Module dependencies.
 */

var express = require('express')
  , db = require('./model/db')
  , routes = require('./routes')
  , user = require('./routes/user')
  , ss = require('./routes/static_status')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//var status_data = require('./model/statuses');

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/static_status', ss.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});