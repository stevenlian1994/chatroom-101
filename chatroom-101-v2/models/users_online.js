var mongoose = require("mongoose");

var users_online_Schema = mongoose.Schema({
    username: String,
});

module.exports = mongoose.model("Users_online",users_online_Schema) 