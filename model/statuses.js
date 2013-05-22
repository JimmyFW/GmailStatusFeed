var mongoose = require('mongoose');

exports.statuslist = function statuslist(n, callback) {
	console.log("Inside statuslist");
	var Item = mongoose.model('Item');
	console.log("Model created");
	var query = Item.find({status: {"$exists":true,"$ne": ""}});
	query.sort({date:-1}).limit(n).exec(function (err, items) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(items);
			callback("", items);
		}
	});
}