function Player () {

    socket.on('result', result);

    function search (text) {
        socket.emit('search', text);
    }

    function result (tracks) {
        console.log( "result", tracks );
    }

    return {
        search: search
    };
}
