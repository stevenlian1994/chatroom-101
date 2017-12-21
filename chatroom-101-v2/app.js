var express = require("express"), 
    socket = require("socket.io"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    moment = require("moment-timezone"),
    User = require("./models/user"),
    Users_online = require("./models/users_online"),
    Chatlog = require("./models/chatlog");

//App Setup
var app = express();
var port = process.env.PORT || 4000;
var server = app.listen(port, function(){
    console.log("listening to requests on port:" + port)
    });
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/chatroom-101", {useMongoClient: true});
    
app.use(bodyParser.urlencoded({extended: true}));

//Static Files
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index");
})

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty cutest",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    
app.get("/chatroom", isLoggedIn, function(req,res){

    Chatlog.find({}, function(err, allMessages){
        if(err){
            console.log(err);
        } else {
           res.render("chatroom", {messages: allMessages, user_username: req.user.username}); 
        }
    });

});



app.post("/signup", function(req,res){
    var newUser = new User({username: req.body.username});
    

    User.register(newUser, req.body.password, function(err, newUser){
        if(err) {
            console.log(err);
            return res.render("");
        } else {
            passport.authenticate("local")(req, res, function(){
                console.log("added new user to mongodb");
                res.redirect("/chatroom");
            });
        }
    })
})

//handling login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/chatroom",
        failureRedirect: "/"
    }), function(req, res){
    
});

app.get("/logout", function(req, res){
    req.logout();
    res.render("index");
});

var io = socket.listen(server);
io.on("connection", function(socket){
    console.log("made socket connection:", socket.id)


    socket.on("chat", function(data){
        var time_stamp = moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"); 
        io.sockets.emit("chat", data, time_stamp);

    
        //Save Chatlog in MongoDB
        var newChatlog = {handle: data.handle, message: data.message, time_stamp: time_stamp};
        
        Chatlog.create(newChatlog, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                console.log("added new chatlog to mongodb")
            }
        });
    });
    
    socket.on("typing", function(data){
        socket.broadcast.emit("typing", data);
    })
    
    socket.on("checking_user_activity", function(data){
        io.sockets.emit("checking_user_activity", data);
    });
    
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/");
    }
};
