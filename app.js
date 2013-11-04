var express = require('express');
var mongodb = require('mongodb');
var app = express();

app.get('/', function(req, res) {
   res.sendfile('views/index.html');
});

app.get('/favicon.ico', function(req, res) {
   res.sendfile('include/img/train.ico');
});

app.get('/apple-touch-icon.png', function(req, res) {
   res.sendfile('include/img/apple-touch-icon.png');
});


app.listen(8888);
