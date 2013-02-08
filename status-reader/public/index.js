//var io = require(__dirname + '/socket.io.js');

var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
	console.log('Am I here?');
});

socket.on('xmpp-push', function (data) {
	var status = data['status'];
	var from = data['from'];
	var date = data['date'];
    console.log("push: " + date);
    $('.main-content ul.posts').append("<li>Timestamp: "+date+"From: "+from+" Message: "+status+"</li>");
});
socket.on('establish', function (data) {
	console.log("Connection established with express");
});
