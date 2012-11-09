//status-reader.js
//How to use status-reader:
//you must have a gmail account
//make a credentials.json file that contains one line formatted as follows:
//    {user: '[GMAIL_ID_GOES_HERE]', pwd: '[GMAIL_PWD_GOES_HERE]'}
//    credentials.json should be in the same directory
//run status-reader.js with node
//when someone updates their status,
//    the data will be printed to console
//    and it will be written to a text file

//warning: database implementation is pending

//included packages and startup
var express = require('express');
var app = express();
var mongo = require('mongodb'),
Server = mongo.Server,
Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('test',server);
var xmpp = require('simple-xmpp');
var fs = require('fs');
var xmljson = require('libxmljs');

var vars = {}; //namespace for instance-specific variables

vars.data = fs.readFileSync('.credentials.json','ASCII'); //synchronous
vars.stream = fs.createWriteStream('output.txt'); //fs.WriteStream
var creds = eval('('+vars.data+')');
vars.user = creds.user;
vars.pwd = creds.pwd;
start(vars.user,vars.pwd);

function start(user,pwd) {
    console.log('Connecting to ' + user);
    xmpp.connect({
        jid:        user,
        password:   pwd,
        host:       'talk.google.com',
        port:       5222
});
}

db.open(function(err,db) {
    if(!err){
        console.log("Error opening database");
    }
});


app.get('/', function(req, res) {
    res.send('hello world');
});
app.listen(3000);

xmpp.on('online', function() {
    console.log('Connected to ' + vars.user);

});

xmpp.on('chat', function(from,message) {
    xmpp.send(from, "Hey there, how are you?");
});

xmpp.on('error', function(err) {
    console.error(err);
});

xmpp.on('buddy',function(jid, state) {
   // console.log('%s is in %s state', jid,state);
});

xmpp.on('stanza', function(stanza) {
    vars.json = xmljson.parseXmlString(stanza);
    vars.stat = vars.json.get('//status');
    vars.show = vars.json.get('//show');
    vars.pri = vars.json.get('//priority');
    if(vars.stat) {
    vars.statstr = vars.stat.text();
    }
    if(vars.show) {
    vars.showstr = vars.show.text();
    }
    if(vars.pri) {
    vars.pristr = vars.pri.text();
    }
    
    var logentry = ""
     + Date() + ' '
     + vars.statstr + ' '
     + vars.showstr + ' '
     + vars.pristr;
    
    vars.stream.write(stanza + '\n');
    console.log(logentry);
//    console.log(stanza + '\n');
   });


function probe(user) {
    console.log("Attempting probe of " + user);
    xmpp.probe(user, function(state) {
        console.log("Probe of user "+ user + " " +state);
    });
}

