var sys = require('sys');
//var colors = require('./node_modules/xmpp-client/node_modules/colors');
var colors = require('colors');
var xmpp = require('node-xmpp');
var Client = require('./lib/xmpp-client').Client;
var fs = require('fs');

fs.readFile('credentials.json','ASCII', function(err, data) {
    if(err) throw err;
    var creds = eval('('+data+')');
    var user = creds.user;
    var pwd = creds.pwd;
    start(user,pwd);
});

function start(user,pwd) {
    var c = new Client({
        jid: user,
        password: pwd
    }, function() {
        sys.debug("I'm connected, bro");
        
        var jabber = c;
        c.iq(new xmpp.Element('query', {xmlns: 'rosterx'}),
        function(iq) {
            iq.getChild('query','rosterx').children.forEach(
            function(child) {
                sys.debug(child.attrs.jid);
            });
        });
    });
}

