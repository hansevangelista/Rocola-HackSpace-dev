
/***************** Pages ****************/
window.pages = new Pages(document.querySelector('.wrapper'), {
    time: 250,
    init: 1
});

/*************** Socket.io **************/
var socket = io();

/**************** Player ****************/
window.player = new Player(socket);

/**************** Search ****************/
window.input = document.querySelector('.input');

Input(input);

input.addEventListener('enter', function (e) {
    player.search(input.value);
});

/**************** Add ****************/
