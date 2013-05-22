var status_data = require('../model/statuses');

exports.index = function(req, res){
	console.log("I'm in static_status!");
	status_data.statuslist(10, function(err, statuslist) {
		res.json(statuslist);
	});
};