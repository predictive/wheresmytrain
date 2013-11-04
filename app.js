var express = require('express');
var nconf   = require('nconf');
var mongodb = require('mongodb');
var mongojs = require('mongojs');

nconf.file('config/development.json');
var app = express();
var db = mongojs(nconf.get('mongo_connect_string'));


//  Browser routes
app.get('/', function(req, res) {
   res.sendfile('views/index.html');
});

app.get('/favicon.ico', function(req, res) {
   res.sendfile('include/img/train.ico');
});

app.get('/apple-touch-icon.png', function(req, res) {
   res.sendfile('include/img/apple-touch-icon.png');
});

// API routes
app.post('/submit-location', function(req, res) {
   res.status(200);
});

// Static locations
app.use("/css", express.static(__dirname + '/include/css'));
app.use("/fonts", express.static(__dirname + '/include/fonts'));
app.use("/img", express.static(__dirname + '/include/img'));
app.use("/js", express.static(__dirname + '/include/js'));


app.listen(nconf.get('listen_port'));
