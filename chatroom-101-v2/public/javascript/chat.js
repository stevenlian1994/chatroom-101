//Make connection
var socket = io.connect('https://chatroom-101-stevenlian1994.c9users.io/');

//Query DOM
var output = document.getElementById("output"),
    message = document.getElementById("message"),
    btn = document.getElementById("send"),
    feedback = document.getElementById("feedback"), 
    handle = document.getElementById("handle");
    
//Emit events

btn.addEventListener("click", function(){
   socket.emit("chat", {
       message: message.value,
       handle: handle.value
   });
});

message.addEventListener("keypress", function(){
   socket.emit("typing", handle.value); 
});;

//Listen for events
socket.on("chat", function(data){
    feedback.innerHTML = ""
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>"
    
});

socket.on("typing", function(data){
   feedback.innerHTML = "<p><em>" + data + "is typing a message...</em></p>";
});