//Make connection
var socket = io("https://chatroom-101-stevenlian1994.c9users.io/");

//Query DOM
var handle = document.getElementById("handle"),
    message = document.getElementById("message"),
    btn = document.getElementById("send"),
    output = document.getElementById("output");
    
btn.addEventListener("click", function(){
    socket.emit("message", {
        handle: handle.value,
        message: message.value 
    });
});

// socket.on("message", function(){
//     output.innerHTML += "<p>hello</p>"
// });

//Listen for events
socket.on("message", function(data){
    // feedback.innerHTML = ""
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>"
    
});