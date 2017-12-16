//Make connection
var socket = io.connect('https://chatroom-101-stevenlian1994.c9users.io/');

//Query DOM
var output = document.getElementById("output"),
    message = document.getElementById("message"),
    chat_window = document.getElementById("chat-window"),
    btn = document.getElementById("send"),
    new_form = document.getElementById("new_form"),
    feedback = document.getElementById("feedback"), 
    // handle = document.getElementById("handle");
    handle = document.getElementById("handle");
    
chat_window.scrollTop = chat_window.scrollHeight;

btn.addEventListener("click", function(){
    console.log(handle.innerHTML)
    socket.emit("chat", {
       message: message.value,
       handle: handle.innerHTML
    });
    new_form.reset();

});

message.addEventListener("keypress", function(){
   socket.emit("typing", handle.innerHTML); 
});;

//Listen for events
socket.on("chat", function(data, time_stamp){
    feedback.innerHTML = ""
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + " " + time_stamp +  "</p>"
    
});

socket.on("typing", function(data){
   feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});