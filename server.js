// Web sockets
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

// Database
const Room = require('./models/Room');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Database, connect only if not test
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join room', async (roomCode) => {
    socket.join(roomCode);
    console.log(`User joined room: ${roomCode}`);

    // Load chat history
    let room = await Room.findOne({ roomCode });
    if (!room) {
      room = new Room({ roomCode, messages: [] });
      await room.save();
    }

    // Send chat history to the new client
    socket.emit('chat history', room.messages);
  });  

  socket.on('chat message', async ({ roomCode, msg }) => {
    socket.to(roomCode).emit('chat message', msg);

    // Save message to DB
    await Room.findOneAndUpdate(
      { roomCode },
      { $push: { messages: { sender: 'Anonymous', text: msg } } },
      { upsert: true }
    );
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;

// Server, start only if not test
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

function checkRoomExists(a) {
  return true; // Dummy implementation first
}
module.exports = { checkRoomExists };