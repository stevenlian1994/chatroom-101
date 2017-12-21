//Make connection
var socket = io.connect('https://chatroom-101-stevenlian1994.c9users.io/');

//Query DOM
var output = document.getElementById("output"),
    message = document.getElementById("message"),
    chat_window = document.getElementById("chat-window"),
    btn = document.getElementById("send"),
    new_form = document.getElementById("new_form"),
    feedback = document.getElementById("feedback"), 
    handle = document.getElementById("handle"),
    online_users_display = document.getElementById("online_users_display");
    
// keep chat_window at bottom of scroll and update after messages
chat_window.scrollTop = chat_window.scrollHeight;

// Sends message
btn.addEventListener("click", function(){
    console.log(handle.innerHTML)
    socket.emit("chat", {
       message: message.value,
       handle: handle.innerHTML
    });
    // new_form.reset();

});

message.addEventListener("keypress", function(){
   socket.emit("typing", handle.innerHTML); 
});;

//Listen for events
socket.on("chat", function(data, time_stamp){
    feedback.innerHTML = ""
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message +  "</p>"
    chat_window.scrollTop = chat_window.scrollHeight;
});

socket.on("typing", function(data){
   feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});


var online_users_list = [];


function refresh_list() {
    online_users_list = [];
    online_users_display.innerHTML = "<h3>Users currently online: </h3>"
}


function check_online_users_list() {
    
    socket.emit("checking_user_activity", handle.innerHTML);
    
    socket.on("checking_user_activity", function(data){
        if (!online_users_list.includes(data)) {
            online_users_list.push(data);
            console.log("checking user activity:" + online_users_list)
            online_users_display.innerHTML += "<p>" + data + "</p>";
        }
    })
};

setInterval(refresh_list, 5000);
setInterval(check_online_users_list, 100);
