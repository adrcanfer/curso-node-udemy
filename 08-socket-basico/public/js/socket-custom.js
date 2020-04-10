var socket = io();

//ON - Escuchar
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log("Se ha perdido la conexión con el servidor");
});

socket.on('enviarMensaje', function(data) {
    console.log(data);
});

//EMIT - Emitir
socket.emit('enviarMensaje', {
    usuario: 'Adrián',
    mensaje: 'Hola Mundo'
}, function(data) {
    console.log(data);
});