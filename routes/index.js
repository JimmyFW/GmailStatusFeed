
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', {
	    title: 'nodejs',
	    line: 'This is a line that will be rendered'
	});
};