
// Module dependencies
var express = require('express'),
    swig = require('swig');

// Server Communication with Raspi
var WebSocketServer = require('ws').Server
, wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('user has connected');
    ws.on('message', function incoming(message) {
        console.log("me has mandado algo : " + message);
        ws.send('what the fuck');
    });
});

// Module dependencies
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
    // Get current playlist of server
});

// Create Mopidy
var Mopidy = require("mopidy");

var mopidy = new Mopidy({
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});

// Init Mopidy 
mopidy.on('state:online', function () {
    
    console.log('state online');
    
    // Default playlist
    var uri = 'spotify:user:lomejordespotifyenargentina:playlist:1K3CWZMz6B8Q3p4fcEK8UY';

    mopidy.library.lookup(uri).then(function(tracks) {
        
        mopidy.tracklist.clear();

        mopidy.tracklist.add(tracks);
        
        mopidy.playback.play();
    });
});

// Init Soclet.io
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    
    var player = new Player(socket, mopidy);
});

// Player
function Player (socket, mopidy) {
    
    socket.on('search', search);
    
    function search (text) {
        mopidy.library.search( {any: [text]}, ['spotify:'] )
            .then(result);
    }

    function result (data) {

        var trackList = data[0].tracks,
            tracks = [];
        
        for( i = 0; i < trackList.length; i++){

            var track = {
                name: trackList[i].name,
                album: trackList[i].album.name,
                uri: trackList[i].uri
            };
            
            tracks[i] = track;
        }

        socket.emit('result', tracks);
    }
}
