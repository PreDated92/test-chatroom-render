const socket = io();
let currentRoom = null;

const roomForm = document.getElementById('room-form');
const roomInput = document.getElementById('room-code');
const chatUI = document.getElementById('chat');

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

roomForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const roomCode = roomInput.value.trim();
  if (roomCode) {
    currentRoom = roomCode;
    socket.emit('join room', roomCode);
    document.getElementById('room-setup').style.display = 'none';
    chatUI.style.display = 'block';
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value && currentRoom) {
    const msg = input.value;
    const li = document.createElement('li');
    li.textContent = "You: " + msg;
    messages.appendChild(li);
    socket.emit('chat message', { roomCode: currentRoom, msg });
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = "Friend: " + msg;
  messages.appendChild(li);
});

socket.on('chat history', (msgs) => {
  msgs.forEach((msg) => {
    const li = document.createElement('li');
    li.textContent = `${msg.sender}: ${msg.text}`;
    messages.appendChild(li);
  });
});
