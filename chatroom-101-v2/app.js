var express = require("express"), 
    socket = require("socket.io");
    
//App Setup
var app = express();
var port = process.env.PORT || 4000;
var server = app.listen(port, function(){
    console.log("listening to requests on port:" + port)
    });
    
//Static Files
app.use(express.static("public"));
app.set("view engine", "ejs");
    
app.get("/", function(req,res){
    res.render("index");
})

var io = socket.listen(server);
io.on("connection", function(socket){
    console.log("made socket connection: ", socket.id);
    
    socket.on("chat", function(data){
        io.sockets.emit("chat", data);
    });
    
    socket.on("typing", function(data){
        socket.broadcast.emit("typing", data);
    })
});
    
    // app.use(express.static('public'));