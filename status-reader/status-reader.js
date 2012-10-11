var express = require('express');
var xmpp = require('simple-xmpp');
var fs = require('fs');
var xmljson = require('libxmljs');
var vars = {};

vars.data = fs.readFileSync('credentials.json','ASCII');
var creds = eval('('+vars.data+')');
vars.user = creds.user;
vars.pwd = creds.pwd;
start(vars.user,vars.pwd);

xmpp.on('online', function() {
    console.log('Connected to ' + vars.user);
  //  probe(vars.user);

});

xmpp.on('chat', function(from,message) {
   // xmpp.send(from, 'echo ' + message);
   // console.log(message);
});

xmpp.on('error', function(err) {
    console.error(err);
});

xmpp.on('buddy',function(jid, state) {
   // console.log('%s is in %s state', jid,state);
});

xmpp.on('stanza', function(stanza) {
    vars.json = xmljson.parseXml(stanza);
    console.log(Date()
    + vars.json.get('status') + ' '
    + vars.json.get('show') + ' '
    + vars.json.get('priority'));
});

function start(user,pwd) {
    console.log('Connecting to ' + user);
xmpp.connect({
    jid:        user,
    password:   pwd,
    host:       'talk.google.com',
    port:       5222
});
}

function probe(user) {
    console.log("Attempting probe of " + user);
    xmpp.probe(user, function(state) {
        console.log("Probe of user "+ user + " " +state);
    });
}

