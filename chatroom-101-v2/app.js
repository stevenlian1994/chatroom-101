var express = require("express"), 
    socket = require("socket.io"),
    mongoose = require("mongoose"),
    Chatlog = require("./models/chatlog");

//App Setup
var app = express();
var port = process.env.PORT || 4000;
var server = app.listen(port, function(){
    console.log("listening to requests on port:" + port)
    });
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/chatroom-101", {useMongoClient: true});
    
//Static Files
app.use(express.static("public"));
app.set("view engine", "ejs");


    
app.get("/", function(req,res){
    
    //chatlog.history should be a String like "<p>Hello</p>" which should be able to translate into <p>Hello</p> after ejs template
    // Chatlog.find({}, function(err, chatlog){
    //     if(err){
    //         console.log(err);
    //     } else {
    //       res.render("index", {chatlog: chatlog}); 
    //     }
    // });
    
    console.log( Chatlog.find({}).limit(1).sort({$natural:-1}));
    console.log( Chatlog.findOne({}, {sort:{$natural:-1}}));
    console.log( Chatlog.find({}).sort({$natural:-1}).limit(1));
    
    res.render("index");

})

var io = socket.listen(server);
io.on("connection", function(socket){
    console.log("made socket connection: ", socket.id);
    
    socket.on("chat", function(data){
        io.sockets.emit("chat", data);
        
    });
    
    socket.on("chatlog", function(data){
        // console.log(data); #=> stirng
        //save chatlog
        var newChatlog = {history: data};
        // //create a new campground and save to DB
        Chatlog.create(newChatlog, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log("updated chatlog in mongodb")
        }
    });
    });
    
    socket.on("typing", function(data){
        socket.broadcast.emit("typing", data);
    })
});


