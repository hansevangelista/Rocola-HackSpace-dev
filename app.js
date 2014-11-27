
// Module dependencies
var express = require('express'),
    swig = require('swig');

// Create server
var app = express();

// Configure server
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

app.use(express.static('./public'));

// Routes
app.get('/', function(req, res){
    res.render('index');
});

// Init server
var port = 4000;

var server = app.listen(port, function () {
    console.log('server listening on port', port);
});
