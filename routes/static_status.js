var status_data = require('../model/statuses');

exports.index = function(req, res){
	status_data.statuslist(10, function(err, statuslist) {
		res.json(statuslist);
	});
};