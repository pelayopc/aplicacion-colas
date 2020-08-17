var socket = io();

socket.on("connect", function () {
  console.log("Conectado al servidor");
});
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has("escritorio"));
if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}

//llega escritorio
var escritorio = searchParams.get("escritorio");
console.log(escritorio);
$("#vEscritorio").text(escritorio);

$("button").on("click", function () {
  socket.emit("atenderTicket", { escritorio: escritorio }, function (resp) {
    if (resp === "Ya no hay tickets") {
      $("#vTicketActual").text(resp);
      alert(resp);
      return;
    }
    $("#vTicketActual").text("Ticket " + resp.numero);
  });
});
