var nconf   = require('nconf');
nconf.file('conf/development.json');

var express = require('express');
var app = express();
app.use(express.bodyParser());

var mongodb = require('mongodb');
var mongojs = require('mongojs');
var db = mongojs(nconf.get('mongo_connect_string'));
var locationlog = db.collection('locationlog');
var poi = db.collection('poi');



// refactor elsewhere
function storeLocation(location) {
    locationlog.save(location);
}

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
    storeLocation(JSON.parse(req.body.location));
    console.log("saved");
    res.send(200);
});

app.post('/nearest-station', function(req, res) {
    var location = req.body.location;
    var longitude = location.lon;
    var latitude = location.lat;

    var closestStationQuery = {"loc":
                                {"$near":
                                  {"$geometry":
                                    {"type": "Point",
                                     "coordinates": [longitude, latitude]
                                   }}}};

    poi.findOne(closestStationQuery, function(err, doc) {
        if (doc) {
            resultJson = JSON.stringify({"nearest": doc.display_name});
            res.send(200, resultJson);
        } else {
            res.send(200, "Can't find your nearest station");
        }
    });
});

// Static locations
app.use("/css", express.static(__dirname + '/include/css'));
app.use("/fonts", express.static(__dirname + '/include/fonts'));
app.use("/img", express.static(__dirname + '/include/img'));
app.use("/js", express.static(__dirname + '/include/js'));


app.listen(nconf.get('listen_port'));
