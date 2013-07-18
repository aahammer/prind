
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , analyze = require('./routes/analyze')
  , home = require('./routes/home')
  , visualize = require('./routes/visualize')
  , extract = require('./routes/extract')
  , http = require('http')
  , path = require('path');
  
 
 //, mongoose = require('mongoose');
  
 /*
  mongoose.connect('mongodb:///mymongo', function() {  console.log();});
  
  var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    var kittySchema = mongoose.Schema({
        name: String
    });
    var Kitten = mongoose.model('Kitten', kittySchema);
    var silence = new Kitten({ name: 'Silence' });
    console.log(silence.name) ;
    silence.save(function (err) {if (err) console.log ('Error on save!')});
    
    
});
*/

 //, stylus = require('stylus');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.ico', 0));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
//app.register('.html', require('jade'));

app.use(require('stylus').middleware(__dirname + '/public'));

//console.log(require.resolve('stylus'));

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/home/:topic', home.home);
app.get('/extract/:topic', extract.extract);
//app.get('/structure', structure.structure);
app.get('/analyze/:topic', analyze.analyze);
app.get('/visualize/:topic', visualize.visualize);

app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

