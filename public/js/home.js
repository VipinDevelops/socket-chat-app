function validateForm() {
    const usernameInput = document.getElementById('username');
    const roomidInput = document.getElementById('roomid');
    
    if (!usernameInput.value) {
      usernameInput.classList.add('is-invalid');
    } else {
      usernameInput.classList.remove('is-invalid');
    }
    
    if (!roomidInput.value) {
      roomidInput.classList.add('is-invalid');
    } else {
      roomidInput.classList.remove('is-invalid');
    }
  }