//cleverbot.js
//How to use cleverbot:
//you must have a gmail account
//make a credentials.json file that contains one line formatted as follows:
//    {user: '[GMAIL_ID_GOES_HERE]', pwd: '[GMAIL_PWD_GOES_HERE]'}
//    credentials.json should be in the same directory
//run cleverbot.js with node
//when you receive a gchat, cleverbot will reply to the chat for you

var clevOn = true; //set the bot to be on or off

//included packages
var xmpp = require('simple-xmpp');
var fs = require('fs'); //for reading user credentials from a hidden file
var xmljson = require('libxmljs'); //for parsing the xmpp stream
var Cleverbot = require('cleverbot-node');
var CBot = new Cleverbot;

var vars = {}; //vars is a namespace for all instance-specific data

//read user credentials from file and start the XMPP server
vars.data = fs.readFileSync('.credentials.json','ASCII'); //synchronous
vars.stream = fs.createWriteStream('output.txt'); //fs.WriteStream
var creds = eval('('+vars.data+')');
vars.user = creds.user;
vars.pwd = creds.pwd;
start(vars.user,vars.pwd);

//functions

function start(user,pwd) { //starts the server
    console.log('Connecting to ' + user);
    xmpp.connect({
        jid:        user,
        password:   pwd,
        host:       'talk.google.com',
        port:       5222
});
}

//behavioral listeners

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

