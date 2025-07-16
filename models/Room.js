const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomCode: { type: String, required: true, unique: true },
  messages: [
    { sender: String, text: String, timestamp: { type: Date, default: Date.now } }
  ]
});

module.exports = mongoose.model('Room', RoomSchema);
