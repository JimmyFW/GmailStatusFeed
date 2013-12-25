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
ItemModel.find({to:{"$regex":"^.*@.*/.*$"}}, function(err, validemails, reg) {
	for(var i=0; i<validemails.length; i++) {
		var mid = validemails[i]._id;
		console.log(mid);
		var to = validemails[i].to;
		var to_arr = to.split("/");
		var user_source = to_arr[0];
		console.log(user_source);
		ItemModel.update({_id:mid},{$set:{to:user_source}},function(res) {
			console.log("updated " + mid);
		});
	}
});