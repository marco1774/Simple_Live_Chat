console.log("myscript collegato");
const textInput = document.getElementById("text-message");
const btn = document.getElementsByClassName("btn");
const nome = document.getElementById("user-name");
const textArea = document.getElementById("area-message");
var socket = io(`http://localhost:5000`); // crea connessione col server.

var ID;

socket.on("connect", () => {
  ID = socket.id;
});

socket.on("chat", data => {
  if (data.id !== ID) {
    textArea.innerHTML += `<div class="pull-right"><p class="text-primary text-right" >${data.nome}</p><p class="text-secondary text-right" >${data.testo}</p></div>`;
  } else {
    textArea.innerHTML += `<div ><p class="badge badge-danger text-wrap" >${data.nome}</p><p class="text-secondary" >${data.testo}</p></div>`;
  }
  console.log("dati chat dal server rimandati", data);
});

btn[0].addEventListener("click", event => {
  socket.emit("chat", {
    testo: textInput.value,
    nome: nome.value,
    id: ID
  });
  textInput.value = "";
  console.log("id client:", socket.id); // an alphanumeric id...
});
