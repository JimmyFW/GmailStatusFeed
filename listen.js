var xmpp = require('simple-xmpp');
var xmljson = require('libxmljs');
var mongoose = require('mongoose');
var fs = require('fs');

// connect to database and define schemas

var db = mongoose.connect('mongodb://localhost/tmad4000');
var Item = new mongoose.Schema({
    date: Date,
    from: String,
    to: String,
    status: String,
    device: String
});
var ItemModel = mongoose.model('status', Item);


// set up output streams for debugging

var data = fs.readFileSync('.credentials.json','ASCII'); //synchronous
var stream = fs.createWriteStream('./public/output.txt'); //fs.WriteStream
var streamAll = fs.createWriteStream('./public/allOutput.txt'); //fs.WriteStream


// connect to gmail client

var creds = JSON.parse(data);
var user = creds.user;
var pwd = creds.pwd;
start(user,pwd);


// behaviors for xmpp

xmpp.on('online', function() {
    console.log('Yes, I\'m connected!');
});

xmpp.on('chat', function(from, message) {
    xmpp.send(from, 'echo: ' + message);
});

xmpp.on('error', function(err) {
    console.error(err);
});

xmpp.on('stanza', function(stanza) {

	streamAll.write(stanza);
	streamAll.write("\n\n");

	if(stanza) {
	    var json = xmljson.parseXmlString(stanza);
	    var logentry = parse(stanza);
	    
	    if(logentry) {
		    stream.write(JSON.stringify(logentry) + '\n');

		    entrymodel = new ItemModel(logentry);
		    entrymodel.save( function(error, data) {
		        if(error) {
                    console.log("Could not save logentry");
                }
		    });

		}
		else {
			//console.log("Could not parse stanza");
			//console.log(stanza);
		}
	}
	else {
		console.log("null stanza");
	}

});

// functions

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

    var stanza_type = stanza.name;

	if (stanza_type === 'presence') {
        for (var i=0; i<stanza.children.length; i++) {
            var child = stanza.children[i];
            if(child.name === 'status' && child.children[0] != null) {
                var fromfield = stanza.attrs.from;
                var fromfields = fromfield.split('/');
                var fromuser = fromfields[0];
                var fromdevice = fromfields[1];

                var tofield = stanza.attrs.to;
                var tofields = tofield.split('/');
                var touser = tofields[0];

                var logentry = {
                    date: Date(),
                    from: fromuser,
                    to: touser,
                    status: child.children[0],
                    device: fromdevice
                };
                console.log(logentry);
                return logentry;
            }
        }
	}
	else if(stanza_type === 'iq') {
        // this is the other type of stanza, the info-query
        return null;
	}
	else {
		console.log("We have nothing");
		console.error("Exiting parse");
        return null;
	}
}