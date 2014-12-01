// Create Mopidy
var Mopidy = require("mopidy");

var mopidy = new Mopidy({
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});

// Init Mopidy 
mopidy.on('state:online', function () {
    
    console.log('state online');
    
    // Default playlist
    var uri = 'spotify:user:spotifyenchile:playlist:3aZzYRCQ1Pi3qaPP8H9VTT';
    
    mopidy.library.lookup(uri).then(function(tracks) {
        
        mopidy.tracklist.clear();
        
        mopidy.tracklist.add(tracks);
        
        mopidy.tracklist.setConsume(false);
        mopidy.tracklist.getConsume()
            .done(function (track) {
                console.log("consume: " + track) ;
            });

        mopidy.playback.play();
    });
});

var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080');

function MopidyController ()  {
    return {
        defaultList: true,
        play: function(){
            // mopidy????play;
            console.log("asdf");
        },
        addTrack: function(data){
            console.log("lol");
        },
        getTrack: function(data){
            // mopidy.on('event:playbackStateChanged', function (state) {
            //     console.log("++++++++++++++++++++++++++++++++++");
            //     console.log("playbackStateChanged: " + JSON.stringify(state.new_state));
            //     console.log("++++++++++++++++++++++++++++++++++");
            // });

            // mopidy.on('event:trackPlaybackPaused', function (track){
            //     console.log("------------------------------------");
            //     console.log("State: " + JSON.stringify(track,null, 2));
            //     console.log("------------------------------------");
            // });
            // mopidy.on('event:trackPlaybackResumed', function (track){
            //     console.log("------------------------------------");
            //     console.log("State: " + JSON.stringify(track,null, 2));
            //     console.log("------------------------------------");
            // });
            
            // everytime the song changes, the the cotent of all this is evaluated automatically check this so you don't do work in vain
        }
    };
}

var mopidyController = new MopidyController;

ws.on('open', function open() {
    var response = {
        "type": "updatePlaylist",
        "data": {
            "playlist": "blablabla this is custom",
            "track": "lento"
        }
    };
    
    var data = JSON.stringify(response);
    ws.send(data);
    console.log("connected");
});

ws.on('message', function(message) {
    var request  = JSON.parse(message);
    console.log("action: " + request.action);
    mopidyController[request.action](request.data);
});

// Started playback
mopidy.on('event:trackPlaybackStarted', function () {
    
    console.log('event:trackPlaybackStarted');
    
    mopidy.on('event:tracklistChange', function (playlist){
        console.log("------------------------------------");
        console.log("Playlist Changed, (Did you erase something?): " + JSON.stringify(playlist,null, 2));
        console.log("------------------------------------");
        
    });
    mopidy.playback.getCurrentTrack()
        .done(function (track) {
            console.log("Current Track: " + JSON.stringify(track,null, 2));
            ws.send(JSON.stringify(track));
        });
    
    mopidy.on('event:trackPlaybackEnded', function (track){
        console.log("------------------------------------");
        // console.log("tl_track: " + JSON.stringify(track.tl_track, null, 2));
        // mopidy.tracklist.remove({'tlid': [track.tl_track["tlid"]]});
        console.log("Current Index: " + mopidy.tracklist.index(track.tl_track));
        console.log("He heliminado el track de id: " + track.tl_track["tlid"]);
        console.log("EL titulo de la cancion era: " + track.tl_track.track.name);
        console.log("Te suena?");
        console.log("------------------------------------");
    });
    
    setTimeout(function () {
        console.log('hoo');
        // mopidy.tracklist.getLength()
        //     .done(function (length) {
        //         console.log('length', length);
        //     });
        
        // mopidy.playback.getCurrentTrack()
        //     .done(function (track) {
        //         console.log('track', track);
        //     });
    }, 2000);
});
