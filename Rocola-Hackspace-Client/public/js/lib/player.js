function Player () {

    socket.on('result', result);

    function search (text) {
        socket.emit('search', text);
    }

    function result (tracks) {
        console.log( "result", tracks );
        add(tracks[0]);
    }

    function add (track) {
        socket.emit('add', track.uri);
    }

    return {
        search: search
    };
}
