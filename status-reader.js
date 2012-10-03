var express = require('express');
var xmpp = require('simple-xmpp');
var fs = require('fs');

fs.readFile('credentials.json','ASCII', function(err, data) {
    if(err) throw err;
    var creds = eval('('+data+')');
    var user = creds.user;
    var pwd = creds.pwd;
    start(user,pwd);
});


xmpp.on('online', function() {
    console.log('yo, im here');
});

xmpp.on('chat', function(from,message) {
    xmpp.send(from, 'echo ' + message);
});

xmpp.on('error', function(err) {
    console.error(err);
});

function start(user,pwd) {
xmpp.connect({
    jid:        user,
    password:   pwd,
    host:       'talk.google.com',
    port:       5222
});
}


