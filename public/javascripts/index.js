/*
	var socket = io.connect('http://localhost:3000');

	socket.on('connect', function() {
		console.log('Am I here?');
	});

	socket.on('xmpp-push', function (data) {
		var status = data['status'];
		var from = data['from'];
		var date = data['date'];
	    console.log("push: " + date);
	    $('.sidebar ul.posts').append("<li>Timestamp: "+date+"From: "+from+" Message: "+status+"</li>");
	});
	socket.on('establish', function (data) {
		console.log("Connection established with express");
	});
*/

function buildStatusNode(status) {
	var from = status.from;
	var status = status.status;
	var date_var = status.date;
	var jq = $('<div class="status_box"></div>')
	jq.append('<h1>' + from + '</h1>');
	jq.append('<p>' + status + '</p>');
	jq.append('<p>' + date_var + '</p>');
	return jq;
}

var main = function() {
	$.getJSON('/static_status', function(response) {
		console.log(response);
		var buffer = [];
		for(i=0; i<response.length; i++) {
			var jq = $('<div class="status_box"></div>')
			jq.append('<h1>' + response[i].from + '</h1>');
			jq.append('<p>' + response[i].status + '</p>');
			jq.append('<p>' + response[i].date + '</p>');
			//var status_box = buildStatusNode(response[i]);
			//console.log(status_box);
			buffer.push(jq);
		}
		for(i=0; i<buffer.length; i++) {
			$('#statuses').append(buffer[i]);
		}
	});
};

$(document).ready(main);