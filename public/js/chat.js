function copyRoomId() {
  const roomId = document.querySelector(".room-id").textContent.trim().split(": ")[1].replace("Copy", "").trim();
  console.log(roomId)
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = roomId;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  alert(`Room ID copied to clipboard!`);
}


function addSystemMessage(message) {
  const chatMessages = document.querySelector('.system-messages');
  const systemMessage = document.createElement('div');
  systemMessage.classList.add('system-message');
  const messageText = document.createElement('span');
  messageText.classList.add('message');
  messageText.textContent = message;
  systemMessage.appendChild(messageText);
  chatMessages.appendChild(systemMessage);
}


let socket = io();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const roomid = urlParams.get('roomid');

// create socket 
// window.onload= function(){
//   socket = io();
// }

document.addEventListener('DOMContentLoaded', () => {

  socket.emit('join-room',roomid,username);
});


socket.on('user-connected', username => {
  addSystemMessage(`${username} has joined the chat`);
  console.log('user connected');


});

function sendmsg(){
  let message = document.getElementById("chat-msg").value;
  if(message === ""){
    console.log("empty message");
  }else{
    console.log(message);
    socket.emit('message',username,message,roomid);
  }
}

socket.on('receive-message', (name, message) => {
  console.log(`received message: ${message} from ${name}`);
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

});