//var io = require(__dirname + '/socket.io.js');

var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
	console.log('Am I here?');
	//socket.emit('adduser', prompt("What's your name?"));
});

socket.on('xmpp-push', function (data) {
    console.log("push: " + data);
    $('.main-content ul.posts').append("<li>"+data+"</li>");
});
socket.on('establish', function (data) {
	console.log("Connection established with express");
});
