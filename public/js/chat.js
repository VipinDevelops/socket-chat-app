let socket = io();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const roomid = urlParams.get('roomid');

function copyRoomId() {
  const roomId = document.querySelector(".room-id").textContent.trim().split(": ")[1].replace("Copy", "").trim();
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = roomId;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  alert(`Room ID copied to clipboard!`);
}

function exitRoom(){
  //  addSystemMessage(`${username} has left the chat`);

  socket.emit('exit-room',roomid,username);
  window.location = "/";
}

 function addSystemMessage(message) {
  // const chatMessages = document.querySelector('.system-messages');
  const chatMessages = document.querySelector('.chat-container');
  const systemMessage = document.createElement('div');
  systemMessage.classList.add('system-message');
  const messageText = document.createElement('span');
  messageText.classList.add('message');
  messageText.textContent = message;
  systemMessage.appendChild(messageText);
  chatMessages.appendChild(systemMessage);
}

// change this logic to function if user exit and again join the room then it should emit join-room event
document.addEventListener('DOMContentLoaded', () => {
  // Check if the user's information is already present in local storage
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const {username: storedUsername, roomid: storedRoomid} = JSON.parse(userInfo);
    if (storedUsername === username && storedRoomid === roomid) {
      // User has already joined the chat room, no need to emit 'join-room' event again
      return;
    }
  }
  
  // Emit 'join-room' event and store user's information in local storage
  socket.emit('join-room', roomid, username);
  localStorage.setItem('userInfo', JSON.stringify({username, roomid}));
});


socket.on('user-connected', username => {
  addSystemMessage(`${username} has joined the chat`);
});

socket.on('user-disconnected', username => {
  console.log(username)
  addSystemMessage(`${username} has left the chat`);

});


function sendmsg(){
  let message = document.getElementById("chat-msg").value;
  if(message === ""){
  }else{
    socket.emit('message',username,message,roomid);
  }
}

function receivemsg (name,message){
  const chatMessages = document.querySelector('.chat-container');
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');

  const sender = `${name}:` 
  const messageName = document.createElement('span');
  messageName.classList.add('sender');
  messageName.textContent = sender;

  const messageText = document.createElement('span');
  messageText.classList.add('message');
  messageText.textContent = message;

  chatMessage.appendChild(messageName);
  chatMessage.appendChild(messageText);
  chatMessages.appendChild(chatMessage);

  document.getElementById("chat-msg").value = "";

}

socket.on('receive-message', (name, message) => {
  receivemsg(name,message);
});

// hanldle click enter in input field 
document.getElementById("chat-msg").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
  sendmsg();
  }
}
);
