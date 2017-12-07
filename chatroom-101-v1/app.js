var express = require("express"),
    app = express(),
    socket = require("socket.io");

//App setup
var port = process.env.PORT || 8000;
var server = app.listen(port, function(){
  console.log("listening to request on port: " + port);
}); 
var users = [];
var connections = [];



//Static files
app.use(express.static('public'));
app.set("view engine", "ejs");


//Socket setup
var io = socket.listen(server);

io.sockets.on("connection", function(socket){
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);
    
    // Disconnect 
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected');
})

// io.on('connection', function(socket){
  
//   console.log('made socket connection', socket.id);

//   socket.on('chat', function(data){
//     io.sockets.emit('chat', data);
//   });

//   socket.on('typing', function(data){
//     socket.broadcast.emit('typing', data);
//   });

// });


//ROUTES
app.get("/", function(req, res){
  res.render("index");
});

// app.post("/register", function(req, res){
//   //create user and add to db
//   var newUser = new User({username: req.body.username});
  
//   User.register(newUser, req.body.password, function(err, user){
//     if(err){
//       console.log(err);
//       // return res.render("register");
//     } else {
//       passport.authenticate("local")(req, res, function(){
//         res.redirect("/dashboard");
//       });
//     }
//   });
// });