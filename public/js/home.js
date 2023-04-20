const joinBtn = document.getElementById("join-btn");
const createBtn = document.getElementById("create-btn");
const roomidWrapper = document.getElementById("roomid-wrapper");
const submitBtn = document.getElementById("submit-btn");
const usernameInput = document.getElementById("username");
const roomidInput = document.getElementById("roomid");
const usernameValue = usernameInput.value.trim();
const roomidValue = roomidInput.value.trim();

joinBtn.addEventListener("click", () => {
  usernameInput.value="";
  roomidInput.value="";
  roomidWrapper.classList.remove("d-none");
  joinBtn.classList.add("active");
  createBtn.classList.remove("active");
  submitBtn.innerText = "Join Room";
});

createBtn.addEventListener("click", () => {
  usernameInput.value="";
  roomidInput.value="";
  roomidWrapper.classList.add("d-none");
  createBtn.classList.add("active");
  joinBtn.classList.remove("active");
  submitBtn.innerText = "Create Room";
});

function validateForm() {

  let valid = true;
  if (usernameValue === "") {
    usernameInput.classList.add("is-invalid");
    usernameInput.nextElementSibling.style.display = "block"; //invalid 
    valid = false;
  } else {
    usernameInput.classList.remove("is-invalid");
    usernameInput.nextElementSibling.style.display = "none"; //valid
  }

  // If join room is selected
  if (!roomidWrapper.classList.contains("d-none")) {
    if (roomidValue === "") {
      roomidInput.classList.add("is-invalid");
      roomidInput.nextElementSibling.style.display = "block"; //invalid
      valid = false;
    } else {
      roomidInput.classList.remove("is-invalid");
      roomidInput.nextElementSibling.style.display = "none"; //valid
    }
  } 

  if (!valid) {
    return false;
  }

}
