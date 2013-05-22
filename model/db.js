var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    date: String,
    from: String,
    to: String,
    status: String,
    presence: String,
    photo: String
});
var ItemModel = mongoose.model('Item', ItemSchema);
mongoose.connect('mongodb://localhost/gchatxmpp');
console.log("Connected to db");
//db.on('error', console.error.bind(console, 'connection error:'));