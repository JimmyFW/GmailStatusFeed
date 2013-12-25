var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    date: Date,
    from: String,
    to: String,
    status: String,
});
var ItemModel = mongoose.model('status', ItemSchema);
mongoose.connect('mongodb://localhost/tmad4000');
console.log("Connected to db");