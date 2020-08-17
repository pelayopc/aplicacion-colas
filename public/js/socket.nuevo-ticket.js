var socket = io();
var label = $("#lblNuevoTicket");
socket.on("connect", function () {
  console.log("Conectado al servidor");
});
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});
socket.on("estadoActual", function (respuesta) {
  var ticketActual = respuesta.actual;
  label.text(ticketActual);
});
$("button").on("click", function () {
  socket.emit("siguienteTicket", null, function (siguienteTicket) {
    label.text(siguienteTicket);
    console.log(siguienteTicket);
  });
});

// on estadoActual , cargar en label
