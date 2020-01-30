const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const Chat = require("./chatModel");

const PORT = process.env.PORT || 5000;

//connect mongoDB
mongoose
  .connect("mongodb://localhost/live-chat-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connesso al Db...."))
  .catch(() => console.log("non posso connetermi al Db..."));
//----------------

// in ascolto per connessione da client chat
io.on("connection", function(socket) {
  console.log("client connesso al server " + socket.id);

  socket.on("chat", data => {
    console.log("server riceve", data);
    socket.emit("chat", data);
    socket.broadcast.emit("chat", data);
    //Salva messaggio sul Db
    let chatMessage = new Chat({ nome: data.nome, testo: data.testo });
    chatMessage.save();
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
//----------------

server.listen(PORT, () => console.log(`Server connected on PORT ${PORT}`));
