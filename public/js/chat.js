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

let socket = io();

// create socket 
// window.onload= function(){
//   socket = io();
// }

document.addEventListener('DOMContentLoaded', () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get('username');
  const roomid = urlParams.get('roomid');

  console.log(`Username: ${username} and Room ID: ${roomid}`);

  socket.emit('join-room',roomid,username);
});

socket.on('user-connected',username=>{
  // appendMessage(`${username} disconnected`);
  console.log(`${username} connected`);
  }
)

