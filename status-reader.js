/*
status-reader.js

How to use status-reader:
    you must have a gmail account
    make a credentials.json file that contains one line formatted as follows:
        {user: '[GMAIL_ID_GOES_HERE]', pwd: '[GMAIL_PWD_GOES_HERE]'}
        credentials.json should be in the same directory
    run status-reader.js with node
    when someone updates their status,
        the data will be printed to console
        and it will be written to a text file
*/

// *******************************************************
// Setup
// *******************************************************

// import packages

var express = require('express')
    , stylus = require('stylus')
    , nib = require('nib')
    , io = require('socket.io')
    , xmpp = require('simple-xmpp')
    , xmljson = require('libxmljs')
    , mongoose = require('mongoose');
    
var fs = require('fs')
    , readline = require('readline');


// connect to database and define schemas

var db = mongoose.connect('mongodb://localhost/gchatxmpp');
var Item = new mongoose.Schema({
    date: String,
    from: String,
    to: String,
    status: String,
    presence: String,
    photo: String
});
var ItemModel = mongoose.model('Item', Item);


// configure express

var app = express();
app.configure(function() {
    app.set('views',__dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(stylus.middleware({
        src: __dirname + '/public'
        , compile: compile
    }))
    app.use(express.static(__dirname + '/public'));
});
var server = app.listen(3000);


// start socket connections

var sio = io.listen(server);
sio.sockets.on('connection', function(socket) {
    console.log('Sockets have been turned on');
    socket.emit('establish', { hello: 'world'});
});



// *******************************************************
var vars = {}; //namespace for instance-specific variables
// *******************************************************


//
vars.settings_data = fs.readFileSync('config.json');
vars.settings = eval('(' + vars.settings_data + ')');
console.log("0 for prompt, 1 for auto: " + vars.settings.dev);

// set up output streams for debugging
if(vars.settings.dev == 1) {
    vars.data = fs.readFileSync('.credentials.json','ASCII'); //synchronous
    vars.stream = fs.createWriteStream('public/output.txt'); //fs.WriteStream
    vars.streamAll = fs.createWriteStream('public/allOutput.txt'); //fs.WriteStream


    // connect to gmail client

    var creds = eval('('+vars.data+')');
    vars.user = creds.user;
    vars.pwd = creds.pwd;
    start(vars.user,vars.pwd);
}
else {
    /*
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    vars.user = rl.question("What is your username? ", function(answer) {
        vars.user = answer;
    });
    vars.pwd = getPassword("What is your password? ", function(answer) {
        vars.pwd = answer;
    });*/
    start(vars.user,vars.pwd);
}



// *******************************************************
// Behaviors
// *******************************************************

// define endpoints for express frontend

app.get('/', function(req, res) {
    res.render('index', {
        title: 'nodejs',
        line: 'This is a line that will be rendered'
    });
});

app.get('/login', function(req, res) {
    res.render('login', {
        title: 'Log in to gmail',
        line: 'Enter your gchat username and password, please'
    });
});

// define behaviors for node-xmpp chat client

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
    console.log(stanza);
    vars.json = xmljson.parseXmlString(stanza);
    vars.logentry = parse(stanza);
    if(vars.logentry) {
	    vars.stream.write(vars.logentry + '\n');
	    vars.streamAll.write(vars.json + '\n');

	    sio.sockets.emit('xmpp-push', vars.logentry);

	    vars.item = new ItemModel(vars.logentry);
	    vars.item.save( function(error, data) {
	        if(error) { console.log("BIG ERROR"); }
	    });
	}
	else {
		console.log("MISFIRE!");
	}

});



// *******************************************************
// Functions
// *******************************************************



function start(user,pwd) {
    console.log('Connecting to ' + user);
    xmpp.connect({
        jid:        user,
        password:   pwd,
        host:       'talk.google.com',
        port:       5222
    });
}

function parse(stanza) {
    var json = xmljson.parseXmlString(stanza);

    if(!json){ return null }

    var stat = json.get('//status')
    , pri = json.get('//priority')
    , pres = json.get('//presence');

    if(!pres) { return null }
    //console.log(pres);
    var from = pres.attr('from')
    , to = pres.attr('to')
    , xmlns_stream = pres.attr('xmlns:stream')
    /*
    , caps_c = json.get('//caps:c')
    , node = caps_c.attr('node')
    , ver = caps_c.attr('ver')
    , ext = caps_c.attr('ext')*/
    , photo = json.get('//photo');


    if(from) { var from_str = from.value(); }
    else { var from_str = ""; }
    if(to) { var to_str = to.value(); }
    else { var to_str = ""; }
    if(stat) { var stat_str = stat.text(); }
    else { var stat_str = ""; }
    if(pres) { var pres_str = pres.text(); }
    else { var pres_str = ""; }
    if(photo) { var photo_str = photo.text(); }
    else { var photo_str = ""; }
    
    var logentry = {
        'date':     Date(),
        'from':     from_str,
        'to':     to_str,
        'status':   stat_str,
        'presence': pres_str,
        'photo': photo_str
    };

    return logentry;
}

function probe(user) {
    console.log("Attempting probe of " + user);
    xmpp.probe(user, function(state) {
        console.log("Probe of user "+ user + " " +state);
    });
}

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}