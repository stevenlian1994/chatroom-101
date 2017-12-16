var mongoose = require("mongoose");

var chatlogSchema = new mongoose.Schema({
   handle: String,
   message: String,
   time_stamp : String
});

module.exports = mongoose.model("Chatlog", chatlogSchema);