var clevOn = true;

var xmpp = require('simple-xmpp');
var fs = require('fs'); //for reading user credentials from a hidden file
var xmljson = require('libxmljs'); //for parsing the xmpp stream
var Cleverbot = require('cleverbot-node');
var CBot = new Cleverbot;
var vars = {};

vars.data = fs.readFileSync('.credentials.json','ASCII'); //synchronous
vars.stream = fs.createWriteStream('output.txt'); //fs.WriteStream
var creds = eval('('+vars.data+')');
vars.user = creds.user;
vars.pwd = creds.pwd;
start(vars.user,vars.pwd);

xmpp.on('online', function() {
    console.log('Connected to ' + vars.user);

});

xmpp.on('chat', function(from,message) {
    var respond = function respond(clev) {
        xmpp.send(from,clev['message']);
    }

    if(clevOn) {
        CBot.write(message,respond);
    }
    else {
    xmpp.send(from, "Hey there, how are you?");
    }
});

xmpp.on('error', function(err) {
    console.error(err);
});

xmpp.on('buddy',function(jid, state) {
   // console.log('%s is in %s state', jid,state);
});

xmpp.on('stanza', function(stanza) {
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

