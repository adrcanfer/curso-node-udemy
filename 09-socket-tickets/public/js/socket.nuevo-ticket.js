var socket = io();
var label = document.getElementById('lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log("Se ha perdido la conexión con el servidor");
});

socket.on('estadoActual', function(data) {
    label.innerHTML = data.estadoActual
})

$('#nuevoTicketButton').on('click', function() {
    socket.emit('siguienteTicket', null, function(data) {
        console.log(data);
        label.innerHTML = data;
    });
})