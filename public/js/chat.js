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


// create socket 
window.onload= function(){
  var socket = io();
  }

