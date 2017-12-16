var express = require("express"),
    app = express(),
    socket = require("socket.io");
    
//Connect to Server
var port = process.env.PORT || 8080;

var server = app.listen(port, function(){
    console.log("listening on port:", port)
})
//template view engine
app.set("view engine", "ejs");
//static files
app.use(express.static("public"));

app.get("/", function(req,res){
   res.render("index"); 
});

var io = socket.listen(server);
io.on("connection", function(socket){
    console.log("made connection:", socket.id);
    
    socket.on("message", function(data){
        io.sockets.emit("message", data);
    });
    
});

// var io = socket.listen(server);
// io.on("connection", function(socket){
//     console.log("made socket connection: ", socket.id);
    
//     socket.on("chat", function(data){
//         io.sockets.emit("chat", data);
//     });
    
//     socket.on("typing", function(data){
//         socket.broadcast.emit("typing", data);
//     })
// });