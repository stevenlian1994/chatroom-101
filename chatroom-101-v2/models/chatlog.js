var mongoose = require("mongoose");

var chatlogSchema = new mongoose.Schema({
   history: String
});

module.exports = mongoose.model("Chatlog", chatlogSchema);