var mongoose = require('mongoose');

// connect to database and define schemas

var db = mongoose.connect('mongodb://localhost/gchatxmpp');

var Item = new mongoose.Schema({
    date: Date,
    from: String,
    to: String,
    status: String,
    presence: String,
    photo: String,
    device: String
});
var ItemModel = mongoose.model('Item',Item);
ItemModel.find({from:{"$regex":"^.*@.*/.*$"}}, function(err, validemails, reg) {
	for(var i=0; i<validemails.length; i++) {
		var mid = validemails[i]._id;
		console.log(mid);
		var from = validemails[i].from;
		var email = from.split("/");
		var user = email[0];
		var device = email[1];
		ItemModel.update({_id:mid},{$set:{from:user,device:device}},function(res) {
			console.log("updated " + mid);
		});

	}
});