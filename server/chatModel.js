const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  nome: String,
  testo: String,
  id: String,
  date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
});

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
