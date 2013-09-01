var mongoose = require('mongoose');

exports.statuslist = function statuslist(n, callback) {
	var Item = mongoose.model('status');
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